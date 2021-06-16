import React from "react";

import { TimeRangePicker } from "./TimeRangePicker";

export default {
  title: "Components/TimeRangePicker",
  component: TimeRangePicker,
  argTypes: {},
};

const Template = (args) => <TimeRangePicker {...args} />;

export const Simple = (args) => <Template {...args} />;
