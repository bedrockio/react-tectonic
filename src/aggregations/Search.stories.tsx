import React from "react";

import { TectonicProvider } from "../components/TectonicProvider";
import { Search } from "./Search";
import { Table } from "../visualizations/Table";

const baseUrl = window.sessionStorage.getItem("baseUrl") || undefined;
const collection = window.sessionStorage.getItem("collection") || undefined;
const token = window.sessionStorage.getItem("token") || undefined;

export default {
  title: "Aggregations/Search",
  component: Search,
};

const defaultArgs = {
  collection: "bar-purchases",
};

const defaultArgsWithToken = {
  ...defaultArgs,
  token: window.sessionStorage.getItem("token"),
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    dateField="event.orderedAt"
  >
    <Search {...args}>
      <Table
        labelField="_source.event.venue.name"
        valueField="_source.event.amountPaid"
      />
    </Search>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const Template = (args) => (
  <Search baseUrl={baseUrl} collection={collection} token={token} {...args}>
    <Table />
  </Search>
);

export const Basic = Template.bind({});
Basic.args = defaultArgsWithToken;

const TemplateAsFunction = (args) => (
  <Search baseUrl={baseUrl} collection={collection} token={token} {...args}>
    {({ data, status }) => {
      return <Table data={data} status={status} />;
    }}
  </Search>
);

export const AsFunction = TemplateAsFunction.bind({});
AsFunction.args = defaultArgsWithToken;

export const WithError = TemplateAsFunction.bind({});
WithError.args = {
  ...defaultArgsWithToken,
  badAttribute: 12313,
};
