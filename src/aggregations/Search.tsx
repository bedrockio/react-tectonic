import React, {
  ReactNode,
  useState,
  useEffect,
  Children,
  cloneElement,
} from "react";

import PropTypes from "prop-types";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

interface SearchProps {
  baseUrl?: string;
  token?: string;
  children: ReactNode;
  collection?: string;
  filter?: IAggregateFilterType;
  processData?: (data: any) => Promise<any> | any;
  timeRange?: ITimeRange;
}

export const Search = ({
  baseUrl,
  token,
  timeRange,
  children,
  processData = (data) => data,
  ...params
}: SearchProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = useState([]);
  const [status, setStatus] = useState<IStatus>({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const { data } = await request({
        method: "POST",
        path: "/1/analytics/search",
        baseUrl,
        token,
        body: getAnalyticsRequestBody({
          params,
          timeRange,
          ctx,
        }),
        onRequest: ctx.onRequest,
      });
      setData(await processData(data));
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error });
    }
  }

  useEffect(() => {
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
      return <ErrorBoundary error={error} />;
    }
  }

  return Children.map(children, (child: any) =>
    cloneElement(child, { data, status })
  );
};

Search.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  filter: AggregateFilterType,
  collection: PropTypes.string,
  timeRange: TimeRangeType,
};
