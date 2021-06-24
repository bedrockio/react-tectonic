import React from "react";

import { PunchCardChart } from "./PunchCardChart";

/*
export default {
  title: "Visualizations/PunchCardChart",
  component: PunchCardChart,
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
*/

export const PunchCardChartWithData = PunchCardChart.bind({});

PunchCardChartWithData.args = {
  data: [
    { key: "Every Day Skin Routine", count: 2424, value: 3718100 },
    { key: "Runway to Real Life", count: 924, value: 1416600 },
  ],
};

export const WithoutData = () => <PunchCardChart data={[]} />;
