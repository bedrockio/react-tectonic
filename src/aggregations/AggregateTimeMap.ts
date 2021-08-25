import React, { ReactNode } from "react";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

interface AggregateTimeMapProps {
  baseUrl?: string;
  token?: string;
  timeRange?: ITimeRange;
  children?: ReactNode;
  dateField?: string;
  collection?: string;
  filter?: IAggregateFilterType;
}

export const AggregateTimeMap = ({
  baseUrl,
  token,
  timeRange,
  children,
  ...params
}: AggregateTimeMapProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState<IStatus>({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });

    try {
      const { data } = await request({
        method: "POST",
        path: "/1/analytics/time-map",
        baseUrl,
        token,
        body: getAnalyticsRequestBody({
          params: {
            ...params,
            dateField: params.dateField || ctx.dateField,
          },
          timeRange,
          ctx,
        }),
        onRequest: ctx.onRequest,
      });
      setData(data);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    if (isReady) {
      fetchData();
    } else if (!token) {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, isReady, timeRange, ...Object.values(params)]);

  if (typeof children === "function") {
    return children({ data, status, timeRange });
  }

  return React.Children.map(children, (child: any) =>
    React.cloneElement(child, {
      data,
      status,
      timeRange,
    })
  );
};
