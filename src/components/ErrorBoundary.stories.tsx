import React from "react";

import { ErrorBoundary } from ".";
import { IStats } from "../types";

export default {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  argTypes: {},
};

const Template = (args) => <ErrorBoundary>{args.children}</ErrorBoundary>;

export const NoError = Template.bind({});
NoError.args = {
  children: <div>worked</div>,
};
