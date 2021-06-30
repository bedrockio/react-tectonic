import React from "react";

import { DonutChart } from "./DonutChart";
import { TectonicProvider } from "../components/TectonicProvider";

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

const TemplateWithProvider = (args) => (
  <TectonicProvider disableInitialization>
    <DonutChart {...args} />
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = {
  data: [
    { key: "Cocktail", count: 2372, value: 0 },
    { key: "Liquor", count: 1078, value: 0 },
    { key: "Wine", count: 619, value: 0 },
    { key: "Food", count: 540, value: 0 },
    { key: "Beverage", count: 354, value: 0 },
    { key: "Beer", count: 294, value: 0 },
  ],
  status: "success",
};

const Template = (args) => <DonutChart {...args} />;

export const DonutChartWithData = Template.bind({});
DonutChartWithData.args = {
  data: [
    { key: "Cocktail", count: 2372, value: 0 },
    { key: "Liquor", count: 1078, value: 0 },
    { key: "Wine", count: 619, value: 0 },
    { key: "Food", count: 540, value: 0 },
    { key: "Beverage", count: 354, value: 0 },
    { key: "Beer", count: 294, value: 0 },
  ],
  status: "success",
};

export const WithoutData = Template.bind({});
WithoutData.args = {
  data: [],
  status: "success",
};
