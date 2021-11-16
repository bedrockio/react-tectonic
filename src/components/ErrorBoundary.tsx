import React from "react";

import { Message } from "./Message";
import { IStats } from "../types";
import { TectonicContext } from "./TectonicProvider";

interface ErrorBoundaryProps {
  error?: Error;
  stats?: IStats;
  minEventCount: number;
  minEventError: string;
  className?: string;
  centered?: boolean;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    minEventCount: 2,
    minEventError: "No data available for this time period",
  };

  static contextType = TectonicContext;

  state = { error: this.props.error };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    const { error } = this.state;
    const {
      minEventCount,
      minEventError,
      className,
      centered = false,
    } = this.props;
    const { stats } = this.context;

    if (error) {
      console.error(error);

      return (
        <Message error centered={centered} className={className}>
          Failed to show visualizations:
          <br />
          {error.message}
        </Message>
      );
    }

    if (stats && stats.count < minEventCount) {
      return (
        <Message error centered={centered} className={className}>
          {minEventError}
        </Message>
      );
    }

    return this.props.children;
  }
}
