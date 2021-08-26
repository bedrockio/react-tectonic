import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { request, getAnalyticsRequestBody } from "../utils/request";
import { useTectonicContext } from "../components/TectonicProvider";
import { determineInterval, IntervalType } from "../utils/intervals";
import { TimeRangeType } from "../utils/propTypes";
import { IStatus, ITimeRange } from "../types";
import { ErrorBoundary } from "../components/ErrorBoundary";

const defaultProps = {
  onIntervalChange: () => {},
};

interface AggregatePropType {
  timeRange?: ITimeRange;
  baseUrl?: string;
  token?: string;
  requests: any[];
  type: "stats" | "time-series" | "cardinality" | "terms" | "search";
  children: ReactNode;
  interval?: IntervalType;
  collection?: string;
  onIntervalChange?: (interval: IntervalType) => void;
}

export const Aggregate = ({
  timeRange,
  baseUrl,
  token,
  requests,
  collection,
  interval: propsInterval,
  onIntervalChange,
  type,
  children,
}: AggregatePropType & typeof defaultProps) => {
  let ctx = useTectonicContext();
  if (!baseUrl) baseUrl = ctx.baseUrl;
  if (!token) token = ctx.token;
  if (!timeRange) timeRange = ctx.timeRange;

  if (propsInterval && type !== "time-series") {
    console.warn("[Aggregate] interval is only supported for time-series");
    propsInterval = undefined;
  }

  const [interval, setInterval] = React.useState<IntervalType | undefined>(
    propsInterval
  );

  React.useEffect(() => {
    setInterval(propsInterval);
  }, [propsInterval]);

  React.useEffect(() => {
    if (interval) {
      onIntervalChange(interval);
    }
  }, [interval]);

  React.useEffect(() => {
    if (type === "time-series" && timeRange?.from) {
      setInterval(determineInterval(timeRange));
    }
  }, [timeRange]);

  const isReady = ctx.token ? ctx.token && ctx.isReady : token;

  const [data, setData] = React.useState<any[]>([]);
  // if there is no requests set the status to success => to trigger no data message
  const [status, setStatus] = React.useState<IStatus>(
    requests.length ? { loading: true } : { success: true }
  );

  async function fetchData() {
    setStatus({ loading: true });
    try {
      const data = await Promise.all(
        requests.map((params) => {
          return request({
            method: "POST",
            path: `/1/analytics/${type}`,
            baseUrl,
            token,
            body: getAnalyticsRequestBody({
              type,
              params: {
                ...params,
                interval,
                collection,
                dateField:
                  type === "time-series"
                    ? params.dateField || ctx.dateField
                    : undefined,
              },
              timeRange: timeRange,
              ctx,
            }),
            onRequest: ctx.onRequest,
          });
        })
      );
      setData(data.map(({ data }) => data));
      setStatus({ success: true });
    } catch (error) {
      console.log(error);
      setStatus({ error });
    }
  }

  React.useEffect(() => {
    const intervalCheck = type === "time-series" ? !!interval : true;

    if (isReady && intervalCheck && requests.length) {
      fetchData();
    } else if (!token) {
      setStatus({ error: new Error("Token not provided") });
    }
  }, [token, baseUrl, isReady, timeRange, interval, type, requests]);

  if (typeof children === "function") {
    try {
      return children({ data, status, timeRange, setInterval });
    } catch (error) {
      return <ErrorBoundary error={error} />;
    }
  }

  return React.Children.map(children, (child: any) =>
    React.cloneElement(child, {
      data,
      status,
      timeRange,
      onIntervalChange: setInterval,
      interval,
    })
  );
};

Aggregate.propTypes = {
  type: PropTypes.string.isRequired,
  requests: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string,
  baseUrl: PropTypes.string,
  timeRange: TimeRangeType,
};

Aggregate.defaultProps = defaultProps;
