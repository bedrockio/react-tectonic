import React from "react";

import { AggregateTerms } from "./AggregateTerms";
import { Table } from "../visualizations/Table";
import { TectonicProvider } from "../../.storybook/decorators";

export default {
  title: "Aggregations/AggregateTerms",
  component: AggregateTerms,
  decorators: [(Story) => <TectonicProvider>{Story()}</TectonicProvider>],
};

const Template = (args) => (
  <AggregateTerms {...args}>
    <Table />
  </AggregateTerms>
);

export const Regular = Template.bind({});
const defaultArgs = {
  index: "bar-purchases",
  aggField: "event.server.name",
  field: "event.consumption.price",
  operation: "sum",
  termsSize: 10,
};

Regular.args = defaultArgs;

const TemplateAsFunction = (args) => (
  <AggregateTerms {...args}>
    {({ data, status }) => {
      return <Table data={data} status={status} />;
    }}
  </AggregateTerms>
);

export const AsFunction = TemplateAsFunction.bind({});
AsFunction.args = defaultArgs;

export const WithError = TemplateAsFunction.bind({});
