import React from "react";

import { SeriesChart } from "./SeriesChart";

const data = [
  {
    timestamp: 1535932800000,
    value: 0,
  },
  {
    timestamp: 1536537600000,
    value: 22,
  },
  {
    timestamp: 1537142400000,
    value: 18,
  },
  {
    timestamp: 1537747200000,
    value: 24,
  },
  {
    timestamp: 1538352000000,
    value: 26,
  },
  {
    timestamp: 1538956800000,
    value: 20,
  },
  {
    timestamp: 1539561600000,
    value: 21,
  },
  {
    timestamp: 1540166400000,
    value: 21,
  },
  {
    timestamp: 1540771200000,
    value: 18,
  },
  {
    timestamp: 1541376000000,
    value: 20,
  },
  {
    timestamp: 1541980800000,
    value: 30,
  },
];

export default {
  title: "Visualizations/SeriesChart",
  component: SeriesChart,
  argTypes: {
    status: {
      mapping: {
        loading: { loading: true },
        success: { success: true },
        error: { error: new Error("Oops something went wrong") },
      },
      options: ["loading", "success", "error"],
      control: {
        type: "select",
      },
    },
    timeRange: {
      mapping: {
        today: { to: "now", from: "now-1h/d" },
        lastmonth: { to: "now", from: "now-1M/M" },
        none: undefined,
      },
      options: ["today", "lastmonth", "none"],
      control: {
        type: "select",
      },
    },
    enabledControls: {
      options: ["actions", "intervals", "chartTypes"],
      control: {
        type: "inline-check",
      },
    },
  },
};

const Template = (args) => <SeriesChart {...args} />;

export const WithData = Template.bind({});
WithData.args = { data, status: "success" };

export const WithoutData = Template.bind({});
WithoutData.args = { data: [], status: "success" };

export const BarChart = Template.bind({});
BarChart.args = { data, chartType: "bar", status: "success" };
