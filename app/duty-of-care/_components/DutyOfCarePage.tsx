"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock3, LogIn, LogOut, Timer, Users } from "lucide-react";
import { authenticatedFetch } from "@/lib/api";

type Project = { id?: string; _id?: string; name: string };
type Duty = {
  _id: string;
  startTime: string;
  endTime?: string | null;
  notes: string;
  teamMemberId?: { fullName: string; workEmail: string; jobTitle: string };
  projectId?: { name: string } | null;
};
const isManager = (role?: string) => role === "ADMIN" || role === "ADMINISTRATOR" || role === "HR";
const idOf = (item: { id?: string; _id?: string }) => item.id ?? item._id ?? "";
const formatTime = (date?: string | null) => date ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date)) : "Active";

export default function DutyOfCarePage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const canViewRecords = isManager(session?.user.role);
  const [projectId, setProjectId] = useState("");
  const [clockInNotes, setClockInNotes] = useState("");
  const [clockOutNotes, setClockOutNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: projects = [] } = useQuery({ queryKey: ["projects"], queryFn: async (): Promise<Project[]> => { const response = await authenticatedFetch("/projects"); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Failed to load projects"); return result.data ?? []; } });
  
  const { data: displayRecords = [], isLoading, isError } = useQuery({ 
    queryKey: ["duty-of-care-display", canViewRecords, startDate, endDate], 
    queryFn: async (): Promise<Duty[]> => { 
      const params = new URLSearchParams(); 
      if (startDate) params.set("startDate", startDate); 
      if (endDate) params.set("endDate", endDate); 
      const url = canViewRecords ? `/duty-of-care?${params}` : `/duty-of-care/my-records`; 
      const response = await authenticatedFetch(url); 
      const result = await response.json(); 
      if (!response.ok) throw new Error(result.message ?? "Failed to load duty records"); 
      return result.data ?? []; 
    } 
  });

  const { data: myRecords = [] } = useQuery({
    queryKey: ["duty-of-care-my"],
    queryFn: async (): Promise<Duty[]> => {
      const response = await authenticatedFetch(`/duty-of-care/my-records`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? "Failed to load my records");
      return result.data ?? [];
    }
  });

  const activeRecord = useMemo(() => myRecords.find((record) => !record.endTime), [myRecords]);

  const clockIn = useMutation({ mutationFn: async () => { const response = await authenticatedFetch("/duty-of-care/clock-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: projectId || undefined, notes: clockInNotes || undefined }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Clock-in failed"); return result; }, onSuccess: () => { toast.success("You are clocked in."); setClockInNotes(""); setProjectId(""); queryClient.invalidateQueries({ queryKey: ["duty-of-care-display"] }); queryClient.invalidateQueries({ queryKey: ["duty-of-care-my"] }); }, onError: (error: Error) => toast.error(error.message) });
  const clockOut = useMutation({ mutationFn: async (id: string) => { const response = await authenticatedFetch(`/duty-of-care/${id}/clock-out`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: clockOutNotes || undefined }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Clock-out failed"); return result; }, onSuccess: () => { toast.success("Shift completed."); setClockOutNotes(""); queryClient.invalidateQueries({ queryKey: ["duty-of-care-display"] }); queryClient.invalidateQueries({ queryKey: ["duty-of-care-my"] }); }, onError: (error: Error) => toast.error(error.message) });

  return <div className="min-h-screen space-y-6 bg-[#FAF9F5] p-6">
    <div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Operations</p><h1 className="mt-1 text-2xl font-bold text-[#0F172A]">Duty of Care</h1><p className="mt-1 text-sm text-slate-500">Track work shifts, active coverage, and completed hours.</p></div>
    <div className={cn("grid gap-5", canViewRecords ? "lg:grid-cols-2" : "lg:grid-cols-3")}>{!canViewRecords && <Card className="border-0 border-t-4 border-t-emerald-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">YOUR SHIFT</p><p className="mt-2 text-lg font-bold text-slate-900">{activeRecord ? "Clocked in" : "Not clocked in"}</p></div><Clock3 className="h-8 w-8 text-emerald-600" /></div><p className="mt-3 text-xs text-slate-500">{activeRecord ? `Started ${formatTime(activeRecord.startTime)}` : "Start a shift when you begin work."}</p></CardContent></Card>}<Card className="border-0 border-t-4 border-t-blue-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">ACTIVE SHIFTS</p><p className="mt-2 text-2xl font-bold text-slate-900">{displayRecords.filter((record) => !record.endTime).length}</p></div><Users className="h-8 w-8 text-blue-600" /></div><p className="mt-3 text-xs text-slate-500">{canViewRecords ? "Live view for management roles." : "Your active shift."}</p></CardContent></Card><Card className="border-0 border-t-4 border-t-amber-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">TODAY&apos;S RECORDS</p><p className="mt-2 text-2xl font-bold text-slate-900">{displayRecords.filter((record) => new Date(record.startTime).toDateString() === new Date().toDateString()).length}</p></div><Timer className="h-8 w-8 text-amber-600" /></div><p className="mt-3 text-xs text-slate-500">Clock-ins created today.</p></CardContent></Card></div>
    <div className="grid gap-6 lg:grid-cols-5">{!canViewRecords && <Card className="bg-white lg:col-span-2 border-0 shadow-sm ring-1 ring-slate-100"><CardContent className="p-6 space-y-6"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h2 className="text-lg font-bold tracking-tight text-slate-900">Shift Controls</h2><div className={cn("flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold", activeRecord ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}><div className={cn("h-2 w-2 rounded-full", activeRecord ? "animate-pulse bg-emerald-500" : "bg-slate-400")} />{activeRecord ? "Active Shift" : "Off Duty"}</div></div>{activeRecord ? <div className="space-y-6"><div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg shadow-emerald-200"><div className="flex items-center gap-4"><div className="rounded-xl bg-white/20 p-3"><Timer className="h-6 w-6 text-white" /></div><div><p className="text-sm font-medium text-emerald-50">Currently Clocked In</p><p className="text-2xl font-bold tracking-tight">{formatTime(activeRecord.startTime)}</p></div></div></div><div className="space-y-3"><Label htmlFor="clock-out-notes" className="font-semibold text-slate-700">End of shift notes</Label><Textarea id="clock-out-notes" value={clockOutNotes} onChange={(event) => setClockOutNotes(event.target.value)} placeholder="What was completed during this shift?" className="resize-none rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-emerald-500" rows={3} /></div><Button size="lg" className="h-14 w-full rounded-xl bg-rose-500 text-base font-bold text-white shadow-md shadow-rose-200 transition-all hover:bg-rose-600 active:scale-[0.98]" onClick={() => clockOut.mutate(activeRecord._id)} disabled={clockOut.isPending}><LogOut className="mr-2 h-5 w-5" />{clockOut.isPending ? "Ending Shift…" : "Clock Out & End Shift"}</Button></div> : <div className="space-y-5"><div className="space-y-2"><Label htmlFor="duty-project" className="text-sm font-semibold text-slate-700">Select Project <span className="text-rose-500">*</span></Label><select id="duty-project" value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"><option value="" disabled>Choose assigned project...</option>{projects.map((project) => <option key={idOf(project)} value={idOf(project)}>{project.name}</option>)}</select></div><div className="space-y-2"><Label htmlFor="clock-in-notes" className="text-sm font-semibold text-slate-700">Starting Notes <span className="font-normal text-slate-400">(Optional)</span></Label><Textarea id="clock-in-notes" value={clockInNotes} onChange={(event) => setClockInNotes(event.target.value)} placeholder="Any specific goals for this shift?" className="resize-none rounded-xl border-slate-200 bg-slate-50 focus-visible:ring-emerald-500" rows={3} /></div><Button size="lg" className={cn("h-14 w-full rounded-xl text-base font-bold shadow-md transition-all active:scale-[0.98]", projectId ? "bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700" : "cursor-not-allowed bg-slate-100 text-slate-400 shadow-none")} onClick={() => clockIn.mutate()} disabled={!projectId || clockIn.isPending}><LogIn className="mr-2 h-5 w-5" />{!projectId ? "Select project to unlock" : clockIn.isPending ? "Starting Shift…" : "Clock In & Start Shift"}</Button></div>}</CardContent></Card>}
      <Card className={cn("bg-white", canViewRecords ? "lg:col-span-5" : "lg:col-span-3")}><CardContent className="p-5"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-base font-bold text-slate-900">Shift history</h2><p className="text-xs text-slate-500">{canViewRecords ? "All employee duty records" : "Your duty records"}</p></div>{canViewRecords && <div className="flex gap-2"><Input aria-label="Start date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /><Input aria-label="End date" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></div>}</div>{isLoading ? <p className="py-8 text-center text-sm text-slate-500">Loading duty records…</p> : isError ? <p className="py-8 text-center text-sm text-red-600">Unable to load duty records.</p> : displayRecords.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No duty records found for this period.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-xs uppercase text-slate-500"><tr><th className="pb-3">Employee</th><th className="pb-3">Project</th><th className="pb-3">Clock in</th><th className="pb-3">Clock out</th><th className="pb-3">Status</th></tr></thead><tbody>{displayRecords.map((record) => <tr key={record._id} className="border-b border-slate-100"><td className="py-3"><p className="font-bold text-slate-800">{record.teamMemberId?.fullName ?? "Unknown"}</p><p className="text-xs text-slate-500">{record.teamMemberId?.jobTitle}</p></td><td className="py-3 text-slate-600">{record.projectId?.name ?? "—"}</td><td className="py-3 text-slate-600">{formatTime(record.startTime)}</td><td className="py-3 text-slate-600">{record.endTime ? formatTime(record.endTime) : "—"}</td><td className="py-3"><Badge className={record.endTime ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-700"}>{record.endTime ? "Completed" : "Active"}</Badge></td></tr>)}</tbody></table></div>}</CardContent></Card></div>
  </div>;
}
