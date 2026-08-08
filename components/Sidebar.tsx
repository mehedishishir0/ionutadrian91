"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  User,
  Users,
  FileText,
  MessageSquare,
  Mail,
  Box,
  UsersRound,
  LogOut,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navigationSections = [
  {
    title: "",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard }, // The route seems to be / since it's the root of dashboard/app
    ]
  },
  {
    title: "ADMIN",
    items: [
      { name: "Calendar", href: "/calendar", icon: Calendar },
      { name: "HR", href: "/hr", icon: User },
      { name: "Clients", href: "/clients", icon: Users },
      { name: "Files", href: "/files", icon: FileText },
    ]
  },
  {
    title: "MESSAGES",
    items: [
      { name: "Chat", href: "/chat", icon: MessageSquare },
      { name: "Email", href: "/email", icon: Mail },
    ]
  },
  {
    title: "WORKSPACE",
    items: [
      { name: "Apps", href: "/apps", icon: Box },
      { name: "Team Online", href: "/team", icon: UsersRound },
    ]
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="flex flex-col w-[260px] bg-white border-r border-gray-100 h-screen shrink-0">
      {/* Logo / Title */}
      <div className="px-6 py-8 flex items-center justify-center">
        <div className="text-3xl font-bold italic tracking-tighter" style={{ fontFamily: "cursive" }}>
          Logo
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="px-3">
            {section.title && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/" || pathname === "/dashboard"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] font-medium transition-all",
                      isActive
                        ? "bg-[#FFF4C2] text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        isActive ? "text-gray-900" : "text-gray-400"
                      )}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 w-full px-4 py-2 text-[15px] font-medium rounded-lg text-red-500 hover:bg-red-50 transition"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500">
            Are you sure you want to log out? You will need to log in again to
            access your dashboard.
          </p>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}