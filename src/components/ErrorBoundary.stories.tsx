import React from "react";

import { ErrorBoundary } from ".";

export default {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  argTypes: {},
};

const Template = ({ children, ...props }) => (
  <ErrorBoundary {...props}>{children}</ErrorBoundary>
);

export const NoError = Template.bind({});
NoError.args = {
  children: <div>worked</div>,
};

export const withError = Template.bind({});
withError.args = {
  children: <div>Error</div>,
  error: new Error("Test Error"),
};
