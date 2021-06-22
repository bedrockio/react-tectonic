import React from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTimeSeries = ({
  baseUrl,
  token,
  timeRange,
  children,
  ...params
}) => {
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;
  if (!timeRange) timeRange = context.timeRange;

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = await request({
        method: "POST",
        path: "/1/analytics/time-series",
        baseUrl,
        token,
        body: getAnalyticsRequestBody(
          { ...params, dateField: context.dateField },
          timeRange,
          context
        ),
      });
      setData(data);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    if (token && context.isReady) {
      fetchData();
    } else if (!token) {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, context.isReady, timeRange, ...Object.values(params)]);

  if (typeof children === "function") {
    return children({ data, status });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
  );
};

AggregateTimeSeries.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  collection: PropTypes.string.isRequired,
  operation: PropTypes.string.isRequired,
  field: PropTypes.string,
  interval: PropTypes.string,
  dateField: PropTypes.string,
  filter: AggregateFilterType,
  timeRange: TimeRangeType,
};
