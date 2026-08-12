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
      <DialogContent className="max-h-[90vh] overflow-y-auto border-none bg-[#FAF9F5] p-6 sm:max-w-[540px]">
        <DialogHeader className="p-0 text-left">
          <DialogTitle className="text-xl font-bold text-[#0F172A]">New Assignment</DialogTitle>
          <DialogDescription className="text-xs font-medium text-slate-500">Create and assign a task to team members.</DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4 text-left">
          <div className="space-y-1"><Label htmlFor="assignment-title">Title</Label><Input id="assignment-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Bridge Construction Assignment" /></div>
          <div className="space-y-1"><Label htmlFor="assignment-project">Project</Label><select id="assignment-project" value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"><option value="">Select a project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2"><div className="space-y-1"><Label htmlFor="assignment-start">Start</Label><Input id="assignment-start" type="datetime-local" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></div><div className="space-y-1"><Label htmlFor="assignment-end">End</Label><Input id="assignment-end" type="datetime-local" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></div></div>
          <div className="space-y-1"><Label htmlFor="assignment-address">Location</Label><div className="relative"><Input id="assignment-address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="123 Main St, NY" className="pr-9" /><MapPin className="absolute right-3 top-3 h-4 w-4 text-slate-400" /></div></div>
          <div className="grid grid-cols-2 gap-3"><div className="space-y-1"><Label htmlFor="assignment-latitude">Latitude</Label><Input id="assignment-latitude" type="number" step="any" value={latitude} onChange={(event) => setLatitude(event.target.value)} /></div><div className="space-y-1"><Label htmlFor="assignment-longitude">Longitude</Label><Input id="assignment-longitude" type="number" step="any" value={longitude} onChange={(event) => setLongitude(event.target.value)} /></div></div>

          <div className="space-y-2">
            <div className="flex items-center justify-between"><Label>Add Members</Label><span className="text-[11px] font-bold text-slate-700">{selectedMembers.length} selected</span></div>
            <div className="flex gap-2" role="tablist" aria-label="Member category">
              {(["ENGINEER", "WORKER"] as const).map((category) => <Button key={category} type="button" variant={memberFilter === category ? "default" : "outline"} onClick={() => setMemberFilter(category)} className="h-8 rounded-lg text-xs">{category === "ENGINEER" ? "Engineers" : "Workers"}</Button>)}
            </div>
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" /><Input value={memberSearch} onChange={(event) => setMemberSearch(event.target.value)} placeholder={`Search ${memberFilter.toLowerCase()}s...`} className="pl-9" /></div>
            {selectedMembers.length > 0 && <div className="flex flex-wrap gap-2">{selectedMembers.map((member) => <button key={member.id} type="button" onClick={() => toggleMember(member.id)} className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF6C3] px-3 py-1 text-xs font-bold text-[#0F172A]">{member.fullName}<X className="h-3 w-3" /></button>)}</div>}
            <div className="divide-y overflow-hidden rounded-xl border border-slate-200 bg-white">
              {isLoadingMembers ? <p className="p-3 text-xs text-slate-500">Loading team members…</p> : filteredMembers.length === 0 ? <p className="p-3 text-xs text-slate-500">No {memberFilter.toLowerCase()}s found.</p> : filteredMembers.map((member) => {
                const selected = selectedMemberIds.includes(member.id);
                return <button key={member.id} type="button" onClick={() => toggleMember(member.id)} className={`flex w-full items-center justify-between p-2.5 text-left ${selected ? "bg-sky-50/50" : "hover:bg-slate-50"}`}><span className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarImage src={member.photoUrl ?? undefined} alt={member.fullName} /><AvatarFallback>{member.fullName[0]}</AvatarFallback></Avatar><span><span className="block text-xs font-bold text-slate-900">{member.fullName}</span><span className="block text-[11px] text-slate-400">{member.jobTitle}</span></span></span>{selected ? <CheckCircle2 className="h-5 w-5 text-sky-500" /> : <Circle className="h-5 w-5 text-slate-300" />}</button>;
              })}
            </div>
          </div>
          <div className="space-y-1"><Label htmlFor="assignment-notes">Notes</Label><Textarea id="assignment-notes" value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Bring heavy machinery" /></div>
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-3"><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button type="button" onClick={submit} disabled={createAssignment.isPending}>{createAssignment.isPending ? "Creating…" : "Create Assignment"}</Button></div>
      </DialogContent>
    </Dialog>
  );
}
