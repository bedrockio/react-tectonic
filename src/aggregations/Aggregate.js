import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
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
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;
  if (!timeRange) timeRange = context.timeRange;

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = await Promise.all(
        requests.map((requestBody) =>
          request({
            method: "POST",
            path: `/1/analytics/${type}`,
            baseUrl,
            token,
            body: {
              ...timeRange,
              ...requestBody,
            },
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
    if (token) {
      fetchData();
    } else {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, requests, type]);

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
