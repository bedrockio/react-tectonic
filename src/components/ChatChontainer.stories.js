import React from "react";

import { ChartContainer } from "./ChartContainer";
import { ResponsiveContainer } from "recharts";

export default {
  title: "Components/ChartContainer",
  component: ChartContainer,
};

const Template = (args) => (
  <ChartContainer {...args} timeRange={{ from: "now-1M", to: "now" }}>
    <ResponsiveContainer height={400}>
      <div style={{ backgroundColor: "blue", height: `100%` }}>Chart</div>
    </ResponsiveContainer>
  </ChartContainer>
);

export const Basic = (args) => <Template {...args} />;
