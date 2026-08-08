"use client";

import { Moon, RotateCw, Bell } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // In a real app, this would update every second, but for the design, we can show a static or dynamic time.
    // Let's just use a static mock as requested in the design, or a live one.
    // I will put a live one for the realistic feel, but matching format.
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-[90px] bg-white border-b border-gray-100 px-8 flex items-center justify-between shrink-0">
      {/* Left side */}
      <div className="flex flex-col">
        <h1 className="text-[22px] font-bold text-gray-900 leading-tight">
          Good morning, Ionut
        </h1>
        <p className="text-[14px] text-gray-500 mt-0.5">
          A steady start. 6 items are ready for you, and every crew is out and checked in.
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* Time and Date */}
        <div className="flex flex-col items-end justify-center mr-2">
          <span className="text-[15px] font-bold text-gray-900 leading-none">
            {time || "12:16:55"}
          </span>
          <span className="text-[13px] text-gray-500 mt-1 leading-none">
            {date || "Wed 20 July"}
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <Moon className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <RotateCw className="h-4 w-4" />
          </button>
          <button className="h-9 w-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
            <Bell className="h-4 w-4" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-2 pl-6 border-l border-gray-100 cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-gray-900 leading-tight">
              Demo Name
            </span>
            <span className="text-[13px] text-gray-500">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}