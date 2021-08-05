import React from "react";
import { TectonicProvider } from "../components/TectonicProvider";

import { AggregateCardinality } from "./AggregateCardinality";

export default {
  title: "Aggregations/AggregateCardinality",
  component: AggregateCardinality,
};

const defaultArgs = {
  collection: "bar-purchases",
  fields: ["event.consumption.price"],
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    baseUrl={window.sessionStorage.getItem("baseUrl")}
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    disableInitialization
  >
    <AggregateCardinality {...args}>
      {({ data = {}, status }) => {
        return (
          <div>
            Count: {JSON.stringify(data)}
            <br />
            Status:{" "}
            {status.error ? status.error.message : JSON.stringify(status.error)}
          </div>
        );
      }}
    </AggregateCardinality>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const TemplateAsFunction = (args) => (
  <AggregateCardinality
    token={window.sessionStorage.getItem("token")}
    {...args}
  >
    {({ data = {}, status }) => {
      return (
        <div>
          Count: {JSON.stringify(data)}
          <br />
          Status:{" "}
          {status.error
            ? `{"error": "${status.error.message}"}`
            : JSON.stringify(status.error)}
        </div>
      );
    }}
  </AggregateCardinality>
);

export const AsFunction = TemplateAsFunction.bind({});
AsFunction.args = defaultArgs;

export const CardinalityAsFunction = TemplateAsFunction.bind({});
CardinalityAsFunction.args = {
  ...defaultArgs,
  cardinality: true,
};

export const WithError = TemplateAsFunction.bind({});
WithError.args = {
  ...defaultArgs,
  badAttribute: 123132,
};
