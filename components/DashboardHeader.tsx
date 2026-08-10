"use client";

import { usePathname } from "next/navigation";
import {  Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const pathname = usePathname();

  const isCalendar = pathname === "/calendar";

  return (
    <header className="flex h-[80px] w-full items-center justify-between border-b border-[#FBF3C4]  bg-[#FFFFFF] px-6 shrink-0 select-none">
      
      {/* Left Section: Logo Container & Greeting Header */}
      <div className="flex items-center gap-8 h-full">
       
        {/* Dynamic Section Title / Greeting */}
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-bold text-[#1E293B] leading-tight">
            {isCalendar ? "Calendar" : "Good morning, Ionut"}
          </h1>
          {!isCalendar && (
            <p className="text-xs font-medium text-[#64748B] mt-0.5">
              A steady start. 6 items are ready for you, and every crew is out and checked in.
            </p>
          )}
        </div>
      </div>

      {/* Right Section: Time/Date, Utility Buttons & User Profile */}
      <div className="flex items-center gap-5">
        
     
        {/* Action Controls */}
        <div className="flex items-center gap-2"> 
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-[#EAE8E1]/60 text-[#475569] hover:bg-[#E2DFD6] hover:text-[#0F172A] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
          </Button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <Avatar className="h-9 w-9 border border-[#E0DCD3]">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Demo Name"
            />
            <AvatarFallback className="bg-[#1E293B] text-white font-semibold text-xs">
              DN
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-[#1E293B] leading-tight">
              Demo Name
            </span>
            <span className="text-[11px] font-medium text-[#64748B]">
              Admin
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}