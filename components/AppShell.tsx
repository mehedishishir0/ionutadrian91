"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar } from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const isAuthPage = usePathname().startsWith("/auth/");

  if (isAuthPage) return <main>{children}</main>;

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 shrink-0 flex-col bg-[#F8FAFC]">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
