import React from "react";

import { TectonicProvider } from "./TectonicProvider";
import { Button } from "./Button";

export default {
  title: "Components/TectonicProvider",
  component: TectonicProvider,
};

const Template = (args) => {
  return <TectonicProvider {...args} />;
};

export const Basic = (args) => <Template {...args}>Hello world</Template>;

export const Theming = (args) => (
  <Template {...args}>
    <Button primary>Primary</Button>
    <Button basic>Basic</Button>
  </Template>
);
