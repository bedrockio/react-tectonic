import React from "react";

import { Table } from "./Table";

const data = [
  { key: "Amsterdam", value: 806 },
  { key: "Rotterdam", value: 389 },
  { key: "Den Haag", value: 284 },
  { key: "Almere", value: 279 },
  { key: "Utrecht", value: 258 },
  { key: "Eindhoven", value: 183 },
  { key: "Amersfoort", value: 163 },
  { key: "Tilburg", value: 158 },
  { key: "Arnhem", value: 157 },
];

export default {
  title: "Visualizations/Table",
  component: Table,
  argTypes: {
    title: {
      control: {
        type: "text",
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
    enabledControls: {
      options: ["actions"],
      control: {
        type: "inline-check",
      },
    },
  },
};

const Template = (args) => <Table {...args} />;

export const WithData = Template.bind({});
WithData.args = { data, status: "success" };

export const WithLittleData = Template.bind({});
WithLittleData.args = {
  data: [
    { key: "Amsterdam", value: 806 },
    { key: "Rotterdam", value: 389 },
  ],
  status: "success",
};

export const WithoutData = Template.bind({});
WithoutData.args = { data: [], status: "success" };
