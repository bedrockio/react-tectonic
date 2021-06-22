import React from "react";

export const TectonicProvider = ({ children }) => {
  const [token, setToken] = React.useState(
    window.sessionStorage.getItem("token") || ""
  );
  const [baseUrl, setBaseUrl] = React.useState(
    window.sessionStorage.getItem("baseUrl") || "http://0.0.0.0:3300"
  );

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { token, baseUrl });
  });
};
