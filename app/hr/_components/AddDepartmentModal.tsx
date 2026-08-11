"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CreateDepartmentPayload {
  name: string;
  description: string;
}

export function AddDepartmentModal({
  open,
  onOpenChange,
}: AddDepartmentModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-department"],
    mutationFn: async ({ name, description }: CreateDepartmentPayload) => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = process.env.NEXT_PUBLIC_API_TOKEN;

      if (!token) {
        throw new Error("Missing NEXT_PUBLIC_API_TOKEN environment variable");
      }

      const res = await fetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/departments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok || (data.statusCode && data.statusCode >= 400)) {
        throw new Error(data.message || "Failed to create department");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Department created successfully");
      setName("");
      setDescription("");
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create department");
    },
  });

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      toast.error("Please enter department name and description");
      return;
    }

    mutate({
      name: name.trim(),
      description: description.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-[#FAF9F6] p-6 rounded-2xl border-none shadow-xl">
        {/* Header */}
        <DialogHeader className="p-0 text-left">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">
            Add Department
          </DialogTitle>
        </DialogHeader>

        {/* Form Body */}
        <div className="space-y-4 pt-2 text-left">
          {/* Department Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#0F172A]">
              Department name
            </Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Human Resources"
              className="bg-white border-slate-300/80 h-11 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400"
            />
          </div>

   
          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#0F172A]">
              Description
            </Label>
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Responsible for recruitment and employee wellbeing."
              className="bg-white border-slate-300/80 rounded-xl text-xs min-h-[80px] text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-300 rounded-xl font-bold text-xs h-10 px-6 bg-white hover:bg-slate-50 text-[#0F172A]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10 px-6"
          >
            {isPending ? "Saving..." : "Save Department"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}