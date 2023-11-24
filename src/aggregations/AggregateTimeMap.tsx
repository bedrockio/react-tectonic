import React, { ReactNode } from "react";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

interface AggregateTimeMapProps {
  baseUrl?: string;
  token?: string;
  timeRange?: ITimeRange | null;
  children?: ReactNode;
  dateField?: string;
  collection?: string;
  timeZone?: string;
  filter?: IAggregateFilterType;
}

export const AggregateTimeMap = ({
  baseUrl,
  token,
  timeRange,
  children,
  timeZone,
  ...params
}: AggregateTimeMapProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (timeRange === undefined) timeRange = ctx.timeRange;

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
            timeZone: ctx.timeZone || timeZone,
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
      setStatus({ error: error as Error });
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
    try {
      return children({ data, status });
    } catch (error) {
      return <ErrorBoundary centered error={error as Error} />;
    }
  }

  return React.Children.map(children, (child: any) =>
    React.cloneElement(child, {
      data,
      status,
      timeRange,
    })
  );
};
