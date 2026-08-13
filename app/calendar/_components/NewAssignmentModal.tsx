"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Circle, MapPin, Search, X } from "lucide-react";
import { authenticatedFetch } from "@/lib/api";

type EmployeeCategory = "ENGINEER" | "WORKER" | "OTHER";

type TeamMember = {
  id: string;
  fullName: string;
  workEmail: string;
  jobTitle: string;
  employeeCategory: EmployeeCategory;
  photoUrl?: string | null;
};

type ApiRecord = { id?: string; _id?: string; [key: string]: unknown };
type Project = { id: string; name: string };

function mongoId(record: ApiRecord) {
  return record.id ?? record._id ?? "";
}

interface NewAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewAssignmentModal({ open, onOpenChange }: NewAssignmentModalProps) {
  const queryClient = useQueryClient();
  const [memberFilter, setMemberFilter] = useState<"ENGINEER" | "WORKER">("ENGINEER");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [notes, setNotes] = useState("");

  const { data: teamMembers = [], isLoading: isLoadingMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: async (): Promise<TeamMember[]> => {
      const response = await authenticatedFetch("/hr/team-members");
      if (!response.ok) throw new Error("Failed to load team members");
      const result = await response.json();
      return (result.data ?? []).map((member: TeamMember & ApiRecord) => ({
        ...member,
        id: mongoId(member),
      }));
    },
    enabled: open,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const response = await authenticatedFetch("/projects");
      if (!response.ok) throw new Error("Failed to load projects");
      const result = await response.json();
      return (result.data ?? []).map((project: Project & ApiRecord) => ({
        name: project.name,
        id: mongoId(project),
      }));
    },
    enabled: open,
  });

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.employeeCategory === memberFilter &&
      `${member.fullName} ${member.workEmail}`.toLowerCase().includes(memberSearch.toLowerCase()),
  );
  const selectedMembers = teamMembers.filter((member) => selectedMemberIds.includes(member.id));

  const createAssignment = useMutation({
    mutationFn: async () => {
      const response = await authenticatedFetch("/whereabouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          projectId,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          location: { address, latitude: Number(latitude), longitude: Number(longitude) },
          engineers: selectedMembers
            .filter((member) => member.employeeCategory === "ENGINEER")
            .map((member) => member.id),
          workers: selectedMembers
            .filter((member) => member.employeeCategory === "WORKER")
            .map((member) => member.id),
          notes,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Failed to create assignment");
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whereabouts"] });
      queryClient.invalidateQueries({ queryKey: ["whereabouts-calendar"] });
      toast.success("Assignment created successfully");
      onOpenChange(false);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function toggleMember(id: string) {
    setSelectedMemberIds((current) =>
      current.includes(id) ? current.filter((memberId) => memberId !== id) : [...current, id],
    );
  }

  function submit() {
    if (!title || !projectId || !startDate || !endDate || !address || latitude === "" || longitude === "") {
      toast.error("Complete all required assignment details.");
      return;
    }
    if (!/^[a-f\d]{24}$/i.test(projectId)) {
      toast.error("Select a valid project before creating the assignment.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End time must be after the start time.");
      return;
    }
    if (!Number.isFinite(Number(latitude)) || !Number.isFinite(Number(longitude))) {
      toast.error("Enter valid latitude and longitude values.");
      return;
    }
    createAssignment.mutate();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto custom-scrollbar border-none bg-white p-6 rounded-2xl shadow-xl sm:max-w-[540px]">
        <DialogHeader className="p-0 text-left mb-4">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">New Assignment</DialogTitle>
          <DialogDescription className="text-xs font-medium text-slate-500 mt-1">Create and assign a task to team members.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-left">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="assignment-title" className="text-xs font-bold text-[#0F172A]">Title</Label>
            <Input id="assignment-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Bridge Construction Assignment" className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400" />
          </div>

          {/* Project */}
          <div className="space-y-1.5">
            <Label htmlFor="assignment-project" className="text-xs font-bold text-[#0F172A]">Project</Label>
            <select id="assignment-project" value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400">
              <option value="">Select a project</option>
              {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="assignment-start" className="text-xs font-bold text-[#0F172A]">Start Time</Label>
              <Input id="assignment-start" type="datetime-local" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="assignment-end" className="text-xs font-bold text-[#0F172A]">End Time</Label>
              <Input id="assignment-end" type="datetime-local" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <Label htmlFor="assignment-address" className="text-xs font-bold text-[#0F172A]">Location Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input id="assignment-address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="123 Main St, NY" className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 pl-9 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>
          </div>

          {/* Coordinates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="assignment-latitude" className="text-xs font-bold text-[#0F172A]">Latitude</Label>
              <Input id="assignment-latitude" type="number" step="any" value={latitude} onChange={(event) => setLatitude(event.target.value)} placeholder="40.7128" className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="assignment-longitude" className="text-xs font-bold text-[#0F172A]">Longitude</Label>
              <Input id="assignment-longitude" type="number" step="any" value={longitude} onChange={(event) => setLongitude(event.target.value)} placeholder="-74.0060" className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>
          </div>

          {/* Add Members */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-bold text-[#0F172A]">Add Team Members</Label>
              <span className="text-[11px] font-bold text-[#0B132B] bg-slate-100 px-2 py-0.5 rounded-full">{selectedMembers.length} selected</span>
            </div>
            
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl" role="tablist" aria-label="Member category">
              {(["ENGINEER", "WORKER"] as const).map((category) => (
                <button 
                  key={category} 
                  type="button" 
                  onClick={() => setMemberFilter(category)} 
                  className={`flex-1 h-8 rounded-lg text-xs font-bold transition-all ${
                    memberFilter === category 
                      ? "bg-white text-[#0F172A] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {category === "ENGINEER" ? "Engineers" : "Workers"}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input value={memberSearch} onChange={(event) => setMemberSearch(event.target.value)} placeholder={`Search ${memberFilter.toLowerCase()}s...`} className="bg-white border-slate-300 h-10 rounded-xl text-xs text-slate-700 pl-9 focus-visible:ring-1 focus-visible:ring-slate-400" />
            </div>

            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((member) => (
                  <span key={member.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF6C3] text-[#A16207] text-[11px] font-bold rounded-full border border-[#FEF08A]">
                    {member.fullName}
                    <X className="h-3 w-3 cursor-pointer hover:opacity-75" onClick={() => toggleMember(member.id)} />
                  </span>
                ))}
              </div>
            )}

            <div className="border border-slate-200 rounded-xl bg-white overflow-hidden flex flex-col">
              <div className="max-h-[220px] overflow-y-auto custom-scrollbar divide-y divide-slate-100">
                {isLoadingMembers ? (
                  <div className="p-4 flex items-center justify-center">
                    <p className="text-xs font-medium text-slate-500">Loading team members…</p>
                  </div>
                ) : filteredMembers.length === 0 ? (
                  <div className="p-4 flex items-center justify-center">
                    <p className="text-xs font-medium text-slate-500">No {memberFilter.toLowerCase()}s found.</p>
                  </div>
                ) : (
                  filteredMembers.map((member) => {
                    const selected = selectedMemberIds.includes(member.id);
                    return (
                      <button 
                        key={member.id} 
                        type="button" 
                        onClick={() => toggleMember(member.id)} 
                        className={`flex w-full items-center justify-between p-3 text-left transition-colors ${
                          selected ? "bg-[#F8FAFC]" : "hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-100">
                            <AvatarImage src={member.photoUrl ?? undefined} alt={member.fullName} />
                            <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">{member.fullName[0]}</AvatarFallback>
                          </Avatar>
                          <span>
                            <span className="block text-xs font-bold text-[#0F172A] leading-tight">{member.fullName}</span>
                            <span className="block text-[11px] font-medium text-slate-400 mt-0.5">{member.jobTitle}</span>
                          </span>
                        </span>
                        {selected ? (
                          <CheckCircle2 className="h-5 w-5 text-[#38BDF8] fill-[#38BDF8]/10" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-200" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5 pt-1">
            <Label htmlFor="assignment-notes" className="text-xs font-bold text-[#0F172A]">Notes</Label>
            <Textarea id="assignment-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Additional instructions..." className="bg-white border-slate-300 rounded-xl text-xs text-slate-700 focus-visible:ring-1 focus-visible:ring-slate-400 min-h-[80px] p-3 resize-none" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-slate-300 rounded-xl font-bold text-xs h-10 px-6 bg-white hover:bg-slate-50 text-[#0F172A]">
            Cancel
          </Button>
          <Button type="button" onClick={submit} disabled={createAssignment.isPending} className="bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10 px-6 disabled:opacity-50">
            {createAssignment.isPending ? "Creating…" : "Create Assignment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
