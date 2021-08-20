import React from "react";

import { TectonicProvider } from "../components/TectonicProvider";
import { AggregateTimeSeries } from "./AggregateTimeSeries";
import { SeriesChart } from "../visualizations/SeriesChart";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

export default {
  title: "Aggregations/AggregateTimeSeries",
  component: AggregateTimeSeries,
};

const defaultArgs = {
  collection: "bar-purchases",
  operation: "count",
  interval: "1d",
  dateField: "event.orderedAt",
};

const defaultArgsWithToken = {
  ...defaultArgs,
  token: window.sessionStorage.getItem("token"),
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    timeRangeMode="all"
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    dateField="event.orderedAt"
  >
    <AggregateTimeSeries {...args}>
      <SeriesChart chartType="bar" valueField="count" />
    </AggregateTimeSeries>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const Template = (args) => (
  <AggregateTimeSeries
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    {...args}
  >
    <SeriesChart chartType="bar" valueField="count" />
  </AggregateTimeSeries>
);

export const Basic = Template.bind({});
Basic.args = defaultArgsWithToken;

const TemplateAsFunction = (args) => (
  <AggregateTimeSeries
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    {...args}
  >
    {({ data, status }) => {
      return (
        <SeriesChart
          data={data}
          status={status}
          chartType="line"
          valueField="count"
        />
      );
    }}
  </AggregateTimeSeries>
);

export const AsFunction = TemplateAsFunction.bind({});
AsFunction.args = defaultArgsWithToken;

export const WithError = TemplateAsFunction.bind({});
WithError.args = {
  ...defaultArgsWithToken,
  badAttribute: 12313,
};
