"use client";

import { Component, ReactNode } from "react";
import { Button } from "./button";
import { Card } from "./card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // In production, you would send this to your error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });

    // Log additional context for debugging
    console.group("Error Boundary Details");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.error("Component Stack:", errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="text-destructive text-lg font-semibold">
              Something went wrong
            </div>
            <p className="text-muted-foreground">
              An error occurred while loading this content. Please try
              refreshing the page.
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
            >
              Refresh Page
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}
