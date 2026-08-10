import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, User } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  status: "Active" | "On Hold" | "Scheduled";
  location: string;
  assigned: string;
  supervisor?: string;
  dueDate: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "1",
    title: "Network Expansion",
    subtitle: "Fiber Installation",
    status: "Active",
    location: "Manchester",
    assigned: "8 Engineers Assigned",
    dueDate: "Due 02 Aug 2026",
  },
  {
    id: "2",
    title: "Server Upgrade",
    subtitle: "Hardware Replacement",
    status: "On Hold",
    location: "Bristol",
    assigned: "5 Technicians Assigned",
    dueDate: "Due 15 Sep 2026",
  },
  {
    id: "3",
    title: "Cloud Migration",
    subtitle: "Data Transfer",
    status: "Active",
    location: "London",
    assigned: "12 Engineers Assigned",
    dueDate: "Due 30 Nov 2026",
  },
  {
    id: "4",
    title: "Security Audit",
    subtitle: "Vulnerability Assessment",
    status: "Scheduled",
    location: "Edinburgh",
    assigned: "3 Security Analysts Assigned",
    supervisor: "Supervisor: Sarah Johnson",
    dueDate: "Due 10 Oct 2026",
  },
];

const getStatusBadgeStyle = (status: ProjectItem["status"]) => {
  switch (status) {
    case "Active":
      return "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]"; // Light green badge
    case "On Hold":
      return "bg-[#FEF3C7] text-[#B45309] hover:bg-[#FEF3C7]"; // Light amber badge
    case "Scheduled":
      return "bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7]"; // Light green badge
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function EnterpriseProjectOverview() {
  return (
    <section className="w-full space-y-4">
      {/* Section Title */}
      <h2 className="text-lg font-bold text-[#0F172A]">
        Enterprise Project Overview
      </h2>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectsData.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col justify-between bg-white border border-[#FEF3C7]/60 shadow-xs rounded-2xl p-5 hover:shadow-sm transition-shadow"
          >
            <CardContent className="p-0 flex flex-col h-full justify-between gap-4">
              
              {/* Header: Title, Subtitle & Status Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {project.subtitle}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={`px-3 py-0.5 rounded-full text-xs font-semibold shrink-0 border-0 ${getStatusBadgeStyle(
                    project.status
                  )}`}
                >
                  {project.status}
                </Badge>
              </div>

              {/* Body Info Details */}
              <div className="space-y-2 text-xs font-medium text-[#334155]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{project.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{project.assigned}</span>
                </div>

                {project.supervisor && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{project.supervisor}</span>
                  </div>
                )}
              </div>

              {/* Footer: Due Date with top subtle divider line */}
              <div className="pt-3 border-t border-[#FEF3C7]/80 flex items-center gap-2 text-xs font-medium text-slate-500">
                <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                <span>{project.dueDate}</span>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}