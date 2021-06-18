import React from "react";

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
        console.log(c);
        console.log(convert("now"));
        console.log(new Date(convert(c.from) * 1000), new Date(convert(c.to)));
      }}
    />
  </TectonicProvider>
);

export const Simple = (args) => <Template {...args} />;
