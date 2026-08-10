import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LogIn, 
  FileText, 
  FolderSync, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

interface ActivityItem {
  id: string;
  text: string;
  time: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    text: "James Whitfield checked in at Manchester North Hub",
    time: "2 min ago",
    icon: LogIn,
    iconBg: "bg-[#DCFCE7]", // Light emerald green
    iconColor: "text-[#10B981]",
  },
  {
    id: "2",
    text: "New assignment created for Priya Chandran",
    time: "18 min ago",
    icon: FileText,
    iconBg: "bg-[#DBEAFE]", // Light blue
    iconColor: "text-[#3B82F6]",
  },
  {
    id: "3",
    text: "Fibre Expansion Ph.2 project updated to 41% complete",
    time: "34 min ago",
    icon: FolderSync,
    iconBg: "bg-[#CCFBF1]", // Light teal
    iconColor: "text-[#14B8A6]",
  },
  {
    id: "4",
    text: "VAN-025 assigned to Priya Chandran",
    time: "1 hr ago",
    icon: Truck,
    iconBg: "bg-[#E0F2FE]", // Light sky blue
    iconColor: "text-[#0EA5E9]",
  },
  {
    id: "5",
    text: "Risk assessment submitted for Substation Upgrade",
    time: "2 hrs ago",
    icon: ShieldCheck,
    iconBg: "bg-[#E0E7FF]", // Light indigo
    iconColor: "text-[#6366F1]",
  },
  {
    id: "6",
    text: "Sarah Nkemelu's leave request approved",
    time: "3 hrs ago",
    icon: CheckCircle2,
    iconBg: "bg-[#DCFCE7]", // Light emerald green
    iconColor: "text-[#10B981]",
  },
];

export default function RecentActivity() {
  return (
    <Card className="w-full bg-white border border-[#FEF3C7]/60 shadow-xs rounded-2xl p-6">
      <CardHeader className="p-0 pb-5">
        <CardTitle className="text-base font-bold text-[#0F172A]">
          Recent Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex flex-col gap-4">
          {activities.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-0.5"
              >
                {/* Left Side: Circular Icon + Description Text */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}
                  >
                    <IconComponent className={`h-4 w-4 ${item.iconColor}`} />
                  </div>
                  <p className="text-sm font-medium text-[#1E293B] truncate">
                    {item.text}
                  </p>
                </div>

                {/* Right Side: Timestamp with Clock Icon */}
                <div className="flex items-center gap-1.5 shrink-0 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-normal text-slate-500">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}