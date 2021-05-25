import React from "react";

const TectonicContext = React.createContext({});

const TectonicProvider = ({ children, baseUrl, token }) => {
  const values = React.useMemo(() => {
    return {
      baseUrl,
      token,
    };
  }, [token, baseUrl]);

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
