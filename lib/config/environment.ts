// Environment configuration with type safety
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",
} as const;

// API Configuration
export const API_CONFIG = {
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:5001/graphql",
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
  RETRY_ATTEMPTS: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || "3"),
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  ENABLE_DEBUG_MODE: process.env.NEXT_PUBLIC_ENABLE_DEBUG_MODE === "true",
  ENABLE_ERROR_REPORTING:
    process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === "true",
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Dashboard",
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  DESCRIPTION:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Modern Dashboard Application",
} as const;

// Validation
export const validateEnvironment = (): void => {
  const requiredEnvVars = ["NEXT_PUBLIC_GRAPHQL_ENDPOINT"];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0 && ENV.IS_PRODUCTION) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};

// Initialize environment validation
if (typeof window === "undefined") {
  validateEnvironment();
}
