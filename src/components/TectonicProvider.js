import React from "react";
import PropTypes from "prop-types";

const TectonicContext = React.createContext({});

const TectonicProvider = ({ children, ...props }) => {
  const [token, setToken] = React.useState(props.token);
  const [baseUrl, setBaseUrl] = React.useState(props.baseUrl);
  const [timeRange, setTimeRange] = React.useState(props.timeRange);

  const values = React.useMemo(() => {
    return {
      baseUrl,
      token,
      setToken,
      setBaseUrl,
      timeRange,
      setTimeRange,
    };
  }, [token, baseUrl, setToken, setBaseUrl, timeRange, setTimeRange]);

  return (
    <TectonicContext.Provider value={values}>
      {children}
    </TectonicContext.Provider>
  );
};

TectonicProvider.propTypes = {
  token: PropTypes.string,
  baseUrl: PropTypes.bool,
  timeRange: PropTypes.shape({ from: PropTypes.any, to: PropTypes.any }),
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
