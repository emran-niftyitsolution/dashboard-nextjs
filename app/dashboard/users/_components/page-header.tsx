"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-1">
          Manage your application users and their permissions
        </p>
      </div>
      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Plus className="w-4 h-4 mr-2" />
        Add User
      </Button>
    </motion.div>
  );
}
