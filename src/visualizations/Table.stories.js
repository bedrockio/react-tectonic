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
};

const Template = (args) => <Table {...args} />;

export const WithData = Template.bind({});
WithData.args = { data };

export const WithoutData = Template.bind({});
WithoutData.args = { data: [] };
