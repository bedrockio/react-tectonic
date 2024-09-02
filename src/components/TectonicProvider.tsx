import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { TimeRangeType } from "../utils/propTypes";
import { ITimeRange, IAggregateFilterType, IStats } from "../types";
// import metadata from "../metadata.json";

// const version = (metadata as any).version;

interface IContextProps {
  primaryColor: string;
  token?: string;
  setToken: (token: string) => void;
  setBaseUrl: (url: string) => void;
  isReady: boolean;
  debug?: boolean;
  timeRange?: ITimeRange;
  timeZone: string;
  localeName: string;
  setTimeRange: (timeRange: ITimeRange) => void;
  defaultTimeRange?: ITimeRange;
  setDefaultTimeRange: (timeRange: ITimeRange) => void;
  stats: IStats | undefined;
  baseUrl?: string;
  dateField: string;
  onRequest?: (url: string, options: RequestInit) => any;
}

const TectonicContext = React.createContext({} as IContextProps);

interface ITectonicProviderProps {
  getTimeRangeFromCollectionStats?: (stats: any) => ITimeRange;
  children: React.ReactNode;
  debug?: boolean;
  token?: string;
  baseUrl?: string;
  localeName?: string;
  timeZone?: string;
  timeRange?: ITimeRange;
  defaultTimeRange?: ITimeRange;
  dateField?: string;
  collection?: string;
  primaryColor?: string;
  statsFilter?: IAggregateFilterType;
  onRequest?: (url: string, options: RequestInit) => any;
  renderNoEvent?: (stats) => JSX.Element;
}

const TectonicProvider = ({
  onRequest,
  children,
  debug,
  renderNoEvent,
  dateField: defaultDateField = "ingestedAt",
  primaryColor: defaultPrimaryColor = "#77a741",
  getTimeRangeFromCollectionStats = (stats) => {
    return {
      to: stats.to,
      from: stats.from,
    };
  },
  ...props
}: ITectonicProviderProps): JSX.Element => {
  const [token, setToken] = React.useState(props.token);
  const [baseUrl, setBaseUrl] = React.useState(props.baseUrl);
  const [timeZone, setTimeZone] = React.useState(
    props.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [timeRange, setTimeRange] = React.useState(props.timeRange);
  const [defaultTimeRange, setDefaultTimeRange] = React.useState(
    props.defaultTimeRange || props.timeRange
  );
  const [dateField, setDateField] = React.useState(defaultDateField);
  const [collection, setCollection] = React.useState(props.collection);
  const [stats, setStats] = React.useState<IStats>();
  const [primaryColor, setPrimaryColor] = React.useState(defaultPrimaryColor);
  const [isReady, setIsReady] = React.useState(false);
  const [localeName, setLocaleName] = React.useState(
    navigator.language || "en-US"
  );

  React.useEffect(() => {
    setToken(props.token);
  }, [props.token]);

  React.useEffect(() => {
    setBaseUrl(props.baseUrl);
  }, [props.baseUrl]);

  React.useEffect(() => {
    setTimeZone(
      props.timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  }, [props.timeZone]);

  React.useEffect(() => {
    setTimeRange(props.timeRange);
  }, [props.timeRange]);

  React.useEffect(() => {
    setDateField(defaultDateField);
  }, [defaultDateField]);

  React.useEffect(() => {
    setCollection(props.collection);
  }, [props.collection]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--tnic-primary-color", defaultPrimaryColor);
    root.style.setProperty(
      "--tnic-primary-color-hover",
      defaultPrimaryColor + "D9"
    );
    setPrimaryColor(primaryColor);
  }, [defaultPrimaryColor]);

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

      const stats = {
        from,
        to,
        count: data[dateField].count,
      };

      setStats(stats);
      if (!timeRange && data[dateField].min) {
        const timeRange = getTimeRangeFromCollectionStats(stats);
        setTimeRange(timeRange);
        setDefaultTimeRange(timeRange);
      }
      setIsReady(true);
    } catch (e) {
      setIsReady(true);
      // eslint-disable-next-line no-console
      console.error(
        `["TectonicProvider"] Failed to look up collection (${collection}) stats ${
          (e as Error).message
        }`
      );
      console.error(e);
    }
  }

  /*
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
  */

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
      debug,
      token,
      setToken,
      setBaseUrl,
      localeName,
      setLocaleName,
      timeRange,
      defaultTimeRange,
      setDefaultTimeRange,
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
    debug,
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
      {children}
    </TectonicContext.Provider>
  );
};

TectonicProvider.propTypes = {
  primaryColor: PropTypes.string,
  token: PropTypes.string,
  collection: PropTypes.string,
  dateField: PropTypes.string,
  baseUrl: PropTypes.string,
  defaultTimeRange: TimeRangeType,
  timeRange: TimeRangeType,
  getTimeRangeFromCollectionStats: PropTypes.func,
  timeZone: PropTypes.string,
  children: PropTypes.node,
};

const useTectonicContext = () => {
  const context = React.useContext(TectonicContext);
  if (context === undefined) {
    throw new Error(
      "useTectonicContext must be used within a Tectonic Context"
    );
  }
  return context;
};

export { TectonicProvider, useTectonicContext, TectonicContext, IContextProps };
