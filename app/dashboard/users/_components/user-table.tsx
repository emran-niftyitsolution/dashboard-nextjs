"use client";

import { Badge } from "@/components/ui/badge";
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
  const getStatusVariant = (status: string) => {
    return status === "Active" ? "success" : "error";
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case "Admin":
        return "purple";
      case "Moderator":
        return "info";
      default:
        return "gray";
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
        <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => (
        <Badge variant={getStatusVariant(user.status)}>{user.status}</Badge>
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
