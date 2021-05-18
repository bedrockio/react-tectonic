import React from "react";

import { DonutChart } from "./DonutChart";

export default {
  title: "Visualizations/DonutChart",
  component: DonutChart,
};

export const DonutChartWithData = DonutChart.bind({});

DonutChartWithData.args = {
  data: [
    { key: "Every Day Skin Routine", count: 2424, value: 3718100 },
    { key: "Runway to Real Life", count: 924, value: 1416600 },
  ],
};

export const WithoutData = () => <DonutChart data={[]} />;
