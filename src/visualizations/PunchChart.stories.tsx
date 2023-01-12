import React from "react";

import { PunchChart } from "./PunchChart";
import { TectonicProvider } from "../components/TectonicProvider";

import { data } from "../../data/punchchart.json";

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

const TemplateWithProvider = (args) => (
  <TectonicProvider>
    <div style={{ background: "red" }}>
      <PunchChart title={"With Provider"} titleAlign="center" {...args} />
    </div>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = {
  data,
  status: "success",
};
