"use client";

import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import { SidebarProvider, useSidebar } from "./_components/sidebar-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      <Sidebar />
      <div
        className={`h-full flex flex-col transition-all duration-300 ${
          isCollapsed ? "ml-0" : "lg:ml-70"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gradient-to-br from-background via-background to-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
