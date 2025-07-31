"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface SelectWrapperProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export default function SelectWrapper({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  size = "md",
  icon,
}: SelectWrapperProps) {
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base",
  };

  return (
    <Select
      value={String(value)}
      onValueChange={(newValue) => onChange(newValue)}
      disabled={disabled}
    >
      <SelectTrigger className={`${sizeClasses[size]} ${className}`}>
        <div className="flex items-center space-x-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={String(option.value)}
            disabled={option.disabled}
          >
            <div className="flex items-center space-x-2">
              {option.icon && (
                <span className="text-muted-foreground">{option.icon}</span>
              )}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
