import React from "react";
import { TectonicProvider } from "../../.storybook/decorators";

import { AggregateTimeSeries } from "./AggregateTimeSeries";
import { SeriesChart } from "../visualizations/SeriesChart";

export default {
  title: "Aggregations/AggregateTimeSeries",
  component: AggregateTimeSeries,
  decorators: [(Story) => <TectonicProvider>{Story()}</TectonicProvider>],
};

const Template = (args) => (
  <AggregateTimeSeries {...args}>
    <SeriesChart variant="bar" valueField="count" />
  </AggregateTimeSeries>
);

export const Regular = Template.bind({});
const defaultArgs = {
  index: "bar-purchases",
  operation: "count",
  interval: "1d",
  dateField: "event.orderedAt",
};

Regular.args = defaultArgs;

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
AsFunction.args = defaultArgs;

export const WithError = TemplateAsFunction.bind({});
