import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTimeSeries = ({
  baseUrl,
  token,
  index,
  operation,
  interval,
  field,
  dateField,
  filter,
  children,
}) => {
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;

  if (!token) {
    console.error("Token not provided");
  }

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
        body: {
          index,
          operation,
          interval,
          field,
          dateField,
          filter,
        },
      });
      setData(data);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [index, operation, interval, field, dateField, filter]);

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
};
