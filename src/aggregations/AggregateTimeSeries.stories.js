import React from "react";

import { TectonicProvider } from "../components/TectonicProvider";
import { AggregateTimeSeries } from "./AggregateTimeSeries";
import { SeriesChart } from "../visualizations/SeriesChart";

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
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    disableCollectionStats
  >
    <AggregateTimeSeries {...args}>
      <SeriesChart variant="bar" valueField="count" />
    </AggregateTimeSeries>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const Template = (args) => (
  <AggregateTimeSeries {...args}>
    <SeriesChart variant="bar" valueField="count" />
  </AggregateTimeSeries>
);

export const Basic = Template.bind({});
Basic.args = defaultArgsWithToken;

const TemplateAsFunction = (args) => (
  <AggregateTimeSeries {...args}>
    {({ data, status }) => {
      return (
        <SeriesChart
          data={data}
          status={status}
          variant="line"
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
