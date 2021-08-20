import React from "react";

import { TectonicProvider } from "../components/TectonicProvider";
import { AggregateTimeMap } from "./AggregateTimeMap";
import { PunchChart } from "../visualizations/PunchChart";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

export default {
  title: "Aggregations/AggregateTimeMap",
  component: AggregateTimeMap,
};

const defaultArgs = {
  collection: "bar-purchases",
  dateField: "event.orderedAt",
};

const defaultArgsWithToken = {
  ...defaultArgs,
  token: window.sessionStorage.getItem("token"),
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    timeRangeMode="all"
    baseUrl={baseUrl}
    collection={collection}
    token={token}
    dateField="event.orderedAt"
  >
    <AggregateTimeMap {...args}>
      <PunchChart />
    </AggregateTimeMap>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;
