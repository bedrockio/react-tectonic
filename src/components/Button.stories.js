import React from "react";

import { IconCalendar } from "./Icons";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Hello</Button>;

export const Basic = (args) => <Template {...args} />;

export const PrimaryButton = (args) => <Template {...args} primary />;

export const DisabledButton = (args) => <Template {...args} disabled />;

const IconTemplate = (args) => (
  <Button {...args}>
    <IconCalendar />
  </Button>
);

export const IconButton = (args) => <IconTemplate {...args} icon />;
