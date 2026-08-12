/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authenticatedFetch } from "@/lib/api";

interface AddProjectSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProjectSheet({ open, onOpenChange }: AddProjectSheetProps) {
  const queryClient = useQueryClient();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("PENDING");

  const resetForm = () => {
    setName("");
    setDescription("");
    setClientName("");
    setStartDate("");
    setEndDate("");
    setStatus("PENDING");
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-project"],
    mutationFn: async (payload: any) => {
      const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(`${apiBaseURL.replace(/\/$/, "")}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || (data.statusCode && data.statusCode >= 400)) {
        throw new Error(data.message || "Failed to create project");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Project created successfully");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project");
    },
  });

  const handleSubmit = () => {
    if (!name || !description || !clientName || !startDate || !endDate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Ensure dates are valid
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    mutate({
      name,
      description,
      clientName,
      startDate: start,
      endDate: end,
      status
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] bg-white p-6 overflow-y-auto custom-scrollbar border-l border-slate-200">
        <SheetHeader className="p-0 text-left pb-4 border-b border-slate-100">
          <SheetTitle className="text-lg font-bold text-[#0F172A]">
            Create New Project
          </SheetTitle>
          <div className="pt-2">
            <span className="text-xs font-bold text-[#0F172A] border-b-2 border-[#0F172A] pb-1 inline-block">
              Project Details
            </span>
          </div>
        </SheetHeader>

        <div className="space-y-4 pt-4 text-left">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Fiber Network Expansion"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Client Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. City Council"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Status <span className="text-red-500">*</span>
            </Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about the project..."
              className="bg-white border-slate-200 rounded-xl text-xs min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-slate-300 rounded-xl font-bold text-xs h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10"
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
