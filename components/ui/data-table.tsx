"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
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
  roundedTop?: boolean;
}

export default function DataTable<T>({
  data,
  columns,
  actions,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  roundedTop = false,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Card
        className={cn(
          "overflow-hidden shadow-none border-0",
          roundedTop && "rounded-t-lg rounded-b-none",
          className
        )}
      >
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card
        className={cn(
          "overflow-hidden shadow-none border-0",
          roundedTop && "rounded-t-lg rounded-b-none",
          className
        )}
      >
        <div className="p-8 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "overflow-hidden shadow-none border-0",
          roundedTop && "rounded-t-lg rounded-b-none",
          className
        )}
      >
        <div className="overflow-x-auto">
          <div className="max-h-[410px] overflow-y-auto">
            <table className="w-full min-w-full">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-6 py-4 text-left text-sm font-medium text-muted-foreground whitespace-nowrap",
                        column.className
                      )}
                    >
                      {column.header}
                    </th>
                  ))}
                  {actions && actions.length > 0 && (
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground w-20 whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    className={cn(
                      "hover:bg-muted/50 transition-colors cursor-pointer border-b border-border",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm whitespace-nowrap"
                      >
                        {column.render
                          ? column.render(item, index)
                          : String(
                              (item as Record<string, unknown>)[column.key] ||
                                ""
                            )}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td className="px-6 py-4 text-right w-20 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          {actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant={action.variant || "ghost"}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(item);
                              }}
                              className="h-8 w-8 p-0"
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
        </div>
      </Card>
    </motion.div>
  );
}
