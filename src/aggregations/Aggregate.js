import React from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";
import { TimeRangeType } from "../utils/propTypes";

export const Aggregate = ({
  timeRange,
  baseUrl,
  token,
  requests,
  type,
  children,
}) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  const isReady = (ctx.token && ctx.isReady) || token;

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
            body: getAnalyticsRequestBody({ params, timeRange, ctx }),
          })
        )
      );
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
  }, [token, baseUrl, isReady, requests, type]);

  if (typeof children === "function") {
    return children({ data, status });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
  );
};

Aggregate.propTypes = {
  type: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  timeRange: TimeRangeType,
};
