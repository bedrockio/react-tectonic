import React from "react";

const TectonicContext = React.createContext({});

const TectonicProvider = ({ children, baseUrl, token }) => {
  const [token, setToken] = React.useState(token);
  const [baseUrl, setBaseUrl] = React.useState(baseUrl);

  const values = React.useMemo(() => {
    return {
      baseUrl,
      token,
      setToken,
      setBaseUrl,
    };
  }, [token, baseUrl, setToken, setBaseUrl]);

  return (
    <TectonicContext.Provider value={values}>
      {children}
    </TectonicContext.Provider>
  );
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
