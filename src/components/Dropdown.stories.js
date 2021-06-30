import React from "react";

import { Dropdown } from ".";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {},
};

const Template = (args) => (
  <Dropdown
    title="interval"
    onChange={(option) => console.log(option)}
    options={[
      {
        label: "hallo",
      },
    ]}
  />
);

export const MenuWithItems = Template.bind({});
