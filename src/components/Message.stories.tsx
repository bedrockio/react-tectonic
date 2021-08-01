import React from "react";

import { Message } from "./Message";

export default {
  title: "Components/Message",
  component: Message,
  argTypes: {
    center: {
      control: {
        type: "boolean",
      },
    },
  },
};

const Template = (args) => <Message {...args} />;

export const MessageWithChildren = (args) => (
  <Template {...args}>Hello world</Template>
);
