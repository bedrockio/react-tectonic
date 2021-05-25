import React from "react";

export const TectonicProvider = ({ children }) => {
  const [token, setToken] = React.useState(
    window.sessionStorage.getItem("token") || ""
  );
  const [baseUrl, setBaseUrl] = React.useState(
    window.sessionStorage.getItem("baseUrl") || "http://0.0.0.0:3300"
  );

  const [ready, toggleReady] = React.useState(!!token.length);

  React.useEffect(() => {
    if (ready) {
      window.sessionStorage.setItem("token", token);
      window.sessionStorage.setItem("baseUrl", baseUrl);
    }
  }, [ready, token, baseUrl]);

  if (!ready) {
    return (
      <div
        style={{
          width: "70%",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2>Please provide a token for your Tectonic instance</h2>
        <p>
          This example work better if they have access to an Tectonic instance.
        </p>

        <div>
          <div style={{ margin: "1em 0" }}>
            <label>Token</label> <br />
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{ width: "100%", fontSize: "18px", lineHeight: "18px" }}
            />
          </div>
          <div style={{ margin: "1em 0" }}>
            <label>Base Url - optional</label> <br />
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              style={{ width: "100%", fontSize: "18px", lineHeight: "18px" }}
            />
          </div>
          <button onClick={() => toggleReady(true)}>Continue</button>
          <p>
            {" "}
            <i>This will reset if you close the tab</i>
          </p>
        </div>
      </div>
    );
  }

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, { token, baseUrl });
  });
};
