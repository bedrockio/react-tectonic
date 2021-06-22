import React from "react";

import "react-day-picker/lib/style.css";

import { TimeRangePicker } from "./TimeRangePicker";
import { TectonicProvider } from "./TectonicProvider";
import { convert } from "../utils/dateMath";
import { AggregateTimeSeries } from "../aggregations";
import { SeriesChart } from "../visualizations";

export default {
  title: "Components/TimeRangePicker",
  component: TimeRangePicker,
  argTypes: {},
};

const Template = (args) => (
  <TectonicProvider>
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <button onClick={handleOnClick}>{text}</button>
      )}
      onChange={(c) => {
        console.log(
          new Date(Date.now() + convert(c.from)),
          new Date(Date.now() + convert(c.to) * 1000)
        );
      }}
      {...args}
    />
  </TectonicProvider>
);

export const Simple = (args) => <Template {...args} />;

const TemplateWithChart = (args) => (
  <TectonicProvider
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    dateField="event.orderedAt"
  >
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <button onClick={handleOnClick}>{text}</button>
      )}
      {...args}
    />
    <AggregateTimeSeries operation="count" interval="1h">
      <SeriesChart valueField="count" />
    </AggregateTimeSeries>
  </TectonicProvider>
);

export const WithChart = (args) => <TemplateWithChart {...args} />;
