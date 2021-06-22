import React from "react";
import PropTypes from "prop-types";
import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";

export const AggregateTerms = ({
  baseUrl,
  token,
  timeRange,
  children,
  ...params
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
      const data = await request({
        method: "POST",
        path: "/1/analytics/terms",
        baseUrl,
        token,
        body: getAnalyticsRequestBody(params, timeRange, context),
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

AggregateTerms.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  filter: AggregateFilterType,
  collection: PropTypes.string.isRequired,
  aggField: PropTypes.string.isRequired,
  aggFieldOrder: PropTypes.oneOf(["desc", "asc"]),
  field: PropTypes.string,
  operation: PropTypes.string,
  includeTopHit: PropTypes.bool,
  referenceFetch: PropTypes.object,
  termsSize: PropTypes.number,
  timeRange: TimeRangeType,
};
