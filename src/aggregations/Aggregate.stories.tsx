import React from "react";
import { TectonicProvider } from "../components/TectonicProvider";

import { AggregateTerms } from "./AggregateTerms";
import { Aggregate } from "./Aggregate";
import { MultiSeriesChart } from "../visualizations";

const baseUrl = window.sessionStorage.getItem("baseUrl");
const collection = window.sessionStorage.getItem("collection");
const token = window.sessionStorage.getItem("token");

export default {
  title: "Aggregations/Aggregate",
  component: Aggregate,
  argTypes: {
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

const defaultArgs = {
  collection: "bar-purchases",
  fields: ["event.consumption.price"],
};

const TemplateWithProvider = (args) => (
  <TectonicProvider
    collection={collection}
    timeRangeMode="all"
    token={token}
    baseUrl={baseUrl}
    dateField="event.orderedAt"
    onRequest={(url, options) => {
      return fetch(url, options);
    }}
  >
    <Aggregate
      type="time-series"
      requests={["Wine", "Food", "Beer"].map((term) => {
        return {
          collection: "bar-purchases",
          operation: "sum",
          field: "event.consumption.price",
          interval: "1w",
          filter: {
            terms: [{ "event.consumption.category": { value: term } }],
          },
        };
      })}
    >
      <MultiSeriesChart
        labels={["Wine", "Food", "Beer"]}
        chartType="bar"
        stacked
        valueField="value"
      />
    </Aggregate>
  </TectonicProvider>
);

export const WithProvider = TemplateWithProvider.bind({});
WithProvider.args = defaultArgs;

const TemplateTermsAggregated = (args) => (
  <TectonicProvider
    collection={collection}
    token={token}
    baseUrl={baseUrl}
    dateField="event.orderedAt"
  >
    <AggregateTerms
      collection={"bar-purchases"}
      aggField="event.consumption.category"
      field="event.consumption.price"
      operation="sum"
      termsSize={10}
    >
      {({ data: terms, status }) => {
        return (
          <Aggregate
            type="time-series"
            requests={terms.map((term) => {
              return {
                collection: "bar-purchases",
                operation: "sum",
                field: "event.consumption.price",
                interval: "1w",
                dateField: "event.orderedAt",
                filter: {
                  terms: [
                    { "event.consumption.category": { value: term.key } },
                  ],
                },
              };
            })}
            {...args}
          >
            <MultiSeriesChart
              chartType="area"
              valueField="value"
              labels={terms.map((term) => term.key)}
            />
          </Aggregate>
        );
      }}
    </AggregateTerms>
  </TectonicProvider>
);

export const TermsAggregated = TemplateTermsAggregated.bind({});

const TemplateCardinality = (args) => (
  <TectonicProvider
    collection={collection}
    token={token}
    baseUrl={baseUrl}
    dateField="event.orderedAt"
  >
    <Aggregate
      type="cardinality"
      requests={[
        {
          fields: ["event.consumption.price"],
        },
      ]}
      {...args}
    >
      {({ data, status }) => {
        console.log(status);
        return JSON.stringify(data);
      }}
    </Aggregate>
  </TectonicProvider>
);

export const CardinalityAggregated = TemplateCardinality.bind({});
