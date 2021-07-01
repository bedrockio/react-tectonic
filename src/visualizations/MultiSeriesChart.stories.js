import React from "react";

import { MultiSeriesChart } from "./MultiSeriesChart";
import { TectonicProvider } from "../components/TectonicProvider";

const data1 = [
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

const data2 = [
  {
    timestamp: 1535932800000,
    value: 4,
  },
  {
    timestamp: 1536537600000,
    value: 5,
  },
  {
    timestamp: 1537142400000,
    value: 12,
  },
  {
    timestamp: 1537747200000,
    value: 3,
  },
  {
    timestamp: 1538352000000,
    value: 3,
  },
  {
    timestamp: 1538956800000,
    value: 2,
  },
  {
    timestamp: 1539561600000,
    value: 35,
  },
  {
    timestamp: 1540166400000,
    value: 23,
  },
  {
    timestamp: 1540771200000,
    value: 23,
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
  title: "Visualizations/MultiSeriesChart",
  component: MultiSeriesChart,
  argTypes: {
    chartType: {
      options: ["area", "bar", "line"],
      control: {
        type: "radio",
      },
    },
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

const TemplateWithProvider = (args) => (
  <TectonicProvider disableInitialization>
    <MultiSeriesChart {...args} />
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = {
  data: [data1, data2],
  status: "success",
};

const Template = (args) => <MultiSeriesChart {...args} />;

export const WithData = Template.bind({});
WithData.args = { data: [data1, data2], status: "success" };

export const WithoutData = Template.bind({});
WithoutData.args = { data: [], status: "success" };
