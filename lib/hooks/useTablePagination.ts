import { useMemo } from "react";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface UseTablePaginationProps<T> {
  data: T[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export function useTablePagination<T>({
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
}: UseTablePaginationProps<T>) {
  const paginationState = useMemo((): PaginationState => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [currentPage, itemsPerPage, totalItems, totalPages]);

  const paginatedData = useMemo(() => {
    return data;
  }, [data]);

  return {
    paginationState,
    paginatedData,
  };
}
