"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Select, { SelectOption } from "@/components/ui/primary-input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const roleOptions: SelectOption[] = [
  { value: "All", label: "All Roles" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

const statusOptions: SelectOption[] = [
  { value: "All", label: "All Status" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BANNED", label: "Banned" },
  { value: "PENDING", label: "Pending" },
];

export default function UserFilters({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  selectedStatus,
  setSelectedStatus,
}: UserFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              type="select"
              value={selectedRole}
              onChange={(value) => setSelectedRole(String(value))}
              options={roleOptions}
              placeholder="Select role"
              size="sm"
              className="min-w-[140px]"
            />

            <Select
              type="select"
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(String(value))}
              options={statusOptions}
              placeholder="Select status"
              size="sm"
              className="min-w-[140px]"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
