"use client";

import { Badge } from "@/components/ui/badge";
import DataTable, { Action, Column } from "@/components/ui/data-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { User, formatDate, getFullName, getUserInitials } from "./types";

interface UserTableProps {
  users: User[];
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  startIndex?: number;
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
  startIndex = 1,
}: UserTableProps) {
  const getStatusVariant = (status?: string) => {
    if (!status) return "gray";
    return status === "ACTIVE" ? "success" : "error";
  };

  const getRoleVariant = (role?: string) => {
    if (!role) return "gray";
    switch (role) {
      case "ADMIN":
      case "SUPER_ADMIN":
        return "purple";
      case "MODERATOR":
        return "info";
      default:
        return "gray";
    }
  };

  const columns: Column<User>[] = [
    {
      key: "serial",
      header: "#",
      render: (user, index) => (
        <span className="text-sm text-muted-foreground font-medium">
          {startIndex + index}
        </span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {getUserInitials(user)}
          </div>
          <div>
            <div className="font-medium text-foreground">
              {getFullName(user)}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <Badge variant={getRoleVariant(user.role)}>{user.role || "USER"}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <Badge variant={getStatusVariant(user.status)}>
          {user.status || "PENDING"}
        </Badge>
      ),
    },
    {
      key: "lastActiveAt",
      header: "Last Active",
      render: (user) => (
        <span className="text-sm text-muted-foreground">
          {user.lastActiveAt ? formatDate(user.lastActiveAt) : "Never"}
        </span>
      ),
    },
  ];

  const actions: Action<User>[] = [
    ...(onView
      ? [
          {
            icon: <Eye className="h-4 w-4" />,
            onClick: onView,
            label: "View user",
          },
        ]
      : []),
    ...(onEdit
      ? [
          {
            icon: <Edit className="h-4 w-4" />,
            onClick: onEdit,
            label: "Edit user",
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            icon: <Trash2 className="h-4 w-4" />,
            onClick: onDelete,
            label: "Delete user",
            variant: "destructive" as const,
          },
        ]
      : []),
  ];

  return (
    <DataTable
      data={users}
      columns={columns}
      actions={actions}
      emptyMessage="No users found"
      roundedTop={true}
    />
  );
}
