import React from "react";

import "react-day-picker/lib/style.css";

import { TimeRangePicker } from "./TimeRangePicker";
import { TectonicProvider } from "./TectonicProvider";
import { convert } from "../utils/dateMath";

export default {
  title: "Components/TimeRangePicker",
  component: TimeRangePicker,
  argTypes: {},
};

const Template = (args) => (
  <TectonicProvider>
    <TimeRangePicker
      renderButton={(text, handleOnClick) => (
        <button onClick={handleOnClick}>{text}</button>
      )}
      {...args}
      onChange={(c) => {
        console.log(
          new Date(Date.now() + convert(c.from)),
          new Date(Date.now() + convert(c.to) * 1000)
        );
      }}
    />
  </TectonicProvider>
);

export const Simple = (args) => <Template {...args} />;
