import React from "react";

import { Message } from "./Message";

type ErrorBoundaryProps = {
  error?: Error;
};

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { error: this.props.error };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      console.error(error);
      return (
        <Message error>
          Failed to show visualization:
          <br />
          {error.message}
        </Message>
      );
    }
    return this.props.children;
  }
}
