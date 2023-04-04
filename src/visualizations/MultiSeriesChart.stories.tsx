import React from "react";

import { MultiSeriesChart } from "./MultiSeriesChart";
import { TectonicProvider } from "../components/TectonicProvider";

const realdata = [
  [
    {
      value: 1.12,
      timestamp: 1672707600000,
    },
    {
      value: 1.32,
      timestamp: 1672711200000,
    },
    {
      value: 1.84,
      timestamp: 1672714800000,
    },
    {
      value: 1.55,
      timestamp: 1672718400000,
    },
    {
      value: 1.33,
      timestamp: 1672722000000,
    },
    {
      value: 1.38,
      timestamp: 1672725600000,
    },
    {
      value: 1.1,
      timestamp: 1672729200000,
    },
    {
      value: 1.07,
      timestamp: 1672732800000,
    },
    {
      value: 1.16,
      timestamp: 1672736400000,
    },
    {
      value: 1.31,
      timestamp: 1672740000000,
    },
    {
      value: 0.84,
      timestamp: 1672743600000,
    },
    {
      value: 1.02,
      timestamp: 1672747200000,
    },
    {
      value: 0.89,
      timestamp: 1672750800000,
    },
    {
      value: 0.73,
      timestamp: 1672754400000,
    },
    {
      value: 0.8,
      timestamp: 1672758000000,
    },
    {
      value: 0.83,
      timestamp: 1672761600000,
    },
    {
      value: 0.81,
      timestamp: 1672765200000,
    },
    {
      value: 0.85,
      timestamp: 1672768800000,
    },
    {
      value: 1.05,
      timestamp: 1672772400000,
    },
    {
      value: 0.91,
      timestamp: 1672776000000,
    },
    {
      value: 1.01,
      timestamp: 1672779600000,
    },
    {
      value: 0.84,
      timestamp: 1672783200000,
    },
    {
      value: 0.75,
      timestamp: 1672786800000,
    },
    {
      value: 0.11,
      timestamp: 1672790400000,
    },
    {
      value: 0.03,
      timestamp: 1672794000000,
    },
    {
      value: 0.02,
      timestamp: 1672797600000,
    },
    {
      value: 0.02,
      timestamp: 1672801200000,
    },
    {
      value: 0.04,
      timestamp: 1672804800000,
    },
    {
      value: 0,
      timestamp: 1672808400000,
    },
    {
      value: 0,
      timestamp: 1672812000000,
    },
    {
      value: 0.02,
      timestamp: 1672815600000,
    },
    {
      value: 0,
      timestamp: 1672819200000,
    },
    {
      value: 0.5,
      timestamp: 1672822800000,
    },
    {
      value: 0.74,
      timestamp: 1672826400000,
    },
    {
      value: 0.7,
      timestamp: 1672830000000,
    },
    {
      value: 0.74,
      timestamp: 1672833600000,
    },
    {
      value: 0.87,
      timestamp: 1672837200000,
    },
    {
      value: 0.82,
      timestamp: 1672840800000,
    },
    {
      value: 2.3,
      timestamp: 1672844400000,
    },
    {
      value: 0.81,
      timestamp: 1672848000000,
    },
    {
      value: 0.95,
      timestamp: 1672851600000,
    },
    {
      value: 0.81,
      timestamp: 1672855200000,
    },
    {
      value: 0.87,
      timestamp: 1672858800000,
    },
    {
      value: 0.9,
      timestamp: 1672862400000,
    },
    {
      value: 0.78,
      timestamp: 1672866000000,
    },
    {
      value: 0.84,
      timestamp: 1672869600000,
    },
    {
      value: 1.01,
      timestamp: 1672873200000,
    },
    {
      value: 0.15,
      timestamp: 1672876800000,
    },
    {
      value: 0,
      timestamp: 1672880400000,
    },
    {
      value: 0.01,
      timestamp: 1672884000000,
    },
    {
      value: 0.08,
      timestamp: 1672887600000,
    },
    {
      value: 0.03,
      timestamp: 1672891200000,
    },
    {
      value: 0,
      timestamp: 1672894800000,
    },
    {
      value: 0,
      timestamp: 1672898400000,
    },
    {
      value: 0,
      timestamp: 1672902000000,
    },
    {
      value: 0,
      timestamp: 1672905600000,
    },
    {
      value: 0,
      timestamp: 1672909200000,
    },
    {
      value: 0,
      timestamp: 1672912800000,
    },
    {
      value: 0,
      timestamp: 1672916400000,
    },
    {
      value: 0,
      timestamp: 1672920000000,
    },
    {
      value: 0,
      timestamp: 1672923600000,
    },
    {
      value: 0.27,
      timestamp: 1672927200000,
    },
    {
      value: 0.74,
      timestamp: 1672930800000,
    },
    {
      value: 0.77,
      timestamp: 1672934400000,
    },
    {
      value: 0.79,
      timestamp: 1672938000000,
    },
    {
      value: 0.79,
      timestamp: 1672941600000,
    },
    {
      value: 0.97,
      timestamp: 1672945200000,
    },
    {
      value: 1.01,
      timestamp: 1672948800000,
    },
    {
      value: 0.8,
      timestamp: 1672952400000,
    },
    {
      value: 1.01,
      timestamp: 1672956000000,
    },
    {
      value: 1.28,
      timestamp: 1672959600000,
    },
    {
      value: 0.17,
      timestamp: 1672963200000,
    },
    {
      value: 0,
      timestamp: 1672966800000,
    },
    {
      value: 0.05,
      timestamp: 1672970400000,
    },
    {
      value: 0.15,
      timestamp: 1672974000000,
    },
    {
      value: 0,
      timestamp: 1672977600000,
    },
    {
      value: 0,
      timestamp: 1672981200000,
    },
    {
      value: 0,
      timestamp: 1672984800000,
    },
    {
      value: 0,
      timestamp: 1672988400000,
    },
    {
      value: 0,
      timestamp: 1672992000000,
    },
    {
      value: 0,
      timestamp: 1672995600000,
    },
    {
      value: 0,
      timestamp: 1672999200000,
    },
    {
      value: 0,
      timestamp: 1673002800000,
    },
    {
      value: 0.01,
      timestamp: 1673006400000,
    },
    {
      value: 0,
      timestamp: 1673010000000,
    },
    {
      value: 0.21,
      timestamp: 1673013600000,
    },
    {
      value: 0.83,
      timestamp: 1673017200000,
    },
    {
      value: 0.83,
      timestamp: 1673020800000,
    },
    {
      value: 0.89,
      timestamp: 1673024400000,
    },
    {
      value: 1.03,
      timestamp: 1673028000000,
    },
    {
      value: 0.95,
      timestamp: 1673031600000,
    },
    {
      value: 0.98,
      timestamp: 1673035200000,
    },
    {
      value: 0.97,
      timestamp: 1673038800000,
    },
    {
      value: 0.88,
      timestamp: 1673042400000,
    },
    {
      value: 0.9,
      timestamp: 1673046000000,
    },
    {
      value: 0.2,
      timestamp: 1673049600000,
    },
    {
      value: 0,
      timestamp: 1673053200000,
    },
    {
      value: 0,
      timestamp: 1673056800000,
    },
    {
      value: 0,
      timestamp: 1673060400000,
    },
    {
      value: 0,
      timestamp: 1673064000000,
    },
    {
      value: 0,
      timestamp: 1673067600000,
    },
    {
      value: 0,
      timestamp: 1673071200000,
    },
    {
      value: 0,
      timestamp: 1673074800000,
    },
    {
      value: 0,
      timestamp: 1673078400000,
    },
    {
      value: 0,
      timestamp: 1673082000000,
    },
    {
      value: 0,
      timestamp: 1673085600000,
    },
    {
      value: 0,
      timestamp: 1673089200000,
    },
    {
      value: 0,
      timestamp: 1673092800000,
    },
    {
      value: 0,
      timestamp: 1673096400000,
    },
    {
      value: 0.09,
      timestamp: 1673100000000,
    },
    {
      value: 0.48,
      timestamp: 1673103600000,
    },
    {
      value: 0.64,
      timestamp: 1673107200000,
    },
    {
      value: 0.87,
      timestamp: 1673110800000,
    },
    {
      value: 0.99,
      timestamp: 1673114400000,
    },
    {
      value: 0.71,
      timestamp: 1673118000000,
    },
    {
      value: 0.71,
      timestamp: 1673121600000,
    },
    {
      value: 0.95,
      timestamp: 1673125200000,
    },
    {
      value: 1.01,
      timestamp: 1673128800000,
    },
    {
      value: 0.57,
      timestamp: 1673132400000,
    },
    {
      value: 0.06,
      timestamp: 1673136000000,
    },
    {
      value: 0.03,
      timestamp: 1673139600000,
    },
    {
      value: 0,
      timestamp: 1673143200000,
    },
    {
      value: 0,
      timestamp: 1673146800000,
    },
    {
      value: 0.05,
      timestamp: 1673150400000,
    },
    {
      value: 0.02,
      timestamp: 1673154000000,
    },
    {
      value: 0.73,
      timestamp: 1673157600000,
    },
    {
      value: 1.06,
      timestamp: 1673161200000,
    },
    {
      value: 0.75,
      timestamp: 1673164800000,
    },
    {
      value: 0.83,
      timestamp: 1673168400000,
    },
    {
      value: 0.62,
      timestamp: 1673172000000,
    },
    {
      value: 0.55,
      timestamp: 1673175600000,
    },
    {
      value: 0.57,
      timestamp: 1673179200000,
    },
    {
      value: 0.56,
      timestamp: 1673182800000,
    },
    {
      value: 0.77,
      timestamp: 1673186400000,
    },
    {
      value: 1.16,
      timestamp: 1673190000000,
    },
    {
      value: 3.68,
      timestamp: 1673193600000,
    },
    {
      value: 1.35,
      timestamp: 1673197200000,
    },
    {
      value: 0.76,
      timestamp: 1673200800000,
    },
    {
      value: 0.9,
      timestamp: 1673204400000,
    },
    {
      value: 0.79,
      timestamp: 1673208000000,
    },
    {
      value: 1.11,
      timestamp: 1673211600000,
    },
    {
      value: 1.85,
      timestamp: 1673215200000,
    },
    {
      value: 0.99,
      timestamp: 1673218800000,
    },
    {
      value: 0.23,
      timestamp: 1673222400000,
    },
    {
      value: 0.01,
      timestamp: 1673226000000,
    },
    {
      value: 0,
      timestamp: 1673229600000,
    },
    {
      value: 0,
      timestamp: 1673233200000,
    },
    {
      value: 0,
      timestamp: 1673236800000,
    },
    {
      value: 0,
      timestamp: 1673240400000,
    },
    {
      value: 0,
      timestamp: 1673244000000,
    },
    {
      value: 0,
      timestamp: 1673247600000,
    },
    {
      value: 0,
      timestamp: 1673251200000,
    },
    {
      value: 0,
      timestamp: 1673254800000,
    },
    {
      value: 0,
      timestamp: 1673258400000,
    },
    {
      value: 0,
      timestamp: 1673262000000,
    },
    {
      value: 0.01,
      timestamp: 1673265600000,
    },
    {
      value: 0,
      timestamp: 1673269200000,
    },
    {
      value: 0.32,
      timestamp: 1673272800000,
    },
    {
      value: 0.65,
      timestamp: 1673276400000,
    },
    {
      value: 0.66,
      timestamp: 1673280000000,
    },
    {
      value: 0.85,
      timestamp: 1673283600000,
    },
    {
      value: 0.94,
      timestamp: 1673287200000,
    },
    {
      value: 0.79,
      timestamp: 1673290800000,
    },
    {
      value: 0.84,
      timestamp: 1673294400000,
    },
    {
      value: 1,
      timestamp: 1673298000000,
    },
    {
      value: 0.88,
      timestamp: 1673301600000,
    },
    {
      value: 1.04,
      timestamp: 1673305200000,
    },
  ],
  [
    {
      value: 0.97,
      timestamp: 1673308800000,
    },
    {
      value: 0.19,
      timestamp: 1673312400000,
    },
    {
      value: 0.06,
      timestamp: 1673316000000,
    },
    {
      value: 1,
      timestamp: 1673362800000,
    },
    {
      value: 0.9,
      timestamp: 1673366400000,
    },
    {
      value: 0.7,
      timestamp: 1673370000000,
    },
    {
      value: 1.2,
      timestamp: 1673373600000,
    },
    {
      value: 1.6,
      timestamp: 1673377200000,
    },
    {
      value: 1.7,
      timestamp: 1673380800000,
    },
    {
      value: 1.5,
      timestamp: 1673384400000,
    },
    {
      value: 0.55,
      timestamp: 1673388000000,
    },
    {
      value: 0.8,
      timestamp: 1673391600000,
    },
  ],
];

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
  <TectonicProvider>
    <div style={{ background: "red" }}>
      <MultiSeriesChart
        title={"With Provider"}
        titleAlign="center"
        {...args}
        height={350}
        chartType="area"
        stacked
      />
    </div>
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

export const WithRealData = Template.bind({});
WithRealData.args = { data: realdata, status: "success" };

export const WithoutData = Template.bind({});
WithoutData.args = { data: [], status: "success" };

export const WithColorsData = Template.bind({});
WithColorsData.args = {
  data: [data1, data2],
  status: "success",
  colors: ["blue", "red", "green"],
};
