import React from "react";

import { SeriesChart } from "./SeriesChart";

const data = [
  {
    timestamp: 1535932800000,
    value: 14,
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
    value: 25,
  },
];

export default {
  title: "Visualizations/SeriesChart",
  component: SeriesChart,
  argTypes: {
    variant: {
      options: ["line", "area", "bar"],
      control: {
        type: "radio",
      },
    },
  },
};

const Template = (args) => <SeriesChart {...args} />;

export const WithData = Template.bind({});
WithData.args = { data };

export const WithoutData = Template.bind({});
WithoutData.args = { data: [] };
