"use client";

import React from "react";
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

export function AddDepartmentModal({
  open,
  onOpenChange,
}: AddDepartmentModalProps) {
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
              placeholder="e.g. Aurelia Residences"
              className="bg-white border-slate-300/80 h-11 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400"
            />
          </div>

          {/* Department Head */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#0F172A]">
              Department head
            </Label>
            <select className="w-full h-11 px-3 bg-white border border-slate-300/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer">
              <option>Customer Support</option>
              <option>Operations</option>
              <option>Engineering</option>
            </select>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#0F172A]">
              Description
            </Label>
            <Textarea
              placeholder="Priya Nair"
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
            onClick={() => onOpenChange(false)}
            className="bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10 px-6"
          >
            Save Department
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}