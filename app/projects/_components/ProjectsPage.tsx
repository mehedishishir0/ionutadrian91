/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, FolderKanban, CheckCircle2, CircleDashed } from "lucide-react";
import { AddProjectSheet } from "./AddProjectSheet";

export default function ProjectsPage() {
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const res = await fetch(
        `${apiBaseURL.replace(/\/$/, "")}/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  const filteredProjects = projects?.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-600";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  return (
    <div className="w-full space-y-6 bg-[#FAF9F5] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Projects</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage all company projects, clients, and statuses.
          </p>
        </div>

        <Button
          onClick={() => setIsAddSheetOpen(true)}
          className="bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-9 px-4 rounded-lg shadow-sm"
        >
          Create Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-0 border-l-4 border-l-blue-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                  <FolderKanban className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Total Projects</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {projects?.length || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 border-l-4 border-l-amber-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-full text-amber-600">
                  <CircleDashed className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Pending</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {projects?.filter((p: any) => p.status === "PENDING").length || 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 border-l-4 border-l-emerald-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Completed</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {projects?.filter((p: any) => p.status === "COMPLETED").length || 0}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="relative w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search projects or clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-slate-200 h-9 pl-9 text-xs rounded-lg"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B132B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">PROJECT NAME</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">START DATE</th>
                <th className="py-3 px-4">END DATE</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    <div className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-8 w-full max-w-3xl" />
                      <Skeleton className="h-8 w-full max-w-3xl" />
                    </div>
                  </td>
                </tr>
              ) : filteredProjects?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects?.map((project: any) => (
                  <tr key={project.id || project._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-bold text-[#0F172A]">
                          {project.name}
                        </span>
                        <p className="text-[10px] text-slate-500 truncate max-w-[200px] mt-0.5">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">
                      {project.clientName}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(project.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(project.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 font-bold text-[10px] rounded-full ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProjectSheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen} />
    </div>
  );
}
