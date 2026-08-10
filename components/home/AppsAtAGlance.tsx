import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  MapPin, 
  Heart, 
  AlertTriangle, 
  ChevronRight 
} from "lucide-react";

const appsData = [
  {
    id: "risk",
    title: "Risk Assessments",
    category: "Compliance",
    icon: ShieldCheck,
    iconBg: "bg-blue-100/70 text-blue-600",
    accentColor: "border-l-4 border-l-blue-500",
    statusDot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]",
    metricNumber: "2",
    metricText: "ready to sign",
    tagText: "All signed",
    tagStyle: "bg-emerald-50 text-emerald-600",
    actionText: "View all",
  },
  {
    id: "whereabouts",
    title: "Whereabouts",
    category: "Work plans",
    icon: MapPin,
    iconBg: "bg-cyan-100/70 text-cyan-600",
    accentColor: "border-l-4 border-l-cyan-400",
    statusDot: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]",
    metricNumber: "8",
    metricText: "plans in for today",
    tagText: "2 for your OK",
    tagStyle: "bg-cyan-50 text-cyan-600",
    actionText: "Review plans",
  },
  {
    id: "duty",
    title: "Duty of Care",
    category: "Lone worker",
    icon: Heart,
    iconBg: "bg-rose-100/70 text-rose-500",
    accentColor: "border-l-4 border-l-rose-400",
    statusDot: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]",
    metricNumber: "34/38",
    metricText: "home safe",
    tagText: "4 need attention",
    tagStyle: "bg-emerald-50 text-emerald-600",
    actionText: "4 alerts",
  },
  {
    id: "incident",
    title: "Incident Reports",
    category: "Health & safety",
    icon: AlertTriangle,
    iconBg: "bg-amber-100/70 text-amber-500",
    accentColor: "border-l-4 border-l-rose-500",
    statusDot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    metricNumber: "2",
    metricText: "open / investigating",
    tagText: "1 Riddor",
    tagStyle: "bg-blue-50 text-blue-600",
    actionText: "Review reports",
  },
];

export default function AppsAtAGlance() {
  return (
    <div className="w-full space-y-4">
      {/* Header Container */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <h2 className="text-lg font-bold text-[#0F172A]">Your apps at a glance</h2>
          <span className="text-sm font-medium text-slate-400">- 7 apps - all running</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          Manage <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {appsData.map((app) => {
          const Icon = app.icon;
          return (
            <Card
              key={app.id}
              className={`relative overflow-hidden bg-white border border-slate-100 shadow-sm rounded-2xl ${app.accentColor}`}
            >
              <CardContent className="p-5 flex flex-col justify-between gap-4">
                
                {/* Top Section: Icon, Title & Status Dot */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full ${app.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0F172A] leading-tight">
                        {app.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">
                        {app.category}
                      </p>
                    </div>
                  </div>

                  {/* Right Glowing Dot */}
                  <div className="relative flex items-center justify-center mt-1">
                    <span className={`h-3 w-3 rounded-full ${app.statusDot}`} />
                  </div>
                </div>

                {/* Middle Banner: Metric Box */}
                <div className="bg-[#F8FAFC] rounded-xl px-4 py-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
                    {app.metricNumber}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    {app.metricText}
                  </span>
                </div>

                {/* Bottom Footer: Badge Tag & Action Link */}
                <div className="flex items-center justify-between pt-1">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${app.tagStyle}`}>
                    {app.tagText}
                  </span>
                  <button className="text-xs font-bold text-[#0F172A] hover:underline transition-all">
                    {app.actionText}
                  </button>
                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}