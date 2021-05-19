import React from "react";

import { DonutChart } from "./DonutChart";

export default {
  title: "Visualizations/DonutChart",
  component: DonutChart,
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
  },
};

const Template = (args) => <DonutChart {...args} />;

export const DonutChartWithData = Template.bind({});

DonutChartWithData.args = {
  data: [
    { key: "Every Day Skin Routine", count: 2424, value: 3718100 },
    { key: "Runway to Real Life", count: 924, value: 1416600 },
  ],
  status: "success",
};

export const WithoutData = Template.bind({});

DonutChartWithData.args = {
  data: [],
  status: "success",
};
