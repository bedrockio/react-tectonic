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

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const { error } = this.state;
    console.error(error);
    if (error) {
      // You can render any custom fallback UI
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
