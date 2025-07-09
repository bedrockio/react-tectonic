import { ITimeRange } from "../types";
import metadata from "../metadata.json";

const version = (metadata as any).version;

class CustomError extends Error {
  get name() {
    return this.constructor.name;
  }
}

class ApiError extends CustomError {
  status: number;
  details: any;

  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

class ApiParseError extends CustomError {
  constructor() {
    super("Bad JSON response from API");
  }
}

export const request = async (options) => {
  const {
    method = "GET",
    path,
    files,
    params,
    baseUrl = "http://0.0.0.0:3300",
    onRequest = (url, options) => {
      return fetch(url, options);
    },
  } = options;
  let { body } = options;

  const token = options.token;

  const headers = Object.assign(
    {
      Accept: "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      Client: `react-tectonic/${version}`,
    },
    options.headers
  );

  const url = new URL(path, baseUrl);
  url.search = new URLSearchParams(params).toString();

  if (files) {
    const data = new FormData();
    files.forEach((file) => {
      data.append("file", file);
    });
    for (let [key, value] of Object.entries(body || {})) {
      data.append(key, value as any);
    }
    body = data;
  } else if (!(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  const res = await onRequest(url.toString(), {
    method,
    headers,
    body,
  });

  if (res.status === 204) {
    return;
  } else if (!res.ok) {
    let message, status, details;
    try {
      const data = await res.clone().json();
      if (data.error) {
        message = data.error.message;
        status = data.error.status;
        details = data.error.details;
      }
    } catch (err) {
      message = await res.clone().text();
    }
    throw new ApiError(
      message || res.statusText,
      status || res.status,
      details
    );
  }

  try {
    const response = await res.json();
    return response;
  } catch (err) {
    throw new ApiParseError();
  }
};

export function getAnalyticsRequestBody({
  params,
  timeRange,
  ctx,
  type,
  timeRangeDateField,
}: {
  params: any;
  type?: string;
  timeRange?: ITimeRange | null;
  ctx: any;
  timeRangeDateField?: string;
}) {
  const dateField = params.dateField || ctx.dateField;
  const _collection = params.collection || ctx.collection;

  const timeZone =
    params?.timeZone ||
    ctx?.timeZone ||
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!timeRange) {
    return {
      ...params,
      debug: ctx.debug,
      collection: _collection,
      dateField: type === "time-series" ? dateField : undefined,
    };
  }

  let to = timeRange.to;
  if (timeRange.to instanceof Date) {
    if (
      timeRange.to.getSeconds() === 59 &&
      timeRange.to.getMinutes() == 59 &&
      timeRange.to.getHours() == 23
    ) {
      to = new Date(timeRange.to.valueOf() + 1000);
    }
  }

  return {
    ...params,
    debug: ctx.debug,
    collection: _collection,
    timeZone: timeZone,
    filter: {
      ...params.filter,
      range: {
        [timeRangeDateField || dateField]: {
          gte: timeRange.from,
          lt: to,
          time_zone: timeZone,
        },
      },
    },
  };
}
