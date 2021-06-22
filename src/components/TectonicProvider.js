import React from "react";
import PropTypes from "prop-types";

const TectonicContext = React.createContext({});

const TectonicProvider = ({ children, ...props }) => {
  const [token, setToken] = React.useState(props.token);
  const [baseUrl, setBaseUrl] = React.useState(props.baseUrl);
  const [timeRange, setTimeRange] = React.useState(props.timeRange);
  const [dateField, setDateField] = React.useState(props.dateField);

  const values = React.useMemo(() => {
    return {
      baseUrl,
      token,
      setToken,
      setBaseUrl,
      timeRange,
      setTimeRange,
      dateField,
      setDateField,
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
  ]);

  return (
    <TectonicContext.Provider value={values}>
      {children}
    </TectonicContext.Provider>
  );
};

TectonicProvider.propTypes = {
  token: PropTypes.string,
  dateField: PropTypes.string,
  baseUrl: PropTypes.bool,
  timeRange: PropTypes.shape({ from: PropTypes.any, to: PropTypes.any }),
};

TectonicProvider.defaultProps = {
  dateField: "ingestedAt",
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
