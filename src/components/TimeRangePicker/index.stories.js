import React from "react";
import { formatDistanceStrict } from "date-fns";

import "react-day-picker/lib/style.css";

import { TimeRangePicker } from ".";
import { TectonicProvider } from "../TectonicProvider";
import { Button } from "../Button";
import { toDate } from "../../utils/date";
import { AggregateTimeSeries } from "../../aggregations";
import { SeriesChart } from "../../visualizations";

export default {
  title: "Components/TimeRangePicker",
  component: TimeRangePicker,
  argTypes: {},
};

const Template = (args) => {
  const [timeRange, setTimeRange] = React.useState({
    from: "now-1h/d",
    to: "now",
  });

  return (
    <>
      <TimeRangePicker
        renderButton={(text, handleOnClick) => (
          <Button onClick={handleOnClick}>{text}</Button>
        )}
        timeRange={timeRange}
        onChange={setTimeRange}
      />
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

const TemplateWithChart = (args) => (
  <TectonicProvider
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    dateField="event.orderedAt"
  >
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <Button onClick={handleOnClick}>{text}</Button>
      )}
      {...args}
    />
    <br />
    <AggregateTimeSeries operation="count">
      <SeriesChart title="Orders Count" valueField="count" />
    </AggregateTimeSeries>
  </TectonicProvider>
);

export const WithProvider = (args) => <TemplateWithChart {...args} />;
