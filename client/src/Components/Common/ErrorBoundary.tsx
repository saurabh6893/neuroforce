// src/Components/Common/ErrorBoundary.tsx
import { Component, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <Navigate to={ROUTES.LOGIN} replace />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
