/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, } from "@/components/ui/sheet";
import { authenticatedFetch } from "@/lib/api";

type Incident = {
  _id: string;
  type: string;
  teamMemberId: { fullName: string; workEmail: string; jobTitle: string };
  projectId: { name: string; clientName: string };
  date: string;
  details: string;
  location: { address: string; latitude: number; longitude: number };
  photoUrl?: string;
  status: "NEW" | "INVESTIGATING" | "CLOSED";
  investigationDetails?: string;
  rootCause?: string;
  actionOwner?: string;
  dueDate?: string;
  createdAt: string;
};

const isManager = (role?: string) => role === "ADMIN" || role === "ADMINISTRATOR" || role === "HR";
const formatDate = (date: string) => format(new Date(date), "dd MMM yyyy");
const formatTime = (date: string) => format(new Date(date), "MMM dd, yyyy - HH:mm 'GMT'");

export default function IncidentsPage() {
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isAdmin = isManager(role);

  // States
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  // Queries
  const { data: stats = { NEW: 0, INVESTIGATING: 0, CLOSED: 0, total: 0 } } = useQuery({
    queryKey: ["incidents-stats"],
    queryFn: async () => {
      const res = await authenticatedFetch("/incidents/dashboard");
      return res.json();
    },
    enabled: isAdmin,
  });

  const { data: incidents = [] } = useQuery({
    queryKey: ["incidents-list"],
    queryFn: async (): Promise<Incident[]> => {
      // Actually we need an endpoint for worker's own incidents, but we use the global one for admins.
      // Assuming GET /incidents handles role-based filtering or we just use it for admins.
      // Since the prompt says "Review and manage incident reports submitted by field engineers", we just load for admins.
      const res = await authenticatedFetch("/incidents");
      const json = await res.json();
      return json.data ?? [];
    },
    enabled: isAdmin,
  });

  if (isAdmin) {
    return <AdminIncidentsView incidents={incidents} stats={stats} selectedIncident={selectedIncident} setSelectedIncident={setSelectedIncident} />;
  }

  return <ClientIncidentsView />;
}

// -------------------------------------------------------------
// ADMIN VIEW
// -------------------------------------------------------------
function AdminIncidentsView({ incidents, stats, selectedIncident, setSelectedIncident }: any) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await authenticatedFetch(`/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update incident");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Incident updated successfully");
      queryClient.invalidateQueries({ queryKey: ["incidents-list"] });
      queryClient.invalidateQueries({ queryKey: ["incidents-stats"] });
      setSelectedIncident(data.data);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW": return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 border-emerald-200">Pending Review</Badge>;
      case "INVESTIGATING": return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 border-emerald-200">Under Investigation</Badge>;
      case "CLOSED": return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 border-emerald-200">Completed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">Incident Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage incident reports submitted by field engineers.</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-tighter text-slate-800">{format(new Date(), "HH:mm:ss 'GMT'")}</p>
          <p className="text-sm text-slate-500 font-medium">{format(new Date(), "eee dd MMM yyyy")}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-1.5 w-full bg-emerald-500" />
          <CardContent className="p-6 text-center">
            <h2 className="text-4xl font-bold text-emerald-500">{stats.total}</h2>
            <p className="text-[11px] font-bold text-slate-700 tracking-wider mt-3">TOTAL REPORTS</p>
            <p className="text-xs text-slate-400 mt-1">All incident reports submitted by field engineers</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-1.5 w-full bg-sky-500" />
          <CardContent className="p-6 text-center">
            <h2 className="text-4xl font-bold text-sky-500">{stats.NEW}</h2>
            <p className="text-[11px] font-bold text-slate-700 tracking-wider mt-3">PENDING REVIEW</p>
            <p className="text-xs text-slate-400 mt-1">Awaiting initial administrator review</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-1.5 w-full bg-amber-500" />
          <CardContent className="p-6 text-center">
            <h2 className="text-4xl font-bold text-amber-500">{stats.INVESTIGATING}</h2>
            <p className="text-[11px] font-bold text-slate-700 tracking-wider mt-3">UNDER INVESTIGATION</p>
            <p className="text-xs text-slate-400 mt-1">Active investigations in progress</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
          <div className="h-1.5 w-full bg-blue-500" />
          <CardContent className="p-6 text-center">
            <h2 className="text-4xl font-bold text-blue-500">{stats.CLOSED}</h2>
            <p className="text-[11px] font-bold text-slate-700 tracking-wider mt-3">CLOSED</p>
            <p className="text-xs text-slate-400 mt-1">Resolved And Officially Closed Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0F172A] text-white text-[11px] font-bold tracking-wider uppercase">
              <tr>
                <th className="px-6 py-4">INCIDENT ID</th>
                <th className="px-6 py-4">INCIDENT TYPE</th>
                <th className="px-6 py-4">REPORTED BY</th>
                <th className="px-6 py-4">REPORTED DATE</th>
                <th className="px-6 py-4">PROJECT</th>
                <th className="px-6 py-4">ASSIGNED TO</th>
                <th className="px-6 py-4 text-center">STATUS</th>
                <th className="px-6 py-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {incidents.map((incident: Incident) => (
                <tr key={incident._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    IR-{new Date(incident.createdAt).getFullYear()}-{incident._id.slice(-4).padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{incident.type || "General Incident"}</td>
                  <td className="px-6 py-4 text-slate-600">{incident.teamMemberId?.fullName}</td>
                  <td className="px-6 py-4 text-slate-600">{formatDate(incident.date)}</td>
                  <td className="px-6 py-4 text-slate-600">{incident.projectId?.name}</td>
                  <td className="px-6 py-4 text-slate-600">{incident.actionOwner || incident.teamMemberId?.fullName}</td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(incident.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <Button size="sm" className="bg-[#3B82F6] hover:bg-blue-600 font-bold px-5 rounded-md text-xs shadow-sm" onClick={() => setSelectedIncident(incident)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedIncident} onOpenChange={(open) => !open && setSelectedIncident(null)}>
        <SheetContent className="sm:max-w-xl p-0 bg-[#FAF9F5] border-l-0 shadow-2xl overflow-y-auto custom-scrollbar">
          {selectedIncident && (
            <IncidentDetailsPanel incident={selectedIncident} onUpdate={(data) => updateMutation.mutate({ id: selectedIncident._id, data })} />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

// -------------------------------------------------------------
// ADMIN INCIDENT DETAILS PANEL
// -------------------------------------------------------------
function IncidentDetailsPanel({ incident, onUpdate }: { incident: Incident; onUpdate: (data: any) => void }) {
  const [status, setStatus] = useState(incident.status);
  const [correctiveAction, setCorrectiveAction] = useState(incident.investigationDetails || "");
  const [rootCause, setRootCause] = useState(incident.rootCause || "");
  const [actionOwner, setActionOwner] = useState(incident.actionOwner || "");
  const [dueDate, setDueDate] = useState(incident.dueDate ? format(new Date(incident.dueDate), "yyyy-MM-dd") : "");

  const handleSave = () => {
    onUpdate({
      status,
      investigationDetails: correctiveAction,
      rootCause,
      actionOwner,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
  };

  const formattedId = `IR-${new Date(incident.createdAt).getFullYear()}-${incident._id.slice(-4).padStart(4, '0')}`;

  return (
    <div className="flex flex-col h-full bg-[#F4F4F5]">
      {/* Header */}
      <div className="p-6 bg-white border-b sticky top-0 z-10 space-y-4">
        <div>
          <h2 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-1">INCIDENT REPORT DETAILS</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">{formattedId}</span>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{incident.type}</h1>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-slate-600 bg-white shadow-sm font-medium rounded-md px-3 border-slate-200">Infrastructure Failure</Badge>
          <Badge variant="outline" className="text-rose-600 bg-rose-50 border-rose-200 shadow-sm font-medium rounded-md px-3">Critical</Badge>
          <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 shadow-sm font-medium rounded-md px-3">Investigating</Badge>
          <Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200 shadow-sm font-medium rounded-md px-3">RIDDOR Applicable</Badge>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-orange-900">RIDDOR Reporting Timeline Required</h4>
            <p className="text-xs text-orange-700 mt-0.5">This incident involves structural support failure and primary service disruption. Compliance requires HSE notification within 10 days of incident record creation.</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Info Box */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b pb-2">INCIDENT INFORMATION</h3>
          
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div>
              <p className="text-xs text-slate-500">Type</p>
              <p className="text-sm font-bold text-slate-900">{incident.type}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Date & Time</p>
              <p className="text-sm font-bold text-slate-900">{formatTime(incident.date)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Job</p>
              <p className="text-sm font-bold text-slate-900">{incident.projectId?.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="text-sm font-bold text-slate-900">{incident.location?.address}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">GPS</p>
              <p className="text-sm font-bold text-slate-900 font-mono">{incident.location?.latitude.toFixed(4)}° N, {incident.location?.longitude.toFixed(4)}° W</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Reported By</p>
              <p className="text-sm font-bold text-slate-900">{incident.teamMemberId?.fullName}</p>
            </div>
          </div>
        </div>

        {/* What Happened */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b pb-2">WHAT HAPPENED</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1.5">What Happened</p>
              <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-sm text-slate-700 leading-relaxed">
                {incident.details}
              </div>
            </div>
          </div>
        </div>

        {/* Photo Evidence */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <div className="flex justify-between items-end border-b pb-2 mb-4">
            <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">PHOTO EVIDENCE</h3>
            <span className="text-xs text-slate-400">{incident.photoUrl ? "1 Uploaded Photo" : "No photos"}</span>
          </div>
          {incident.photoUrl ? (
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={incident.photoUrl} alt="Evidence" className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No photographic evidence provided.</p>
          )}
        </div>

        {/* Status Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b pb-2">STATUS</h3>
          <div className="flex gap-3">
            {["NEW", "INVESTIGATING", "CLOSED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s as any)}
                className={cn(
                  "flex-1 py-2 rounded-lg border text-sm font-bold flex items-center justify-center gap-2 transition-all",
                  status === s 
                    ? s === "NEW" ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                    : s === "INVESTIGATING" ? "border-amber-500 bg-amber-50 text-amber-700 ring-1 ring-amber-500"
                    : "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500"
                    : "border-slate-200 text-slate-500 hover:bg-slate-50"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full", s === "NEW" ? "bg-blue-500" : s === "INVESTIGATING" ? "bg-amber-500" : "bg-emerald-500")} />
                {s === "NEW" ? "Open" : s === "INVESTIGATING" ? "Investigating" : "Closed"}
              </button>
            ))}
          </div>
        </div>

        {/* Investigation Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4 mb-8">
          <h3 className="text-[11px] font-bold text-slate-500 tracking-wider uppercase border-b pb-2">INVESTIGATION & CORRECTIVE ACTION</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Corrective Action <span className="text-rose-500">*</span></Label>
              <Textarea 
                value={correctiveAction} 
                onChange={e => setCorrectiveAction(e.target.value)} 
                className="resize-none bg-slate-50 border-slate-200" 
                rows={3} 
                placeholder="Enter root cause analysis and actions taken..." 
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">Root Cause <span className="text-rose-500">*</span></Label>
              <Textarea 
                value={rootCause} 
                onChange={e => setRootCause(e.target.value)} 
                className="resize-none bg-slate-50 border-slate-200" 
                rows={2} 
                placeholder="Enter corrective actions to prevent recurrence..." 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Action Owner <span className="text-rose-500">*</span></Label>
                <Input 
                  value={actionOwner} 
                  onChange={e => setActionOwner(e.target.value)} 
                  className="bg-slate-50 border-slate-200" 
                  placeholder="E.g. Donald Vance"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">Due Date <span className="text-rose-500">*</span></Label>
                <Input 
                  type="date"
                  value={dueDate} 
                  onChange={e => setDueDate(e.target.value)} 
                  className="bg-slate-50 border-slate-200" 
                />
              </div>
            </div>
            
            <Button onClick={handleSave} className="w-full h-12 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-lg mt-2">
              Save Investigation
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CLIENT VIEW (WORKER FORM)
// -------------------------------------------------------------
function ClientIncidentsView() {
  const [projectId, setProjectId] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const { data: projects = [] } = useQuery({ 
    queryKey: ["projects"], 
    queryFn: async () => { 
      const response = await authenticatedFetch("/projects"); 
      return (await response.json()).data ?? []; 
    } 
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("projectId", projectId);
      formData.append("type", type);
      formData.append("date", new Date().toISOString());
      formData.append("details", details);
      formData.append("location", JSON.stringify({
        address: address,
        latitude: 0, // Mock for now
        longitude: 0,
      }));
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await authenticatedFetch("/incidents", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header so browser sets multipart/form-data with boundary
      });
      if (!res.ok) throw new Error("Failed to submit incident");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Incident reported successfully");
      setProjectId("");
      setType("");
      setDetails("");
      setAddress("");
      setPhoto(null);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const incidentTypes = ["Dangerous Occurrence", "Equipment Failure", "Slip and Fall", "Chemical Spill", "Fire Incident", "Unauthorized Access", "Power Outage", "Near Miss", "Other"];

  return (
    <div className="min-h-screen bg-[#FAF9F5] p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A]">Report an Incident</h1>
        <p className="text-sm text-slate-500 mt-1">Submit a new incident report from the field.</p>
      </div>

      <Card className="bg-white shadow-sm border-slate-200">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Project <span className="text-rose-500">*</span></Label>
              <select 
                value={projectId} 
                onChange={(e) => setProjectId(e.target.value)} 
                className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm font-medium focus:ring-emerald-500 focus:border-emerald-500 border"
              >
                <option value="" disabled>Select assigned project</option>
                {projects.map((p: any) => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Incident Type <span className="text-rose-500">*</span></Label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
                className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 px-4 text-sm font-medium focus:ring-emerald-500 focus:border-emerald-500 border"
              >
                <option value="" disabled>Select type</option>
                {incidentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Location / Address <span className="text-rose-500">*</span></Label>
              <Input 
                value={address} 
                onChange={e => setAddress(e.target.value)} 
                placeholder="Where did this happen?" 
                className="h-12 bg-slate-50 border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Details of Incident <span className="text-rose-500">*</span></Label>
              <Textarea 
                value={details} 
                onChange={e => setDetails(e.target.value)} 
                rows={4}
                placeholder="Describe exactly what happened..." 
                className="bg-slate-50 border-slate-200 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-slate-700">Photo Evidence <span className="text-slate-400 font-normal">(Optional)</span></Label>
              <Input 
                type="file" 
                accept="image/*"
                onChange={e => setPhoto(e.target.files?.[0] || null)} 
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 rounded-xl mt-4"
              disabled={!projectId || !type || !details || !address || submitMutation.isPending}
              onClick={() => submitMutation.mutate()}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Incident Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
