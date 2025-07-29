"use client";

import { Card } from "@/components/ui/card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useUsers } from "@/lib/hooks/useUsers";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageHeader from "./_components/page-header";
import UserPagination from "./_components/pagination";
import { User } from "./_components/types";
import UserFilters from "./_components/user-filters";
import UserTable from "./_components/user-table";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Debounce search term to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Prepare API options
  const apiOptions = {
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearchTerm || undefined,
    status: selectedStatus !== "All" ? selectedStatus : undefined,
    // Note: Backend doesn't support role filtering yet, so we'll filter client-side
  };

  const { users, pagination, loading, error, refetch } = useUsers(apiOptions);

  // Filter users by role on client-side since backend doesn't support it yet
  const filteredUsers =
    selectedRole === "All"
      ? users
      : users.filter((user) => user.role === selectedRole);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Users API error:", error);
      toast.error("Failed to load users. Please try again.");
    }
  }, [error]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleView = (user: User) => {
    console.log("View user:", user);
    // TODO: Implement view user modal/page
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
    // TODO: Implement edit user modal/page
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
    // TODO: Implement delete user confirmation
  };

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader />

        {/* Filters */}
        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {/* Table with Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <LoadingSpinner size="md" text="Loading users..." />
              </div>
            ) : (
              <>
                <UserTable
                  users={filteredUsers}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                {pagination && (
                  <UserPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    itemsPerPage={pagination.limit}
                    totalItems={pagination.totalDocs}
                    startIndex={(pagination.page - 1) * pagination.limit + 1}
                    endIndex={Math.min(
                      pagination.page * pagination.limit,
                      pagination.totalDocs
                    )}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                )}
              </>
            )}
          </Card>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
}
