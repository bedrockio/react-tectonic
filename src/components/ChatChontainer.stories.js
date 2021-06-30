import React from "react";

import { ChartContainer } from "./ChartContainer";
import { ResponsiveContainer } from "recharts";
import { IconBarChart, IconLineChart } from "./Icons";

export default {
  title: "Components/ChartContainer",
  component: ChartContainer,
};

const Template = (args) => (
  <ChartContainer {...args}>
    <ResponsiveContainer height={400}>
      <div
        style={{
          backgroundColor: "#acacac",
          height: `100%`,
          textAlign: "center",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        Chart
      </div>
    </ResponsiveContainer>
  </ChartContainer>
);

export const Basic = (args) => (
  <Template
    {...args}
    intervals={[{ label: "1day" }]}
    variants={[
      {
        label: "line",
        icon: IconLineChart,
      },
      {
        label: "bar",
        icon: IconBarChart,
      },
    ]}
    actions={[{ label: "Download" }]}
  />
);
