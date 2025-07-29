"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Eye,
  EyeOff,
  Plus,
  Search,
  X,
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface Tag {
  id: string;
  label: string;
  color?: string;
}

interface PrimaryInputProps {
  // Common props
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "select"
    | "multi-select"
    | "tags"
    | "date"
    | "textarea"
    | "search";
  value: string | number | string[] | undefined;
  onChange: (value: string | number | string[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  helperText?: string;

  // Text/Password specific
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  // Number specific
  min?: number;
  max?: number;
  step?: number;

  // Select specific
  options?: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;

  // Tags specific
  tags?: Tag[];
  onTagAdd?: (tag: Tag) => void;
  onTagRemove?: (tagId: string) => void;
  tagInputPlaceholder?: string;
  maxTags?: number;

  // Date specific
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;

  // Textarea specific
  rows?: number;
  maxRows?: number;
  autoResize?: boolean;

  // Search specific
  onSearch?: (query: string) => void;
  searchDebounce?: number;
}

export default function PrimaryInput({
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = "",
  size = "md",
  icon,
  helperText,
  maxLength,
  minLength,
  pattern,
  min,
  max,
  step,
  options = [],
  multiple = false,
  searchable = false,
  clearable = false,
  tags = [],
  onTagAdd,
  onTagRemove,
  tagInputPlaceholder = "Add tag...",
  maxTags,
  dateFormat = "YYYY-MM-DD",
  minDate,
  maxDate,
  rows = 3,
  maxRows = 10,
  autoResize = false,
  onSearch,
  searchDebounce = 300,
}: PrimaryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search debounce
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (onSearch && searchQuery) {
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(searchQuery);
      }, searchDebounce);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, onSearch, searchDebounce]);

  const sizeClasses = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
  };

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  const handleSelect = (optionValue: string | number) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(String(optionValue))
        ? currentValues.filter((v) => v !== String(optionValue))
        : [...currentValues, String(optionValue)];
      onChange(newValues);
    } else {
      onChange(String(optionValue));
      setIsOpen(false);
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && onTagAdd && (!maxTags || tags.length < maxTags)) {
      const newTag: Tag = {
        id: Date.now().toString(),
        label: tagInput.trim(),
      };
      onTagAdd(newTag);
      setTagInput("");
    }
  };

  const handleTagRemove = (tagId: string) => {
    if (onTagRemove) {
      onTagRemove(tagId);
    }
  };

  const filteredOptions =
    searchable && searchQuery
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            rows={rows}
            className={`${sizeClasses[size]} ${className}`}
          />
        );

      case "select":
      case "multi-select":
        const selectedOptions = multiple
          ? options.filter(
              (option) =>
                Array.isArray(value) && value.includes(String(option.value))
            )
          : options.filter((option) => option.value === value);

        return (
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              className={`w-full justify-between ${sizeClasses[size]} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              } ${className}`}
            >
              <div className="flex items-center space-x-2">
                {icon && <span className="text-muted-foreground">{icon}</span>}
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.length > 0 ? (
                    multiple ? (
                      selectedOptions.map((option) => (
                        <span
                          key={option.value}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                        >
                          {option.label}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(option.value);
                            }}
                            className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <span className="truncate">
                        {selectedOptions[0]?.label}
                      </span>
                    )
                  ) : (
                    <span className="text-muted-foreground truncate">
                      {placeholder}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-[9999] overflow-hidden max-h-60 overflow-y-auto"
              >
                {searchable && (
                  <div className="p-2 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search options..."
                        className="pl-8 h-8 text-sm"
                      />
                    </div>
                  </div>
                )}

                {filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    disabled={option.disabled}
                    className={`w-full px-3 py-2 text-left transition-colors duration-150 flex items-center space-x-2 cursor-pointer ${
                      option.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : multiple &&
                          Array.isArray(value) &&
                          value.includes(String(option.value))
                        ? "bg-primary text-primary-foreground"
                        : !multiple && value === option.value
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    {option.icon && (
                      <span className="text-muted-foreground">
                        {option.icon}
                      </span>
                    )}
                    <span className="truncate">{option.label}</span>
                  </button>
                ))}

                {filteredOptions.length === 0 && (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No options found
                  </div>
                )}
              </motion.div>
            )}
          </div>
        );

      case "tags":
        return (
          <Card className={`p-2 ${className}`}>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary ${
                    tag.color ? `bg-${tag.color}-100 text-${tag.color}-800` : ""
                  }`}
                >
                  {tag.label}
                  <button
                    onClick={() => handleTagRemove(tag.id)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {(!maxTags || tags.length < maxTags) && (
              <div className="flex space-x-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder={tagInputPlaceholder}
                  onKeyPress={(e) => e.key === "Enter" && handleTagAdd()}
                  className="flex-1 h-8 text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleTagAdd}
                  disabled={!tagInput.trim()}
                  className="h-8 px-2"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </Card>
        );

      case "date":
        return (
          <div className="relative">
            <Input
              type="date"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              min={minDate?.toISOString().split("T")[0]}
              max={maxDate?.toISOString().split("T")[0]}
              className={`${sizeClasses[size]} ${className}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          </div>
        );

      case "search":
        return (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              value={value || ""}
              onChange={(e) => {
                onChange(e.target.value);
                setSearchQuery(e.target.value);
              }}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              maxLength={maxLength}
              className={`pl-10 ${sizeClasses[size]} ${className}`}
            />
          </div>
        );

      default:
        return (
          <div className="relative">
            <Input
              type={getInputType()}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              maxLength={maxLength}
              minLength={minLength}
              pattern={pattern}
              min={min}
              max={max}
              step={step}
              className={`${sizeClasses[size]} ${className}`}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
            {icon && type !== "password" && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
                {icon}
              </span>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {renderInput()}

      {(error || helperText) && (
        <div className="text-sm">
          {error && <p className="text-red-500">{error}</p>}
          {helperText && !error && (
            <p className="text-muted-foreground">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
}
