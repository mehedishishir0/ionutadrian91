"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string | null;
  employeeName: string | null;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  employeeId,
  employeeName,
}: DeleteConfirmationModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = process.env.NEXT_PUBLIC_API_TOKEN;

      const res = await fetch(`${apiBaseURL.replace(/\/$/, "")}/hr/team-members/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || (data.statusCode && data.statusCode >= 400)) {
        throw new Error(data.message || "Failed to delete team member");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Team member deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete team member");
    },
  });

  const handleDelete = () => {
    if (employeeId) {
      mutate(employeeId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-2xl border-0 shadow-xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">
            Delete Team Member
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium mt-2">
            Are you sure you want to delete <span className="font-bold text-[#0F172A]">{employeeName}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-white border-slate-300 text-slate-800 font-bold text-xs h-10 rounded-xl hover:bg-slate-50"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 bg-[#EF4444] hover:bg-red-700 text-white font-bold text-xs h-10 rounded-xl"
          >
            {isPending ? "Deleting..." : "Delete Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
