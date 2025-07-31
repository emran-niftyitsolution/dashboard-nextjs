// Base API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    code?: string;
    path?: string[];
  }>;
}

// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phone?: string;
  gender?: UserGender;
  role?: UserRole;
  status: UserStatus;
  lastActiveAt?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export type UserGender = "MALE" | "FEMALE";
export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "PENDING" | "ACTIVE" | "INACTIVE" | "BANNED";

// Pagination Types
export interface PaginationMeta {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Form Types
export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phone?: string;
  gender?: UserGender;
  role?: UserRole;
  status?: UserStatus;
  password?: string;
}

// Authentication Types
export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  role?: UserRole;
  status: UserStatus;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

// Table Types
export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export interface TableAction<T> {
  icon: React.ReactNode;
  onClick: (item: T) => void;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

// Filter Types
export interface UserFilters {
  search?: string;
  status?: UserStatus;
  gender?: UserGender;
  role?: UserRole;
}

// Error Types
export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  isRefetching?: boolean;
  isDeleting?: boolean;
  isUpdating?: boolean;
  isCreating?: boolean;
}
