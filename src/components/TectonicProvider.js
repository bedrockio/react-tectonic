import React from "react";
import PropTypes from "prop-types";
import { request } from "../utils/request";
import { sub } from "date-fns";

const TectonicContext = React.createContext({});

const aDay = 24 * 60 * 60 * 1000;

const TectonicProvider = ({ getDefaultTimeRange, children, ...props }) => {
  const [token, setToken] = React.useState(props.token);
  const [baseUrl, setBaseUrl] = React.useState(props.baseUrl);
  const [timeRange, setTimeRange] = React.useState(props.timeRange);
  const [dateField, setDateField] = React.useState(props.dateField);
  const [collection, setCollection] = React.useState(props.collection);
  const [stats, setStats] = React.useState({
    isHistorical: false,
  });
  const [theming, setTheming] = React.useState(props.theming);

  React.useEffect(() => {
    let root = document.documentElement;
    root.style.setProperty("--tnic-primary-color", theming.primaryColor);
    root.style.setProperty("--tnic-secondary-color", theming.secondaryColor);
  }, [props.theming]);

  const [isReady, setIsReady] = React.useState(false);

  async function fetchCollectionState() {
    if (!token) {
      return console.error("[TectonicProvider] No token provided");
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

      setStats({
        isHistorical,
        from,
        to,
      });

      setTimeRange(getDefaultTimeRange(from, to, isHistorical));
      setIsReady(true);
    } catch (e) {
      setIsReady(true);
      setStats({});
    }
  }

  React.useEffect(() => {
    fetchCollectionState();
  }, [collection, token]);

  const values = React.useMemo(() => {
    return {
      theming,
      setTheming,
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
    theming,
    setTheming,
  ]);

  return (
    <TectonicContext.Provider value={values}>
      {children}
    </TectonicContext.Provider>
  );
};

TectonicProvider.propTypes = {
  theming: PropTypes.shape({
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
  }),
  token: PropTypes.string,
  dateField: PropTypes.string,
  baseUrl: PropTypes.bool,
  timeRange: PropTypes.shape({ from: PropTypes.any, to: PropTypes.any }),
  getDefaultTimeRange: PropTypes.func,
};

TectonicProvider.defaultProps = {
  theming: {
    primaryColor: "#77a741",
    secondaryColor: "#423629",
  },
  dateField: "ingestedAt",
  getDefaultTimeRange: (minDate, maxDate, isHistorical) => {
    if (isHistorical) {
      return {
        to: maxDate,
        from: new Date(
          Math.max(minDate.valueOf(), sub(maxDate, { days: 7 }).valueOf())
        ),
      };
    }

    const x = {
      to: "now",
      from: "now-1h/d",
    };
    return x;
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
