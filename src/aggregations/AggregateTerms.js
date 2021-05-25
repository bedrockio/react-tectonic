import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTerms = ({ baseUrl, token, children, ...args }) => {
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
        path: "/1/analytics/terms",
        baseUrl,
        token,
        body: args,
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
    }
  }, []);

  if (typeof children === "function") {
    return children({ data, status });
  }

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { data, status })
  );
};

AggregateTerms.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
};
