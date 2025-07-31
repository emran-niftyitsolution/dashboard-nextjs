import { AppError } from "../types";

// Error types
export enum ErrorType {
  NETWORK = "NETWORK",
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  UNKNOWN = "UNKNOWN",
}

// Error severity levels
export enum ErrorSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

// Enhanced error interface
export interface EnhancedError extends AppError {
  type: ErrorType;
  severity: ErrorSeverity;
  timestamp: Date;
  context?: Record<string, unknown>;
  userActionable?: boolean;
}

// Error classification
export const classifyError = (error: unknown): ErrorType => {
  const errorObj = error as Record<string, unknown>;

  if (
    errorObj?.graphQLErrors &&
    Array.isArray(errorObj.graphQLErrors) &&
    errorObj.graphQLErrors.length > 0
  ) {
    const graphQLError = errorObj.graphQLErrors[0] as Record<string, unknown>;

    const extensions = graphQLError.extensions as Record<string, unknown>;
    switch (extensions?.code as string) {
      case "UNAUTHENTICATED":
        return ErrorType.AUTHENTICATION;
      case "FORBIDDEN":
        return ErrorType.AUTHORIZATION;
      case "BAD_USER_INPUT":
        return ErrorType.VALIDATION;
      case "NOT_FOUND":
        return ErrorType.NOT_FOUND;
      default:
        return ErrorType.SERVER;
    }
  }

  if (errorObj?.networkError) {
    return ErrorType.NETWORK;
  }

  return ErrorType.UNKNOWN;
};

// Error severity assessment
export const assessErrorSeverity = (error: unknown): ErrorSeverity => {
  const type = classifyError(error);

  switch (type) {
    case ErrorType.AUTHENTICATION:
      return ErrorSeverity.HIGH;
    case ErrorType.AUTHORIZATION:
    case ErrorType.VALIDATION:
      return ErrorSeverity.MEDIUM;
    case ErrorType.NETWORK:
      return ErrorSeverity.MEDIUM;
    default:
      return ErrorSeverity.LOW;
  }
};

// Create enhanced error
export const createEnhancedError = (
  error: unknown,
  context?: Record<string, unknown>
): EnhancedError => {
  const type = classifyError(error);
  const severity = assessErrorSeverity(error);
  const errorObj = error as Record<string, unknown>;

  return {
    message: (errorObj?.message as string) || "An unexpected error occurred",
    code: (errorObj?.code as string) || type,
    statusCode: errorObj?.statusCode as number,
    details: errorObj?.details as Record<string, unknown>,
    type,
    severity,
    timestamp: new Date(),
    context,
    userActionable: type !== ErrorType.SERVER,
  };
};

// Error logging (in production, this would send to a service like Sentry)
export const logError = (error: EnhancedError): void => {
  console.group(`Error [${error.type}] - ${error.severity}`);
  console.error("Message:", error.message);
  console.error("Code:", error.code);
  console.error("Timestamp:", error.timestamp);
  console.error("Context:", error.context);
  console.error("User Actionable:", error.userActionable);
  console.groupEnd();

  // In production, you would send this to your error reporting service
  // if (ENV.IS_PRODUCTION && FEATURE_FLAGS.ENABLE_ERROR_REPORTING) {
  //   Sentry.captureException(error);
  // }
};

// User-friendly error messages
export const getUserFriendlyMessage = (error: EnhancedError): string => {
  switch (error.type) {
    case ErrorType.NETWORK:
      return "Network error. Please check your connection and try again.";
    case ErrorType.AUTHENTICATION:
      return "Your session has expired. Please log in again.";
    case ErrorType.AUTHORIZATION:
      return "You don't have permission to perform this action.";
    case ErrorType.VALIDATION:
      return "Please check your input and try again.";
    case ErrorType.NOT_FOUND:
      return "The requested resource was not found.";
    case ErrorType.SERVER:
      return "Server error. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

// Error recovery suggestions
export const getErrorRecoverySuggestions = (error: EnhancedError): string[] => {
  const suggestions: string[] = [];

  switch (error.type) {
    case ErrorType.NETWORK:
      suggestions.push("Check your internet connection");
      suggestions.push("Try refreshing the page");
      break;
    case ErrorType.AUTHENTICATION:
      suggestions.push("Log in again");
      break;
    case ErrorType.VALIDATION:
      suggestions.push("Review the form and fix any errors");
      suggestions.push("Make sure all required fields are filled");
      break;
    case ErrorType.SERVER:
      suggestions.push("Try again in a few minutes");
      suggestions.push("Contact support if the problem persists");
      break;
  }

  return suggestions;
};

// Error boundary error handler
export const handleErrorBoundaryError = (
  error: Error,
  errorInfo: unknown
): void => {
  const enhancedError = createEnhancedError(error, {
    componentStack: errorInfo,
    errorBoundary: true,
  });

  logError(enhancedError);
};
