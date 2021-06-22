// .storybook/my-addon/register.js

import React from "react";

import { addons, types } from "@storybook/addons";

import { AddonPanel } from "@storybook/components";

const ADDON_ID = "myaddon";
const PANEL_ID = `${ADDON_ID}/panel`;

// give a unique name for the panel
const MyPanel = () => {
  const [token, setToken] = React.useState(
    window.sessionStorage.getItem("token") || ""
  );
  const [collection, setCollection] = React.useState(
    window.sessionStorage.getItem("collection") || "bar-purchases"
  );
  const [baseUrl, setBaseUrl] = React.useState(
    window.sessionStorage.getItem("baseUrl") || "http://0.0.0.0:3300"
  );

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
          <label>Collection</label> <br />
          <input
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
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

        <button
          onClick={(e) => {
            e.preventDefault();
            window.sessionStorage.setItem("token", token);
            window.sessionStorage.setItem("baseUrl", baseUrl);
            window.sessionStorage.setItem("collection", collection);
            window.location.reload();
          }}
        >
          Continue
        </button>
        <p>
          {" "}
          <i>This will reset if you close the tab</i>
        </p>
      </div>
    </div>
  );
};

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Globals",
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel />
      </AddonPanel>
    ),
  });
});
