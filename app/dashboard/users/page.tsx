"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { mockUsers } from "./_components/mock-data";
import PageHeader from "./_components/page-header";
import UserPagination from "./_components/pagination";
import UserFilters from "./_components/user-filters";
import UserTable from "./_components/user-table";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter users based on search term, role, and status
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === "All" || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === "All" || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, selectedRole, selectedStatus]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
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
          <UserTable users={currentUsers} />
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredUsers.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </Card>
      </motion.div>
    </div>
  );
}
