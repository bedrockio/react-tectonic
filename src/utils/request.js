class CustomError extends Error {
  get name() {
    return this.constructor.name;
  }
}

class ApiError extends CustomError {
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
  } = options;
  let { body } = options;

  const token = options.token;

  const headers = Object.assign(
    {
      Accept: "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
    options.headers
  );

  const url = new URL(path, baseUrl);

  url.search = new URLSearchParams(params);

  if (files) {
    const data = new FormData();
    files.forEach((file) => {
      data.append("file", file);
    });
    for (let [key, value] of Object.entries(body || {})) {
      data.append(key, value);
    }
    body = data;
  } else if (!(body instanceof FormData)) {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(url, {
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

export function getAnalyticsRequestBody({ params, timeRange, ctx }) {
  if (!timeRange) {
    return {
      collection: ctx.collection,
      ...params,
    };
  }

  return {
    collection: ctx.collection,
    ...params,
    filter: {
      ...params.filter,
      range: {
        [context.dateField]: {
          gte: timeRange.from,
          lt: timeRange.to,
          time_zone: timeRange.timeRange,
        },
      },
    },
  };
}
