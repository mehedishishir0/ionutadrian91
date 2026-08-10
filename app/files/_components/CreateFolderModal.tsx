"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SlidersHorizontal, CheckCircle2, Circle, X } from "lucide-react";

export interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

const allMembers: Member[] = [
  {
    id: "1",
    name: "Floyd Miles",
    role: "Operations Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd",
  },
  {
    id: "2",
    name: "Darrell Steward",
    role: "Site Supervisor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darrell",
  },
  {
    id: "3",
    name: "Cameron Williamson",
    role: "Operations Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron",
  },
  {
    id: "4",
    name: "Wade Warren",
    role: "Site Supervisor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wade",
  },
  {
    id: "5",
    name: "Dianne Russell",
    role: "Site Supervisor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne",
  },
];

interface CreateFolderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFolder: (name: string, members: Member[]) => void;
}

export function CreateFolderModal({
  open,
  onOpenChange,
  onCreateFolder,
}: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const toggleMember = (member: Member) => {
    setSelectedMembers((prev) => {
      if (prev.find((m) => m.id === member.id)) {
        return prev.filter((m) => m.id !== member.id);
      }
      return [...prev, member];
    });
  };

  const removeMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleCreate = () => {
    if (!folderName.trim()) return;
    onCreateFolder(folderName, selectedMembers);
    // Reset state
    setFolderName("");
    setSelectedMembers([]);
    setSearchQuery("");
    onOpenChange(false);
  };

  const filteredMembers = allMembers.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-white p-6 rounded-2xl border-none shadow-xl">
        <DialogHeader className="p-0 text-left mb-4">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">
            Create New Folder
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-left">
          {/* Folder Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-bold text-[#0F172A]">
              Folder Name
            </Label>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400"
            />
          </div>

          {/* Add Members Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-[#0F172A]">
                Add Members
              </Label>
              <span className="text-[11px] font-bold text-[#0F172A]">
                {selectedMembers.length} selected
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium -mt-1">
              Search and select members who can access this folder
            </p>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search members by name or email..."
                  className="bg-white border-slate-300 h-10 pl-9 rounded-xl text-xs"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-slate-300 bg-white rounded-xl"
              >
                <SlidersHorizontal className="h-4 w-4 text-slate-600" />
              </Button>
            </div>

            {/* Selected Member Pills */}
            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1 pb-1">
                {selectedMembers.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full border border-purple-100"
                  >
                    {m.name}
                    <X
                      className="h-3 w-3 cursor-pointer hover:opacity-75"
                      onClick={() => removeMember(m.id)}
                    />
                  </span>
                ))}
              </div>
            )}

            {/* Member List */}
            <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden max-h-[240px] overflow-y-auto custom-scrollbar mt-2">
              {filteredMembers.map((m) => {
                const isSelected = selectedMembers.some((sm) => sm.id === m.id);
                return (
                  <div
                    key={m.id}
                    onClick={() => toggleMember(m)}
                    className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                      isSelected ? "bg-sky-50/50" : "hover:bg-slate-50"
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
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                          {m.role}
                        </p>
                      </div>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5 text-[#38BDF8] fill-[#38BDF8]/10" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-200" />
                    )}
                  </div>
                );
              })}
              {filteredMembers.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500">
                  No members found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-300 rounded-xl font-bold text-xs h-10 px-6 bg-white hover:bg-slate-50 text-[#0F172A]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!folderName.trim()}
            className="bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10 px-6 disabled:opacity-50"
          >
            Create Folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
