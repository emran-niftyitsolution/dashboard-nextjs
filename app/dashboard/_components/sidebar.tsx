"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart3, LayoutDashboard, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "./sidebar-context";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");
  const { isCollapsed } = useSidebar();
  const router = useRouter();

  const handleNavigation = (label: string, href: string) => {
    setActiveItem(label);
    router.push(href);
  };

  return (
    <>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: isCollapsed ? -280 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed lg:absolute lg:left-0 z-40 w-70 h-screen bg-card border-r border-border shadow-lg"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-3 p-6 border-b border-border"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-lg">
                D
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Button
                  variant={activeItem === item.label ? "default" : "ghost"}
                  className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                    activeItem === item.label
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => handleNavigation(item.label, item.href)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Developer Credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 border-t border-border"
          >
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Developed by{" "}
                <span className="font-medium text-primary">
                  Emran Ibn Shayed
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
        />
      )}
    </>
  );
}
