"use client";

import React, { useState } from "react";
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
import { Camera, Clock } from "lucide-react";

interface AddTeamMemberSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTeamMemberSheet({
  open,
  onOpenChange,
}: AddTeamMemberSheetProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>(["Fr"]);

  const days = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] bg-white p-6 overflow-y-auto custom-scrollbar border-l border-slate-200">
        
        {/* Title */}
        <SheetHeader className="p-0 text-left pb-4 border-b border-slate-100">
          <SheetTitle className="text-lg font-bold text-[#0F172A]">
            Add Team Member
          </SheetTitle>
          <div className="pt-2">
            <span className="text-xs font-bold text-[#0F172A] border-b-2 border-[#0F172A] pb-1 inline-block">
              Quick Add
            </span>
          </div>
        </SheetHeader>

        {/* Form Body */}
        <div className="space-y-4 pt-4 text-left">
          
          {/* Upload Photo Dropzone */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex items-center justify-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full border border-slate-300 flex items-center justify-center bg-white text-slate-600">
              <Camera className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Upload Client Photo
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                PNG, JPG supported · Max 5MB
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="e.g. Jonathan Smith"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Job Title */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="e.g. Fiber Support Lead"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Department & Team */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Department</Label>
              <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none">
                <option>Operations</option>
                <option>HR</option>
                <option>Engineering</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Team</Label>
              <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none">
                <option>Fibre Installation</option>
                <option>Support Agent</option>
              </select>
            </div>
          </div>

          {/* Worker Type & Portal Permission */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Worker Type</Label>
              <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none">
                <option>Field Engineer</option>
                <option>Office Staff</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Portal Permission</Label>
              <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none">
                <option>Engineer</option>
                <option>Admin</option>
                <option>Supervisor</option>
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Start Date</Label>
            <Input
              type="text"
              placeholder="mm/dd/yyyy"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Start Time</Label>
              <div className="relative">
                <Input
                  defaultValue="09:00 AM"
                  className="bg-white border-slate-200 h-10 rounded-xl text-xs pr-8"
                />
                <Clock className="h-4 w-4 absolute right-2.5 top-3 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">End Time</Label>
              <div className="relative">
                <Input
                  defaultValue="06:00 PM"
                  className="bg-white border-slate-200 h-10 rounded-xl text-xs pr-8"
                />
                <Clock className="h-4 w-4 absolute right-2.5 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Shift Name */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Shift Name</Label>
            <Input
              placeholder="Enter the shift name"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Weekend Day Picker */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Weekend Day</Label>
            <div className="flex items-center justify-between gap-1">
              {days.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex-1 h-9 rounded-xl text-xs font-bold transition-colors border ${
                      isSelected
                        ? "bg-[#38BDF8] text-white border-[#38BDF8]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Work Email */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Work Email</Label>
            <Input
              placeholder="name@fieldops.com"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Phone Number</Label>
            <Input
              placeholder="+44 (0) 7000 000 000"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Home Address */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Home Address</Label>
            <Textarea
              placeholder="Optional: Full home address"
              className="bg-white border-slate-200 rounded-xl text-xs min-h-[60px]"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Emergency Contact</Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Name"
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
              <Input
                placeholder="Phone Number"
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-slate-300 rounded-xl font-bold text-xs h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10"
          >
            Add Team Member
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}