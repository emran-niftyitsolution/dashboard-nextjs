export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phone?: string;
  gender?: string;
  role?: string;
  status?: string;
  lastActiveAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to get full name
export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

// Helper function to get user initials
export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
