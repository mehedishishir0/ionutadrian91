/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Search,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";

export default function LeaveManagement() {
  const queryClient = useQueryClient();
  const [employeeName, setEmployeeName] = useState("");
  
  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch Dashboard Stats
  const { data: stats } = useQuery({
    queryKey: ["leave-dashboard"],
    queryFn: async () => {
      const res = await authenticatedFetch(`${apiBaseURL.replace(/\/$/, "")}/leave/dashboard`);
      const resData = await res.json();
      return resData?.data || { totalRequests: 0, pendingRequests: 0, approvedRequests: 0 };
    },
  });

  // Fetch All Requests
  const { data: requests, isLoading: isLoadingRequests } = useQuery({
    queryKey: ["leave-requests", employeeName],
    queryFn: async () => {
      let url = `${apiBaseURL.replace(/\/$/, "")}/leave`;
      if (employeeName) {
        url += `?employeeName=${encodeURIComponent(employeeName)}`;
      }
      const res = await authenticatedFetch(url);
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await authenticatedFetch(`${apiBaseURL.replace(/\/$/, "")}/leave/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leave-requests"] });
      queryClient.invalidateQueries({ queryKey: ["leave-dashboard"] });
    },
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-600";
      case "REJECTED":
        return "bg-red-50 text-red-600";
      case "PENDING":
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  return (
    <div className="w-full p-6 space-y-6 bg-[#FAF9F5] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Leave Management</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Review and manage employee leave requests.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Requests */}
        <Card className="bg-white border-0 border-l-4 border-l-blue-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Total Requests</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {stats?.totalRequests || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">All Time</span>
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card className="bg-white border-0 border-l-4 border-l-amber-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-full text-amber-600">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Pending</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {stats?.pendingRequests || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">Requires Action</span>
            </div>
          </CardContent>
        </Card>

        {/* Approved Requests */}
        <Card className="bg-white border-0 border-l-4 border-l-emerald-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">Approved</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {stats?.approvedRequests || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">Total Approved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <div className="relative w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search by employee name..."
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="bg-white border-slate-200 h-9 pl-9 text-xs rounded-lg"
          />
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B132B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">DATES</th>
                <th className="py-3 px-4">REASON</th>
                <th className="py-3 px-4">DOC</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {isLoadingRequests ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-500">
                    <div className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-8 w-full max-w-2xl" />
                      <Skeleton className="h-8 w-full max-w-2xl" />
                      <Skeleton className="h-8 w-full max-w-2xl" />
                    </div>
                  </td>
                </tr>
              ) : requests?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-slate-500">
                    No leave requests found.
                  </td>
                </tr>
              ) : (
                requests?.map((req: any) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Employee Name & Avatar */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={req.teamMemberId?.photoUrl} />
                          <AvatarFallback>
                            {req.teamMemberId?.fullName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0F172A]">
                            {req.teamMemberId?.fullName}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {req.teamMemberId?.departmentId?.name || "No Dept"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-2.5 px-4 text-slate-600">
                      <div>{new Date(req.startDate).toLocaleDateString()}</div>
                      <div className="text-slate-400 text-[10px]">to {new Date(req.endDate).toLocaleDateString()}</div>
                    </td>

                    {/* Reason */}
                    <td className="py-2.5 px-4 text-slate-500 max-w-[200px] truncate">
                      {req.reason}
                    </td>

                    {/* Document */}
                    <td className="py-2.5 px-4 text-slate-500">
                      {req.documentUrl ? (
                        <a 
                          href={req.documentUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          View
                        </a>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-4">
                      <span className={`inline-block px-3 py-1 font-bold text-[10px] rounded-full ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>

                    {/* Actions Buttons */}
                    <td className="py-2.5 px-4">
                      {req.status === "PENDING" ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleUpdateStatus(req._id, "APPROVED")}
                            disabled={updateStatusMutation.isPending}
                            className="px-2.5 py-1 bg-[#10B981] hover:bg-emerald-700 text-white font-bold text-[10px] rounded-md transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req._id, "REJECTED")}
                            disabled={updateStatusMutation.isPending}
                            className="px-2.5 py-1 bg-[#EF4444] hover:bg-red-700 text-white font-bold text-[10px] rounded-md transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center text-[10px] text-slate-400 font-bold">
                          PROCESSED
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
