import React from "react";
import { formatDistanceStrict } from "date-fns";

import "react-day-picker/lib/style.css";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

import { TimeRangePicker } from ".";
import { TectonicProvider } from "../TectonicProvider";
import { Button } from "../Button";
import { toDate } from "../../utils/date";
import {
  AggregateTimeSeries,
  AggregateTerms,
  Aggregate,
} from "../../aggregations";
import { SeriesChart, MultiSeriesChart } from "../../visualizations";

export default {
  title: "Components/TimeRangePicker",
  component: TimeRangePicker,
  argTypes: {},
};

const Template = ({ alignRight, ...args }) => {
  const [timeRange, setTimeRange] = React.useState<{
    from: string | Date;
    to: string | Date;
  }>({
    from: "now-1h/d",
    to: "now",
  });

  return (
    <>
      <div style={alignRight ? { float: "right" } : {}}>
        <TimeRangePicker
          renderButton={(text, handleOnClick) => (
            <Button onClick={handleOnClick}>{text}</Button>
          )}
          timeRange={timeRange}
          onChange={(timeRange) => setTimeRange(timeRange)}
          {...(alignRight ? { align: "right" } : {})}
        />
      </div>
      <br />
      <div>TimeRange:</div>
      <div>
        From: {toDate(timeRange.from).toLocaleString()} - (
        {toDate(timeRange.from).toISOString()})
      </div>
      <div>
        To: {toDate(timeRange.to).toLocaleString()} - (
        {toDate(timeRange.to).toISOString()})
      </div>
      <div>
        Distance:{" "}
        {formatDistanceStrict(toDate(timeRange.from), toDate(timeRange.to))}
      </div>
      <div>
        Raw:
        {JSON.stringify(timeRange)}
      </div>
    </>
  );
};

export const WithoutProvider = (args) => <Template {...args} />;

export const AlignRight = (args) => (
  <Template alignRight align="right" {...args} />
);

const TemplateWithChart = (args) => (
  <TectonicProvider
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    dateField="event.orderedAt"
    timeRange={{
      from: "now/M",
      to: "now",
      label: "Today",
    }}
  >
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <Button onClick={handleOnClick}>{text}</Button>
      )}
      {...args}
    />
    <br />
    <AggregateTimeSeries operation="count">
      <SeriesChart valueField="count" />
    </AggregateTimeSeries>
  </TectonicProvider>
);

export const WithProvider = TemplateWithChart.bind({});

const TemplateWithMultiChart = (args) => (
  <TectonicProvider
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    dateField="event.orderedAt"
  >
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <Button onClick={handleOnClick}>{text}</Button>
      )}
      {...args}
    />
    <br />
    <AggregateTerms
      collection={"bar-purchases"}
      aggField="event.consumption.category"
      field="event.consumption.price"
      operation="sum"
      termsSize={2}
    >
      {({ data: terms }) => {
        return (
          <Aggregate
            type="time-series"
            requests={terms.map((term) => {
              return {
                collection: "bar-purchases",
                operation: "sum",
                field: "event.consumption.price",
                dateField: "event.orderedAt",
                filter: {
                  terms: [
                    { "event.consumption.category": { value: term.key } },
                  ],
                },
              };
            })}
          >
            <MultiSeriesChart
              chartType="area"
              valueField="value"
              labels={terms.map((term) => term.key)}
            />
          </Aggregate>
        );
      }}
    </AggregateTerms>
  </TectonicProvider>
);

export const WithMultiChartProvider = TemplateWithMultiChart.bind({});
