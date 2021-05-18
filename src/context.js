import React from "react";

const Context = React.createContext({});

const Provider = ({ children, url, token }) => {
  const values = React.useMemo(() => {
    return {
      url,
      token,
    };
  }, [token, url]);

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

const useContext = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useContext must be used within a Provider Context");
  }
  return context;
};

export { Provider, useContext };
