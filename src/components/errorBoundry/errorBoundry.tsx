import React, { Component, ReactNode } from 'react';

// Define the props and state interfaces for the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Create the ErrorBoundary class component
class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Lifecycle method to catch errors in child components
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  // Lifecycle method to log error information
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    // Here you can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error is caught
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    // Render children components if no error is caught
    return this.props.children;
  }
}

// Functional component wrapper for ErrorBoundary
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

export default ErrorBoundary;
