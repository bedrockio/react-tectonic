import React from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";
import { determineInterval } from "../utils/intervals";
import { TimeRangeType } from "../utils/propTypes";

export const Aggregate = ({
  timeRange,
  baseUrl,
  token,
  requests,
  interval: propsInterval,
  onIntervalChange,
  type,
  children,
}) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const [interval, setInterval] = React.useState(propsInterval);

  React.useEffect(() => {
    setInterval(propsInterval);
  }, [propsInterval]);

  React.useEffect(() => {
    onIntervalChange(interval);
  }, [interval]);

  React.useEffect(() => {
    if (timeRange?.from) {
      setInterval(determineInterval(timeRange));
    }
  }, [timeRange]);

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = await Promise.all(
        requests.map((params) =>
          request({
            method: "POST",
            path: `/1/analytics/${type}`,
            baseUrl,
            token,
            body: getAnalyticsRequestBody({
              type,
              params: { ...params, interval },
              timeRange,
              ctx,
            }),
          })
        )
      );
      setStatus({ success: true });
      setData(data);
    } catch (error) {
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    if (isReady && interval && requests.length) {
      fetchData();
    } else if (!token) {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, isReady, timeRange, interval, type, requests]);

  if (typeof children === "function") {
    return children({ data, status, timeRange, setInterval });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      data,
      status,
      timeRange,
      onIntervalChange: setInterval,
      interval,
    })
  );
};

Aggregate.propTypes = {
  type: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  timeRange: TimeRangeType,
};

Aggregate.defaultProps = {
  interval: "1d",
  onIntervalChange: () => {},
};
