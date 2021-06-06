import React from "react";
import { TectonicProvider } from "../../.storybook/decorators";

import { AggregateStats } from "./AggregateStats";

export default {
  title: "Aggregations/AggregateStats",
  component: AggregateStats,
  decorators: [(Story) => <TectonicProvider>{Story()}</TectonicProvider>],
};

const defaultArgs = {
  collection: "bar-purchases",
  fields: ["event.consumption.price"],
};

const TemplateAsFunction = (args) => (
  <AggregateStats {...args}>
    {({ data = {}, status }) => {
      return (
        <div>
          Count: {JSON.stringify(data)}
          <br />
          Status: {JSON.stringify(status)}
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
