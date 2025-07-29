"use client";

import DataTable, { Action, Column } from "@/components/ui/data-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { User } from "./types";

interface UserTableProps {
  users: User[];
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
}: UserTableProps) {
  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Moderator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const columns: Column<User>[] = [
    {
      key: "user",
      header: "User",
      render: (user) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            {user.avatar}
          </div>
          <div>
            <div className="font-medium text-foreground">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(
            user.role
          )}`}
        >
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
            user.status
          )}`}
        >
          {user.status}
        </span>
      ),
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (user) => (
        <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
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
