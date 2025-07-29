"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: ReactNode;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  icon?: ReactNode;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  size = "md",
  variant = "outline",
  icon,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Click outside handler to close dropdown
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const selectedOption = options.find((option) => option.value === value);

  const sizeClasses = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
  };

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`relative ${className}`} ref={dropdownRef}>
        <Button
          variant={variant}
          size="sm"
          disabled={disabled}
          onClick={() => {
            console.log("Button clicked, current isOpen:", isOpen);
            !disabled && setIsOpen(!isOpen);
          }}
          className={`w-full justify-between ${sizeClasses[size]} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            {icon && <span className="text-muted-foreground">{icon}</span>}
            {selectedOption ? (
              <div className="flex items-center space-x-2">
                {selectedOption.icon && (
                  <span className="text-muted-foreground">
                    {selectedOption.icon}
                  </span>
                )}
                <span className="truncate">{selectedOption.label}</span>
              </div>
            ) : (
              <span className="text-muted-foreground truncate">
                {placeholder}
              </span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed bg-card border border-border rounded-lg shadow-xl z-[99999] overflow-hidden max-h-60 overflow-y-auto"
            style={{
              top: dropdownPosition.top + 4,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              minWidth: dropdownPosition.width,
              maxWidth: dropdownPosition.width,
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2 text-left transition-colors duration-150 flex items-center space-x-2 cursor-pointer whitespace-nowrap ${
                  value === option.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent text-foreground"
                }`}
              >
                {option.icon && (
                  <span className="text-muted-foreground">{option.icon}</span>
                )}
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
