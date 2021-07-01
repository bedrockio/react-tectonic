import React from "react";
import PropTypes from "prop-types";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTerms = ({
  baseUrl,
  token,
  timeRange,
  children,
  ...params
}) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });

    try {
      const data = await request({
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
      setStatus({ success: true });
      setData(data);
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
    return children({ data, status });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
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
