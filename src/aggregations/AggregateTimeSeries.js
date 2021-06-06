import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { AggregateFilter } from "../utils/propTypes";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTimeSeries = ({
  baseUrl,
  token,
  children,
  ...params
}) => {
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;

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
        body: params,
      });
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
  }, [token, baseUrl, ...Object.values(params)]);

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
  filter: AggregateFilter,
};
