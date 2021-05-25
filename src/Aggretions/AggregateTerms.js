import React from "react";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTerms = ({
  index,
  aggField,
  aggFieldOrder,
  field,
  operation,
  filter,
  includeTopHit,
  referenceFetch,
  termsSize,
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
        path: "/1/analytics/terms",
        baseUrl,
        token,
        body: {
          index,
          aggField,
          aggFieldOrder,
          field,
          operation,
          filter,
          includeTopHit,
          referenceFetch,
          termsSize,
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
  }, [
    index,
    aggField,
    aggFieldOrder,
    field,
    operation,
    filter,
    includeTopHit,
    referenceFetch,
    termsSize,
  ]);

  return children({ data, status });
};
