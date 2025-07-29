import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_USERS_QUERY } from "../graphql/users";

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

export interface PaginatedUsers {
  docs: User[];
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

export interface UseUsersOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  gender?: string;
}

export function useUsers(options: UseUsersOptions = {}) {
  const { page = 1, limit = 10, search, status, gender } = options;

  const { data, loading, error, refetch } = useQuery(GET_USERS_QUERY, {
    variables: {
      input: {
        page,
        limit,
        search: search || undefined,
        status: status || undefined,
        gender: gender || undefined,
      },
    },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const usersData: PaginatedUsers | null = useMemo(() => {
    if (!data?.getUsers) return null;
    return data.getUsers;
  }, [data]);

  const users = useMemo(() => {
    return usersData?.docs || [];
  }, [usersData]);

  const pagination = useMemo(() => {
    if (!usersData) return null;
    return {
      totalDocs: usersData.totalDocs,
      limit: usersData.limit,
      totalPages: usersData.totalPages,
      page: usersData.page,
      hasPrevPage: usersData.hasPrevPage,
      hasNextPage: usersData.hasNextPage,
      prevPage: usersData.prevPage,
      nextPage: usersData.nextPage,
    };
  }, [usersData]);

  return {
    users,
    pagination,
    loading,
    error,
    refetch,
  };
}
