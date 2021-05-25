import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const Aggregate = ({ baseUrl, token, requests, type, children }) => {
  let context = useTectonicContext();
  if (!baseUrl) baseUrl = context.baseUrl;
  if (!token) token = context.token;

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

Aggregate.propTypes = {
  type: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
};
