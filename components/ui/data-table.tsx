"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export interface Action<T> {
  icon: ReactNode;
  onClick: (item: T) => void;
  label: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export default function DataTable<T>({
  data,
  columns,
  actions,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className={`overflow-hidden ${className}`}>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className={`overflow-hidden ${className}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-4 text-left text-sm font-medium text-muted-foreground ${
                      column.className || ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
                {actions && actions.length > 0 && (
                  <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((item, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`hover:bg-muted/30 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(item)
                        : String(
                            (item as Record<string, unknown>)[column.key] || ""
                          )}
                    </td>
                  ))}
                  {actions && actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            variant={action.variant || "ghost"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(item);
                            }}
                            title={action.label}
                          >
                            {action.icon}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
