import React from "react";

import { ChartContainer } from "./ChartContainer";
import { ResponsiveContainer } from "recharts";

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

export const Basic = Template.bind({});

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: (
    <div>
      <b>title long title very glon</b>
    </div>
  ),
  actions: [{ label: "hello", value: "value" }],
  intervals: [{ label: "hello", value: "value" }],
  enabledControls: ["actions", "intervals"],
};
