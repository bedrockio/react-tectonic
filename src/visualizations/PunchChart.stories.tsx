import React from "react";

import { PunchChart } from "./PunchChart";

const sampleData = {
  count: 4590,
};

const data = [
  sampleData,
  sampleData,
  sampleData,
  sampleData,
  sampleData,
  sampleData,
  sampleData,
].map((item, index) => {
  return {
    ...item,
    dayOfWeek: index + 1,
    hours: [...new Array(24)].map((c, index) => {
      return {
        hour: index,
        count: Math.floor(Math.random() * 100),
      };
    }),
  };
});

export default {
  title: "Visualizations/PunchChart",
  component: PunchChart,
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
  },
};

const Template = (args) => <PunchChart {...args} />;

export const WithData = Template.bind({});
WithData.args = {
  data,
  status: "success",
};

export const WithoutData = Template.bind({});
WithoutData.args = {
  data: [],
  status: "success",
};
