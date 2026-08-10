import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  {
    value: "10",
    title: "ENGINEERS OUT TODAY",
    subtitle: "Across all three teams",
    topBorderColor: "border-t-[#48BB78]", // Soft Green
    textColor: "text-[#48BB78]",
  },
  {
    value: "15",
    title: "HOME SAFE",
    subtitle: "34 of 38 engineers in",
    topBorderColor: "border-t-[#0088CC]", // Deep Sky Blue
    textColor: "text-[#0088CC]",
  },
  {
    value: "321",
    title: "STILL TRAVELLING",
    subtitle: "On site or heading home",
    topBorderColor: "border-t-[#ECC94B]", // Warm Yellow / Amber
    textColor: "text-[#ECC94B]",
  },
  {
    value: "10",
    title: "ACTIVE ALERTS",
    subtitle: "Overdue Or Missed Static",
    topBorderColor: "border-t-[#3182CE]", // Bright Blue
    textColor: "text-[#3182CE]",
  },
];

export default function StatCardsGroup() {
  return (
    <div className="flex flex-row items-center justify-between  gap-5 w-full">
      {statsData.map((stat, idx) => (
        <Card
          key={idx}
          className={`flex-1  rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md border-t-[5px] ${stat.topBorderColor}`}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            {/* Number */}
            <span
              className={`text-4xl font-extrabold leading-none ${stat.textColor}`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {stat.value}
            </span>

            {/* Title */}
            <h4
              className="text-xs font-bold uppercase tracking-wide text-[#1A202C] mt-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {stat.title}
            </h4>

            {/* Subtitle */}
            <p
              className="text-xs font-normal text-[#718096] mt-1"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {stat.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}