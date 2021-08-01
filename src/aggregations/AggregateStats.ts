import { ReactNode, useState, useEffect, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { AggregateFilterType } from "../utils/propTypes";
import { useTectonicContext } from "../components/TectonicProvider";

import { TimeRangeType } from "../utils/propTypes";
import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

interface AggregateStateProps {
  timeRange?: ITimeRange;
  baseUrl?: string;
  token?: string;
  cardinality?: boolean;
  children: ReactNode;
  collection?: string;
  fields: string[];
  filter?: IAggregateFilterType;
}

export const AggregateStats = ({
  baseUrl,
  token,
  timeRange,
  cardinality,
  children,
  ...params
}: AggregateStateProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = useState({});
  const [status, setStatus] = useState<IStatus>({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const { data } = await request({
        method: "POST",
        path: cardinality ? "/1/analytics/cardinality" : "/1/analytics/stats",
        baseUrl,
        token,
        body: getAnalyticsRequestBody({
          params,
          timeRange,
          ctx,
        }),
      });
      setStatus({ success: true });
      setData(data);
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
  }, [
    token,
    baseUrl,
    isReady,
    cardinality,
    timeRange,
    ...Object.values(params),
  ]);

  if (typeof children === "function") {
    return children({ data, status });
  }

  return Children.map(children, (child: any) =>
    cloneElement(child, { data, status })
  );
};

AggregateStats.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  cardinality: PropTypes.bool,
  collection: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.string),
  filter: AggregateFilterType,
  timeRange: TimeRangeType,
};
