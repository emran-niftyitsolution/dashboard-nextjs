import { UserFormData, UserGender, UserRole, UserStatus } from "../types";

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 50;
};

// Username validation
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

// User form validation
export interface UserFormValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phone?: string;
  password?: string;
}

export const validateUserForm = (
  data: Partial<UserFormData>
): UserFormValidationErrors => {
  const errors: UserFormValidationErrors = {};

  // First name validation
  if (!data.firstName?.trim()) {
    errors.firstName = "First name is required";
  } else if (!isValidName(data.firstName)) {
    errors.firstName = "First name must be between 2 and 50 characters";
  }

  // Last name validation
  if (!data.lastName?.trim()) {
    errors.lastName = "Last name is required";
  } else if (!isValidName(data.lastName)) {
    errors.lastName = "Last name must be between 2 and 50 characters";
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Username validation (optional)
  if (data.username && !isValidUsername(data.username)) {
    errors.username =
      "Username must be 3-20 characters, letters, numbers, and underscores only";
  }

  // Phone validation (optional)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Password validation (required for create, optional for update)
  if (data.password && !isValidPassword(data.password)) {
    errors.password =
      "Password must be at least 8 characters with uppercase, lowercase, number, and symbol";
  }

  return errors;
};

// Enum validation helpers
export const isValidUserGender = (gender: string): gender is UserGender => {
  return ["MALE", "FEMALE"].includes(gender);
};

export const isValidUserRole = (role: string): role is UserRole => {
  return ["USER", "ADMIN", "SUPER_ADMIN"].includes(role);
};

export const isValidUserStatus = (status: string): status is UserStatus => {
  return ["PENDING", "ACTIVE", "INACTIVE", "BANNED"].includes(status);
};

// Generic validation helpers
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const isMinLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

export const isMaxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};
