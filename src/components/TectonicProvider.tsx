import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { sub, startOfDay } from "date-fns";
import { TimeRangeType } from "../utils/propTypes";
import { ITimeRange } from "../types";
import metadata from "../metadata.json";
import { IAggregateFilterType } from "../types";
import { ErrorBoundary } from "./ErrorBoundary";

const version = (metadata as any).version;

interface IContextProps {
  primaryColor: string;
  token?: string;
  setToken: (token: string) => void;
  setBaseUrl: (url: string) => void;
  isReady: boolean;
  timeRange?: ITimeRange;
  setTimeRange: (timeRange: ITimeRange) => void;
  stats: any;
  baseUrl?: string;
  dateField: string;
  onRequest?: (url: string, options: RequestInit) => any;
}

const defaultProps = {
  primaryColor: "#77a741",
  dateField: "ingestedAt",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

  getTimeRangeFromCollectionStats: (stats, mode) => {
    if (mode === "all") {
      return {
        to: stats.to,
        from: stats.from,
      };
    }

    if (stats.isHistorical) {
      return {
        to: stats.to,
        from: startOfDay(
          new Date(
            Math.max(
              stats.from.valueOf(),
              sub(stats.to, { hours: 12 }).valueOf()
            )
          )
        ),
      };
    }
    const hours = stats.to - stats.from / 1000 / 60 / 60;
    const timeRange = {
      to: "now",
      from: hours > 48 ? "now-1h/d" : stats.from,
    };

    return timeRange;
  },
};

const TectonicContext = React.createContext({} as IContextProps);

const aDay = 24 * 60 * 60 * 1000;

interface ITectonicProviderProps {
  timeRangeMode?: "all" | "auto";
  getTimeRangeFromCollectionStats?: (stats: any) => ITimeRange;
  children: React.ReactNode;
  token?: string;
  baseUrl?: string;
  timeZone?: string;
  timeRange?: ITimeRange;
  dateField?: string;
  collection?: string;
  primaryColor?: string;
  statsFilter?: IAggregateFilterType;
  onRequest?: (url: string, options: RequestInit) => any;
}

const TectonicProvider = ({
  timeRangeMode = "all",
  getTimeRangeFromCollectionStats,
  onRequest,
  children,
  ...props
}: ITectonicProviderProps & typeof defaultProps): JSX.Element => {
  const [token, setToken] = React.useState(props.token);
  const [baseUrl, setBaseUrl] = React.useState(props.baseUrl);
  const [timeZone, setTimeZone] = React.useState(props.timeZone);
  const [timeRange, setTimeRange] = React.useState(props.timeRange);
  const [dateField, setDateField] = React.useState(props.dateField);
  const [collection, setCollection] = React.useState(props.collection);
  const [stats, setStats] = React.useState({
    isHistorical: false,
  });
  const [primaryColor, setPrimaryColor] = React.useState(props.primaryColor);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setToken(props.token);
  }, [props.token]);

  React.useEffect(() => {
    setBaseUrl(props.baseUrl);
  }, [props.baseUrl]);

  React.useEffect(() => {
    setTimeZone(props.timeZone);
  }, [props.timeZone]);

  React.useEffect(() => {
    setTimeRange(props.timeRange);
  }, [props.timeRange]);

  React.useEffect(() => {
    setDateField(props.dateField);
  }, [props.dateField]);

  React.useEffect(() => {
    setCollection(props.collection);
  }, [props.collection]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tnic-primary-color", props.primaryColor);
    root.style.setProperty(
      "--tnic-primary-color-hover",
      props.primaryColor + "D9"
    );
    setPrimaryColor(primaryColor);
  }, [props.primaryColor]);

  async function fetchCollectionStats() {
    if (!collection || !token) {
      // eslint-disable-next-line no-console
      console.error(
        "[TectonicProvider] Please provide a `token` and `collection`"
      );
      return;
    }

    try {
      const { data } = await request({
        method: "POST",
        path: "/1/analytics/stats",
        baseUrl,
        token,
        body: {
          collection,
          filter: props.statsFilter,
          fields: [dateField],
        },
        onRequest,
      });

      const from = new Date(data[dateField].min);
      const to = new Date(data[dateField].max);
      const isHistorical = to.valueOf() < Date.now() - aDay - 20;

      const stats = {
        isHistorical,
        from,
        to,
      };

      setStats(stats);
      if (!timeRange) {
        setTimeRange(getTimeRangeFromCollectionStats(stats, timeRangeMode));
      }
      setIsReady(true);
    } catch (e) {
      setIsReady(true);
      // eslint-disable-next-line no-console
      console.error(
        `["TectonicProvider"] Failed to look up collection (${collection}) stats ${e.message}`
      );
      console.error(e);
    }
  }

  async function fetchTectonicVersion() {
    try {
      const data = await request({
        method: "GET",
        path: "/",
        baseUrl,
      });

      const majorVersion = Number(version.split(".")[0]);
      if (majorVersion !== Number(data.version.split(".")[0])) {
        // eslint-disable-next-line no-console
        console.error(
          `[TectonicProvider] The Tectonic version (${data.version}) doesn't match react-tectonic (${version})`
        );
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(`["TectonicProvider"] Failed to look up Tectonic version`);
    }
  }

  React.useEffect(() => {
    fetchTectonicVersion();
  }, []);

  React.useEffect(() => {
    fetchCollectionStats();
  }, [collection, token]);

  const values = React.useMemo(() => {
    return {
      timeZone,
      setTimeZone,
      primaryColor,
      setPrimaryColor,
      baseUrl,
      token,
      setToken,
      setBaseUrl,
      timeRange,
      setTimeRange,
      dateField,
      setDateField,
      collection,
      setCollection,
      setStats,
      stats,
      isReady,
      onRequest,
    };
  }, [
    token,
    baseUrl,
    setToken,
    setBaseUrl,
    timeRange,
    setTimeRange,
    dateField,
    setDateField,
    collection,
    setCollection,
    setStats,
    stats,
    isReady,
    primaryColor,
    setPrimaryColor,
    timeZone,
    setTimeZone,
    onRequest,
  ]);

  return (
    <TectonicContext.Provider value={values}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </TectonicContext.Provider>
  );
};

TectonicProvider.propTypes = {
  primaryColor: PropTypes.string,
  token: PropTypes.string,
  collection: PropTypes.string,
  dateField: PropTypes.string,
  baseUrl: PropTypes.string,
  defaultTimeRange: PropTypes.func,
  timeRange: TimeRangeType,
  getTimeRangeFromCollectionStats: PropTypes.func,
  timeZone: PropTypes.string,
  children: PropTypes.node,
};

TectonicProvider.defaultProps = defaultProps;

const useTectonicContext = () => {
  const context = React.useContext(TectonicContext);
  if (context === undefined) {
    throw new Error(
      "useTectonicContext must be used within a Tectonic Context"
    );
  }
  return context;
};

export { TectonicProvider, useTectonicContext };
