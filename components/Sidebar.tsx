"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Calendar,
  User,
  Users,
  Files,
  MessageSquareText,
  BarChart3,
  Puzzle,
  Grid2X2,
} from "lucide-react";



const navigationSections = [
  {
    title: "",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutGrid },
    ]
  },
  {
    title: "ADMIN",
    items: [
      { name: "Calendar", href: "/calendar", icon: Calendar },
      { name: "HR", href: "/hr", icon: User },
      { name: "Clients", href: "/clients", icon: Users },
      { name: "Files", href: "/files", icon: Files },
    ]
  },
  {
    title: "MESSAGES",
    items: [
      { name: "Chat", href: "/chat", icon: MessageSquareText },
      { name: "Email", href: "/email", icon: BarChart3 },
    ]
  },
  {
    title: "WORKSPACE",
    items: [
      { name: "Apps", href: "/apps", icon: Puzzle },
      { name: "Team Online", href: "/team", icon: Grid2X2 },
    ]
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();


  return (
    <aside className="flex flex-col w-[240px] bg-[#FFFFFF] border  border-[#FBF3C4] h-screen shrink-0 select-none">
      {/* Logo Header Container */}
      <div className="h-[80px] px-6 flex items-center justify-center border-b ">
        <span 
          className="text-3xl font-bold tracking-tight text-[#1E293B] italic"
          style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
        >
          Logo
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-3 space-y-5 overflow-y-auto custom-scrollbar">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && (
              <h3 className="px-6 mb-2 text-[11px] font-bold text-[#64748B] tracking-wider">
                {section.title}
              </h3>
            )}
            <div>
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
                      "flex items-center gap-3.5 px-6 py-2.5 text-[14px] font-bold transition-all",
                      isActive
                        ? "bg-[#FEF6C3] text-[#1E293B]" 
                        : "text-[#334155] hover:bg-[#F3EFE0] hover:text-[#0F172A]"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-[18px] w-[18px] stroke-[2.2]",
                        isActive ? "text-[#1E293B]" : "text-[#475569]"
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>



    </aside>
  );
}