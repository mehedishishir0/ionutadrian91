"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
  const { data: records = [], isLoading, isError } = useQuery({ queryKey: ["duty-of-care", startDate, endDate], enabled: canViewRecords, queryFn: async (): Promise<Duty[]> => { const params = new URLSearchParams(); if (startDate) params.set("startDate", startDate); if (endDate) params.set("endDate", endDate); const response = await authenticatedFetch(`/duty-of-care?${params}`); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Failed to load duty records"); return result.data ?? []; } });
  const activeRecord = useMemo(() => records.find((record) => !record.endTime && record.teamMemberId?.workEmail === session?.user.email), [records, session?.user.email]);

  const clockIn = useMutation({ mutationFn: async () => { const response = await authenticatedFetch("/duty-of-care/clock-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId: projectId || undefined, notes: clockInNotes || undefined }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Clock-in failed"); return result; }, onSuccess: () => { toast.success("You are clocked in."); queryClient.invalidateQueries({ queryKey: ["duty-of-care"] }); }, onError: (error: Error) => toast.error(error.message) });
  const clockOut = useMutation({ mutationFn: async (id: string) => { const response = await authenticatedFetch(`/duty-of-care/${id}/clock-out`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: clockOutNotes || undefined }) }); const result = await response.json(); if (!response.ok) throw new Error(result.message ?? "Clock-out failed"); return result; }, onSuccess: () => { toast.success("Shift completed."); setClockOutNotes(""); queryClient.invalidateQueries({ queryKey: ["duty-of-care"] }); }, onError: (error: Error) => toast.error(error.message) });

  return <div className="min-h-screen space-y-6 bg-[#FAF9F5] p-6">
    <div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Operations</p><h1 className="mt-1 text-2xl font-bold text-[#0F172A]">Duty of Care</h1><p className="mt-1 text-sm text-slate-500">Track work shifts, active coverage, and completed hours.</p></div>
    <div className="grid gap-5 lg:grid-cols-3"><Card className="border-0 border-t-4 border-t-emerald-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">YOUR SHIFT</p><p className="mt-2 text-lg font-bold text-slate-900">{activeRecord ? "Clocked in" : "Not clocked in"}</p></div><Clock3 className="h-8 w-8 text-emerald-600" /></div><p className="mt-3 text-xs text-slate-500">{activeRecord ? `Started ${formatTime(activeRecord.startTime)}` : "Start a shift when you begin work."}</p></CardContent></Card><Card className="border-0 border-t-4 border-t-blue-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">ACTIVE SHIFTS</p><p className="mt-2 text-2xl font-bold text-slate-900">{records.filter((record) => !record.endTime).length}</p></div><Users className="h-8 w-8 text-blue-600" /></div><p className="mt-3 text-xs text-slate-500">Live view for management roles.</p></CardContent></Card><Card className="border-0 border-t-4 border-t-amber-500 bg-white shadow-xs"><CardContent className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold text-slate-500">TODAY&apos;S RECORDS</p><p className="mt-2 text-2xl font-bold text-slate-900">{records.filter((record) => new Date(record.startTime).toDateString() === new Date().toDateString()).length}</p></div><Timer className="h-8 w-8 text-amber-600" /></div><p className="mt-3 text-xs text-slate-500">Clock-ins created today.</p></CardContent></Card></div>
    <div className="grid gap-6 lg:grid-cols-5"><Card className="bg-white lg:col-span-2"><CardContent className="space-y-4 p-5"><h2 className="text-base font-bold text-slate-900">Shift controls</h2>{activeRecord ? <><div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">You are currently clocked in.</div><div className="space-y-2"><Label htmlFor="clock-out-notes">Clock-out note</Label><Textarea id="clock-out-notes" value={clockOutNotes} onChange={(event) => setClockOutNotes(event.target.value)} placeholder="What was completed?" /></div><Button className="w-full bg-[#0F172A]" onClick={() => clockOut.mutate(activeRecord._id)} disabled={clockOut.isPending}><LogOut className="mr-2 h-4 w-4" />{clockOut.isPending ? "Clocking out…" : "Clock out"}</Button></> : <><div className="space-y-2"><Label htmlFor="duty-project">Project (optional)</Label><select id="duty-project" value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm"><option value="">No linked project</option>{projects.map((project) => <option key={idOf(project)} value={idOf(project)}>{project.name}</option>)}</select></div><div className="space-y-2"><Label htmlFor="clock-in-notes">Clock-in note</Label><Textarea id="clock-in-notes" value={clockInNotes} onChange={(event) => setClockInNotes(event.target.value)} placeholder="Any notes for this shift?" /></div><Button className="w-full bg-[#0F172A]" onClick={() => clockIn.mutate()} disabled={clockIn.isPending}><LogIn className="mr-2 h-4 w-4" />{clockIn.isPending ? "Clocking in…" : "Clock in"}</Button></>}</CardContent></Card>
      <Card className="bg-white lg:col-span-3"><CardContent className="p-5"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-base font-bold text-slate-900">Shift history</h2><p className="text-xs text-slate-500">{canViewRecords ? "All employee duty records" : "Only Admin and HR can view all records."}</p></div>{canViewRecords && <div className="flex gap-2"><Input aria-label="Start date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /><Input aria-label="End date" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></div>}</div>{!canViewRecords ? <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">Clock in or clock out using the controls on the left.</p> : isLoading ? <p className="py-8 text-center text-sm text-slate-500">Loading duty records…</p> : isError ? <p className="py-8 text-center text-sm text-red-600">Unable to load duty records.</p> : records.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No duty records found for this period.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b text-xs uppercase text-slate-500"><tr><th className="pb-3">Employee</th><th className="pb-3">Project</th><th className="pb-3">Clock in</th><th className="pb-3">Clock out</th><th className="pb-3">Status</th></tr></thead><tbody>{records.map((record) => <tr key={record._id} className="border-b border-slate-100"><td className="py-3"><p className="font-bold text-slate-800">{record.teamMemberId?.fullName ?? "Unknown"}</p><p className="text-xs text-slate-500">{record.teamMemberId?.jobTitle}</p></td><td className="py-3 text-slate-600">{record.projectId?.name ?? "—"}</td><td className="py-3 text-slate-600">{formatTime(record.startTime)}</td><td className="py-3 text-slate-600">{record.endTime ? formatTime(record.endTime) : "—"}</td><td className="py-3"><Badge className={record.endTime ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-700"}>{record.endTime ? "Completed" : "Active"}</Badge></td></tr>)}</tbody></table></div>}</CardContent></Card></div>
  </div>;
}
