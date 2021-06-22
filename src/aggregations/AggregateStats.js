import React from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateStats = ({
  baseUrl,
  token,
  timeRange,
  cardinality,
  children,
  dateField,
  ...params
}) => {
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;
  if (!timeRange) timeRange = context.timeRange;

  const [data, setData] = React.useState({});
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = await request({
        method: "POST",
        path: cardinality ? "/1/analytics/cardinality" : "/1/analytics/stats",
        baseUrl,
        token,
        body: getAnalyticsRequestBody(params, timeRange, context),
      });
      setData(data);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    if (token && context.stats) {
      fetchData();
    } else {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, cardinality, timeRange, ...Object.values(params)]);

  if (typeof children === "function") {
    return children({ data, status });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
  );
};

AggregateStats.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  cardinality: PropTypes.bool,
  collection: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string),
  filter: AggregateFilterType,
  timeRange: TimeRangeType,
};
