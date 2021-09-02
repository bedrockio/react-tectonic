import React, { ReactNode } from "react";
//import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
// import { AggregateFilterType, TimeRangeType } from "../utils/propTypes";
import { determineInterval, IntervalType } from "../utils/intervals";
import { useTectonicContext } from "../components/TectonicProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

import { IStatus, ITimeRange, IAggregateFilterType } from "../types";

const defaultProps = {
  onIntervalChange: () => {},
};

type OperationType = string;

interface AggregateTimeSeriesProps {
  baseUrl?: string;
  token?: string;
  timeRange?: ITimeRange | null;
  children?: ReactNode;
  interval?: IntervalType;
  field?: string;
  onIntervalChange?: (interval: IntervalType) => void;
  dateField?: string;
  collection?: string;
  operation?: OperationType;
  filter?: IAggregateFilterType;
}

export const AggregateTimeSeries = ({
  baseUrl,
  token,
  timeRange,
  children,
  interval: propsInterval,
  onIntervalChange,
  ...params
}: AggregateTimeSeriesProps & typeof defaultProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (timeRange === undefined) timeRange = ctx.timeRange;

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;
  const [interval, setInterval] = React.useState(propsInterval);

  React.useEffect(() => {
    setInterval(propsInterval);
  }, [propsInterval]);

  React.useEffect(() => {
    if (interval) {
      onIntervalChange(interval);
    }
  }, [interval]);

  React.useEffect(() => {
    if (timeRange) {
      setInterval(determineInterval(timeRange));
    }
  }, [timeRange]);

  const [data, setData] = React.useState([]);
  const [status, setStatus] = React.useState<IStatus>({ loading: true });

  async function fetchData() {
    setStatus({ loading: true });
    let _interval = interval;
    if (!_interval && timeRange) {
      _interval = determineInterval(timeRange);
    }
    try {
      const { data } = await request({
        method: "POST",
        path: "/1/analytics/time-series",
        baseUrl,
        token,
        body: getAnalyticsRequestBody({
          params: {
            ...params,
            dateField: params.dateField || ctx.dateField,
            interval: _interval,
          },
          timeRange,
          ctx,
        }),
        onRequest: ctx.onRequest,
      });
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
  }, [token, baseUrl, isReady, interval, timeRange, ...Object.values(params)]);

  if (typeof children === "function") {
    try {
      return children({ data, status });
    } catch (error) {
      return <ErrorBoundary error={error} />;
    }
  }

  return React.Children.map(children, (child: any) =>
    React.cloneElement(child, {
      data,
      status,
      timeRange,
      interval,
      onIntervalChange: setInterval,
    })
  );
};

AggregateTimeSeries.defaultProps = defaultProps;

/*
AggregateTimeSeries.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  collection: PropTypes.string,
  operation: PropTypes.string.isRequired,
  field: PropTypes.string,
  interval: PropTypes.string,
  onIntervalChange: PropTypes.func,
  dateField: PropTypes.string,
  filter: AggregateFilterType,
  timeRange: TimeRangeType,
};
*/
