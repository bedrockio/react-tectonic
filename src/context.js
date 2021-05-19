import React from "react";

const TechonicContext = React.createContext({});

const TechonicProvider = ({ children, url, token }) => {
  const values = React.useMemo(() => {
    return {
      url,
      token,
    };
  }, [token, url]);

  return (
    <TechonicContext.Provider value={values}>
      {children}
    </TechonicContext.Provider>
  );
};

const useTechonicContext = () => {
  const context = React.useContext(TechonicContext);
  if (context === undefined) {
    throw new Error(
      "useTechonicContext must be used within a Techonic Context"
    );
  }
  return context;
};

export { TechonicProvider, useTechonicContext };
