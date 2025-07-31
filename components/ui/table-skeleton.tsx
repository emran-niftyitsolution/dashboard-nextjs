import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 5,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {/* Header skeleton */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="flex space-x-6">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded w-20" />
          ))}
        </div>
      </div>

      {/* Rows skeleton */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex items-center space-x-6">
              {/* Serial number */}
              <div className="h-4 bg-gray-200 rounded w-8" />

              {/* User info */}
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>

              {/* Role */}
              <div className="h-6 bg-gray-200 rounded w-16" />

              {/* Status */}
              <div className="h-6 bg-gray-200 rounded w-20" />

              {/* Last active */}
              <div className="h-4 bg-gray-200 rounded w-24" />

              {/* Actions */}
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded" />
                <div className="w-8 h-8 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
