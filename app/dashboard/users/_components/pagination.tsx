"use client";

import Pagination from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}

export default function UserPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onItemsPerPageChange,
}: UserPaginationProps) {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      startIndex={startIndex}
      endIndex={endIndex}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
    />
  );
}
