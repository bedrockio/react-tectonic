import React from "react";

import { AggregateTerms } from "./AggregateTerms";
import { Table } from "../visualizations/Table";
import { DonutChart } from "../visualizations/DonutChart";
import { TectonicProvider } from "../components/TectonicProvider";

export default {
  title: "Aggregations/AggregateTerms",
  component: AggregateTerms,
};

const defaultArgs = {
  collection: "bar-purchases",
  aggField: "event.customer.name",
  field: "event.consumption.price",
  aggFieldOrder: "desc",
  operation: "sum",
  termsSize: 10,
  includeTopHit: true,
};

const defaultArgsWithToken = {
  ...defaultArgs,
  token: window.sessionStorage.getItem("token"),
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    baseUrl={window.sessionStorage.getItem("baseUrl")}
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    disableInitialization
  >
    <AggregateTerms {...args}>
      <Table />
    </AggregateTerms>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const Template = (args) => (
  <AggregateTerms {...args}>
    <Table />
  </AggregateTerms>
);

export const Basic = Template.bind({});
Basic.args = defaultArgsWithToken;

const TemplateAsFunction = (args) => (
  <AggregateTerms {...args}>
    {({ data, status }) => {
      return <Table data={data} status={status} />;
    }}
  </AggregateTerms>
);

export const AsFunction = TemplateAsFunction.bind({});
AsFunction.args = defaultArgsWithToken;

export const WithError = TemplateAsFunction.bind({});
WithError.args = {
  ...defaultArgsWithToken,
  badAttribute: 1123,
};

const TemplateDonut = (args) => (
  <AggregateTerms {...args}>
    <DonutChart />
  </AggregateTerms>
);
export const AsDonut = TemplateDonut.bind({});
AsDonut.args = defaultArgsWithToken;
