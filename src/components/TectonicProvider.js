import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { sub, startOfDay } from "date-fns";
import { TimeRangeType } from "../utils/propTypes";
import { version } from "../../package.json";

const TectonicContext = React.createContext({});

const aDay = 24 * 60 * 60 * 1000;

const TectonicProvider = ({
  disableInitialization,
  getTimeRangeFromCollectionStats,
  children,
  ...props
}) => {
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
  const [isReady, setIsReady] = React.useState(disableInitialization);

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
        "[TectonicProvider] Please provide a `token` and `collection` or set `disableCollectionStats` to true"
      );
      return;
    }

    try {
      const data = await request({
        method: "POST",
        path: "/1/analytics/stats",
        baseUrl,
        token,
        body: {
          collection,
          fields: [dateField],
        },
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
      setTimeRange(getTimeRangeFromCollectionStats(stats));
      setIsReady(true);
    } catch (e) {
      setIsReady(true);
      // eslint-disable-next-line no-console
      console.error(
        `["TectonicProvider"] Failed to look up collection (${collection}) stats ${e.message}`
      );
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
    if (!disableInitialization) {
      fetchTectonicVersion();
    }
  }, [disableInitialization]);

  React.useEffect(() => {
    if (!disableInitialization) {
      fetchCollectionStats();
    }
  }, [collection, token, disableInitialization]);

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
  baseUrl: PropTypes.bool,
  defaultTimeRange: PropTypes.func,
  timeRange: TimeRangeType,
  getTimeRangeFromCollectionStats: PropTypes.func,
  disableInitialization: PropTypes.bool,
  timeZone: PropTypes.string,
  children: PropTypes.node,
};

TectonicProvider.defaultProps = {
  primaryColor: "#77a741",
  dateField: "ingestedAt",
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  getTimeRangeFromCollectionStats: (stats) => {
    if (stats.isHistorical) {
      return {
        to: stats.to,
        from: startOfDay(
          new Date(
            Math.max(stats.from.valueOf(), sub(stats.to, { days: 7 }).valueOf())
          )
        ),
      };
    }

    const timeRange = {
      to: "now",
      from: "now-1h/d",
    };
    return timeRange;
  },
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

export { TectonicProvider, useTectonicContext };
