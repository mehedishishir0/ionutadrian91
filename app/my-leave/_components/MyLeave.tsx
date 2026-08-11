/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FileText, Plus } from "lucide-react";

export default function MyLeave() {
  const queryClient = useQueryClient();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Form State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  // Fetch History
  const { data: history, isLoading } = useQuery({
    queryKey: ["my-leave-history"],
    queryFn: async () => {
      const res = await fetch(`${apiBaseURL.replace(/\/$/, "")}/leave/my-history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  const applyLeaveMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("reason", reason);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch(`${apiBaseURL.replace(/\/$/, "")}/leave/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to apply for leave");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-leave-history"] });
      setIsApplyModalOpen(false);
      setStartDate("");
      setEndDate("");
      setReason("");
      setFile(null);
    },
    onError: (error) => {
      alert(error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      alert("Please fill all required fields.");
      return;
    }
    applyLeaveMutation.mutate();
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
          <h1 className="text-xl font-bold text-[#0F172A]">My Leaves</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Submit leave requests and view your history.
          </p>
        </div>
        <Button
          onClick={() => setIsApplyModalOpen(true)}
          className="bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-9 px-4 rounded-lg shadow-sm"
        >
          <Plus className="mr-2 h-4 w-4" /> Apply for Leave
        </Button>
      </div>

      {/* Leave History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B132B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">REQUEST ID</th>
                <th className="py-3 px-4">DATES</th>
                <th className="py-3 px-4">REASON</th>
                <th className="py-3 px-4">SUPPORTING DOC</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500">
                    <div className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-8 w-full max-w-2xl" />
                      <Skeleton className="h-8 w-full max-w-2xl" />
                    </div>
                  </td>
                </tr>
              ) : history?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-slate-500">
                    You have no leave history.
                  </td>
                </tr>
              ) : (
                history?.map((req: any) => (
                  <tr key={req._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-slate-700">
                      {req.requestId}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {new Date(req.startDate).toLocaleDateString()} to {new Date(req.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500 max-w-[200px] truncate">
                      {req.reason}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {req.documentUrl ? (
                        <a 
                          href={req.documentUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FileText className="h-4 w-4" />
                          View Document
                        </a>
                      ) : (
                        <span className="text-slate-300">None</span>
                      )}
                    </td>
                    <td className="py-2.5 px-4">
                      <span className={`inline-block px-3 py-1 font-bold text-[10px] rounded-full ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Input
                id="reason"
                placeholder="Why do you need a leave?"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">Supporting Document (Optional)</Label>
              <Input
                id="document"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsApplyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={applyLeaveMutation.isPending}>
                {applyLeaveMutation.isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
