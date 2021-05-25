import React from "react";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTimeSeries = ({
  index,
  operation,
  interval,
  field,
  dateField,
  filter,
  children,
}) => {
  const { baseUrl, token } = useTectonicContext();
  const [data, setData] = React.useState({});
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

  return children({ data, status });
};
