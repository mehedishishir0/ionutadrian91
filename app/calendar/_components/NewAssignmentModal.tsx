"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  selected: boolean;
}

const initialMembers: Member[] = [
  { id: "1", name: "Floyd Miles", role: "Operations Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd", selected: true },
  { id: "2", name: "Darrell Steward", role: "Site Supervisor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darrell", selected: false },
  { id: "3", name: "Cameron Williamson", role: "Operations Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron", selected: true },
  { id: "4", name: "Wade Warren", role: "Site Supervisor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wade", selected: false },
  { id: "5", name: "Dianne Russell", role: "Site Supervisor", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne", selected: false },
];

interface NewAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAssignmentModal({ open, onOpenChange }: NewAssignmentModalProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const toggleMember = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  const selectedMembers = members.filter((m) => m.selected);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] max-h-[90vh] overflow-y-auto bg-[#FAF9F5] p-6 rounded-2xl border-none">
        
        {/* Header */}
        <DialogHeader className="p-0 text-left">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">
            New Assignment
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 font-medium">
            Create and assign a task to a team member.
          </DialogDescription>
        </DialogHeader>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/60 rounded-lg overflow-x-auto">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeCategory === "All"
                ? "bg-[#0F172A] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setActiveCategory("Team")}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md"
          >
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Team
          </button>

          <button
            onClick={() => setActiveCategory("Customer")}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md"
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Customer
          </button>

          <button
            onClick={() => setActiveCategory("Site")}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md"
          >
            <span className="h-2 w-2 rounded-full bg-amber-600" />
            Site
          </button>

          <button
            onClick={() => setActiveCategory("Contractor")}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md"
          >
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Contractor
          </button>

          <button
            onClick={() => setActiveCategory("1:1")}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-md"
          >
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            1:1
          </button>
        </div>

        {/* Form Controls */}
        <div className="space-y-4 text-left mt-2">
          
          {/* Title */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Title</Label>
            <Input
              placeholder="e.g. Aurelia Residences"
              className="bg-white border-slate-200 h-10 rounded-xl text-sm"
            />
          </div>

          {/* Project Dropdown */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Project</Label>
            <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-hidden">
              <option>Client Onboarding</option>
              <option>Network Expansion</option>
              <option>Site Inspection</option>
            </select>
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Date</Label>
              <div className="relative">
                <Input
                  defaultValue="23-06-2026"
                  className="bg-white border-slate-200 h-10 rounded-xl text-sm pr-9"
                />
                <CalendarIcon className="h-4 w-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Time</Label>
              <div className="relative">
                <Input
                  defaultValue="02:04 AM"
                  className="bg-white border-slate-200 h-10 rounded-xl text-sm pr-9"
                />
                <Clock className="h-4 w-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Location</Label>
            <div className="relative">
              <Input
                placeholder="e.g. Site 42, Downtown Hub"
                className="bg-white border-slate-200 h-10 rounded-xl text-sm pr-9"
              />
              <MapPin className="h-4 w-4 absolute right-3 top-3 text-slate-400" />
            </div>
          </div>

          {/* Add Members Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-slate-700">Add Members</Label>
              <span className="text-[11px] font-bold text-slate-700">
                {selectedMembers.length} selected
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium -mt-1">
              Search and select members who can access this folder
            </p>

            {/* Member Search Bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search members by name or email..."
                  className="bg-white border-slate-200 h-10 pl-9 rounded-xl text-xs"
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 border-slate-200 bg-white rounded-xl">
                <SlidersHorizontal className="h-4 w-4 text-slate-600" />
              </Button>
            </div>

            {/* Selected Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedMembers.map((m) => (
                <span
                  key={m.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF6C3] text-[#0F172A] text-xs font-bold rounded-full"
                >
                  {m.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:opacity-75"
                    onClick={() => toggleMember(m.id)}
                  />
                </span>
              ))}
            </div>

            {/* Member Selection List */}
            <div className="bg-white border border-slate-200/80 rounded-xl divide-y divide-slate-100 overflow-hidden">
              {members.map((m) => (
                <div
                  key={m.id}
                  onClick={() => toggleMember(m.id)}
                  className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                    m.selected ? "bg-sky-50/50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={m.avatar} alt={m.name} />
                      <AvatarFallback>{m.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h5 className="text-xs font-bold text-[#0F172A] leading-tight">
                        {m.name}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-400">
                        {m.role}
                      </p>
                    </div>
                  </div>

                  {m.selected ? (
                    <CheckCircle2 className="h-5 w-5 text-sky-500 fill-sky-500/10" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Notes</Label>
            <Textarea
              placeholder="Add any additional details or instructions..."
              className="bg-white border-slate-200 rounded-xl text-xs min-h-[70px]"
            />
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-300 rounded-xl font-bold text-xs px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-bold text-xs px-6"
          >
            Create Assignment
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}