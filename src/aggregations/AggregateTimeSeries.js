import React from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { determineInterval } from "../utils/date";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTimeSeries = ({
  baseUrl,
  token,
  timeRange,
  children,
  interval: propsInterval,
  onIntervalChange,
  ...params
}) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;
  const isReady = (ctx.token && ctx.isReady) || token;
  const [interval, setInterval] = React.useState(propsInterval);

  React.useEffect(() => {
    setInterval(propsInterval);
  }, [propsInterval]);

  React.useEffect(() => {
    onIntervalChange(interval);
  }, [interval]);

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
        body: getAnalyticsRequestBody({
          params: {
            ...params,
            dateField: params.dateField || ctx.dateField,
            interval:
              interval === "auto" ? determineInterval(timeRange) : interval,
          },
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

  React.useEffect(() => {
    if (isReady) {
      fetchData();
    } else if (!token) {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, isReady, interval, timeRange, ...Object.values(params)]);

  if (typeof children === "function") {
    return children({ data, status, interval, setInterval });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
  );
};

AggregateTimeSeries.defaultProps = {
  interval: "auto",
  onIntervalChange: () => {},
};

AggregateTimeSeries.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  collection: PropTypes.string,
  operation: PropTypes.string.isRequired,
  field: PropTypes.string,
  interval: PropTypes.string,
  onIntervalChange: PropTypes.func,
  dateField: PropTypes.string,
  filter: AggregateFilterType,
  timeRange: TimeRangeType,
};
