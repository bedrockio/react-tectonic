import React from "react";
import { TectonicProvider } from "../components/TectonicProvider";

import { AggregateCardinality } from "./AggregateCardinality";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

export default {
  title: "Aggregations/AggregateCardinality",
  component: AggregateCardinality,
};

const defaultArgs = {
  collection: "bar-purchases",
  fields: ["event.consumption.price"],
};

const TemplateWithProvider = (args) => (
  <TectonicProvider baseUrl={baseUrl} collection={collection} token={token}>
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
    collection={collection}
    baseUrl={baseUrl}
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
};

export const WithError = TemplateAsFunction.bind({});
WithError.args = {
  ...defaultArgs,
  badAttribute: 123132,
};
