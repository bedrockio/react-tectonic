import React from "react";
import { TectonicProvider } from "../components/TectonicProvider";

import { AggregateTerms } from "./AggregateTerms";
import { Aggregate } from "./Aggregate";
import { MultiSeriesChart } from "../visualizations";

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
    collection={window.sessionStorage.getItem("collection")}
    token={window.sessionStorage.getItem("token")}
    disableInitialization
    dateField="event.orderedAt"
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
      {...args}
    >
      <MultiSeriesChart
        valueFieldNames={["Wine", "Food", "Beer"]}
        variant="bar"
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
    token={window.sessionStorage.getItem("token")}
    disableInitialization
  >
    <AggregateTerms
      collection={"bar-purchases"}
      aggField="event.consumption.category"
      field="event.consumption.price"
      operation="sum"
      termsSize={10}
    >
      {({ data: terms }) => {
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
              variant="area"
              area
              stacked
              valueField="value"
              valueFieldNames={terms.map((term) => term.key)}
            />
          </Aggregate>
        );
      }}
    </AggregateTerms>
  </TectonicProvider>
);

export const TermsAggregated = TemplateTermsAggregated.bind();
