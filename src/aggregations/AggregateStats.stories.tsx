import React from "react";
import { TectonicProvider } from "../components/TectonicProvider";

import { AggregateStats } from "./AggregateStats";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

export default {
  title: "Aggregations/AggregateStats",
  component: AggregateStats,
};

const defaultArgs = {
  collection: "bar-purchases",
  fields: ["event.consumption.price"],
};

const TemplateWithProvider = (args) => (
  <TectonicProvider baseUrl={baseUrl} collection={collection} token={token}>
    <AggregateStats {...args}>
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
    </AggregateStats>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const TemplateAsFunction = (args) => (
  <AggregateStats
    baseUrl={baseUrl}
    collection={collection}
    token={token}
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
  </AggregateStats>
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
