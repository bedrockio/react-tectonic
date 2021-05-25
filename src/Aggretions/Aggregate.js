import React from "react";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const Aggregate = ({ requests, type, children }) => {
  const { baseUrl, token } = useTectonicContext();
  const [data, setData] = React.useState({});
  const [status, setStatus] = React.useState({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = Promise.all(
        requests.map((requestBody) =>
          request({
            method: "POST",
            path: `/1/analytics/${type}`,
            baseUrl,
            token,
            body: {
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
    fetchData();
  }, [requests, type]);

  return children({ data, status });
};
