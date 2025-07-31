// API Configuration
export const API_CONFIG = {
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:5001/graphql",
  TIMEOUT: 10000,
} as const;

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
} as const;

// User Status Options
export const USER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BANNED", label: "Banned" },
] as const;

// User Role Options
export const USER_ROLE_OPTIONS = [
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
] as const;

// Gender Options
export const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
] as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  TABLE_ROW_DELAY: 0.05,
  TABLE_ROW_DURATION: 0.2,
  PAGE_TRANSITION_DURATION: 0.3,
  SKELETON_ROWS: 5,
  SKELETON_COLUMNS: 5,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "User created successfully!",
  USER_UPDATED: "User updated successfully!",
  USER_DELETED: "User deleted successfully!",
} as const;
