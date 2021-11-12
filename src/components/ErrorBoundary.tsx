import React from "react";

import { Message } from "./Message";
import { IStats } from "../types";

type ErrorBoundaryProps = {
  error?: Error;
  stats?: IStats;
  minEventCount?: number;
  minEventError: string;
};

type ErrorBoundaryState = {
  error?: Error;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    minEventCount: 2,
    minEventError: "Not enough events",
  };

  state = { error: this.props.error };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    const { error } = this.state;
    const { stats, minEventCount, minEventError } = this.props;

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

    if (stats?.count < minEventCount) {
      return <Message error>{minEventError}</Message>;
    }

    return this.props.children;
  }
}
