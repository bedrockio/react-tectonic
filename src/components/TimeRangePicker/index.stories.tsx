import React from "react";
import { formatDistanceStrict } from "date-fns";

import "react-day-picker/lib/style.css";

const baseUrl = window.sessionStorage.getItem("baseUrl") || undefined;
const collection = window.sessionStorage.getItem("collection") || undefined;
const token = window.sessionStorage.getItem("token") || undefined;

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

const Template = ({
  alignRight,
  timeOptions,
}: {
  alignRight?: string;
  timeOptions: any;
}) => {
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
          timeOptions={timeOptions}
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

const AllowedRangeTemplate = (args) => (
  <TimeRangePicker
    allowedTimeRange={{
      from: new Date(2000, 0),
      to: new Date(2010, 0),
    }}
    renderButton={(text, handleOnClick) => (
      <Button onClick={handleOnClick}>{text}</Button>
    )}
    {...args}
  />
);

export const AllowedRange = AllowedRangeTemplate.bind({});

export const AllTimeOptions = (args) => (
  <Template
    timeOptions={[
      {
        type: "fixed",
        label: "Today",
        to: "now",
        from: "now-1h/d",
      },
      {
        type: "fixed",
        label: "Yesterday",
        to: "now-1h/d",
        from: "now-1d/d",
      },
      {
        type: "fixed",
        label: "This Week",
        to: "now",
        from: "now/w",
      },

      {
        type: "fixed",
        label: "This Month",
        to: "now",
        from: "now/M",
      },

      {
        type: "fixed",
        label: "This Year",
        to: "now",
        from: "now/y",
      },

      {
        type: "input",
        unit: "hours",
        default: 24,
      },
      {
        type: "input",
        unit: "days",
        default: 7,
      },

      {
        type: "input",
        unit: "months",
        default: 3,
      },

      {
        type: "select",
        unit: "years",
        label: "Year",
        default: new Date().getFullYear() - 1,
      },

      {
        type: "select",
        unit: "months",
        label: "Month",
        default: new Date().getMonth(),
      },
    ]}
    {...args}
  />
);
