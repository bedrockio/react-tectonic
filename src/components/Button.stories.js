import React from "react";

import { TectonicProvider } from "./TectonicProvider";
import { IconCalendar } from "./Icons";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Hello</Button>;

export const Basic = (args) => <Template {...args} />;

const IconTemplate = (args) => (
  <Button {...args}>
    <IconCalendar />
  </Button>
);

export const IconButton = (args) => <IconTemplate {...args} icon />;

const WithProvider = (args) => (
  <TectonicProvider primaryColor="#aaa">
    <Button {...args}>Hello</Button>
  </TectonicProvider>
);

export const WidthProvider = (args) => <WithProvider {...args} />;
