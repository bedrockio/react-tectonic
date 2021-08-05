import { ReactNode, useState, useEffect, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

interface AggregateTermsProps {
  baseUrl?: string;
  token?: string;
  children: ReactNode;
  collection?: string;
  filter?: IAggregateFilterType;
  aggField: string;
  aggFieldOrder?: "desc" | "asc";
  field?: string;
  operation?: string;
  includeTopHit?: boolean;
  termsSize?: number;
  timeRange?: ITimeRange;
}

export const AggregateTerms = ({
  baseUrl,
  token,
  timeRange,
  children,
  ...params
}: AggregateTermsProps) => {
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
        path: "/1/analytics/terms",
        baseUrl,
        token,
        body: getAnalyticsRequestBody({
          params,
          timeRange,
          ctx,
        }),
      });
      setData(data);
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
    return children({ data, status });
  }

  return Children.map(children, (child: any) =>
    cloneElement(child, { data, status })
  );
};

AggregateTerms.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  filter: AggregateFilterType,
  collection: PropTypes.string,
  aggField: PropTypes.string.isRequired,
  aggFieldOrder: PropTypes.oneOf(["desc", "asc"]),
  field: PropTypes.string,
  operation: PropTypes.string,
  includeTopHit: PropTypes.bool,
  referenceFetch: PropTypes.object,
  termsSize: PropTypes.number,
  timeRange: TimeRangeType,
};
