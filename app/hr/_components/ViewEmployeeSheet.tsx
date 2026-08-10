"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, UploadCloud, Eye, Download, Trash2 } from "lucide-react";

export interface EmployeeDetails {
  fullName: string;
  jobTitle: string;
  department: string;
  team: string;
  email: string;
  mobile: string;
  startDate: string;
  homeAddress: string;
  shift: string;
  emergencyContact: string;
  weekendDay: string;
  status: string;
  avatar: string;
}

interface ViewEmployeeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: EmployeeDetails | null;
}

const mockDocuments = [
  {
    name: "Employment Contract",
    category: "Legal",
    uploadDate: "12 Mar 2021",
    expiryDate: "—",
    status: "Verified",
  },
  {
    name: "Right To Work",
    category: "Compliance",
    uploadDate: "12 Mar 2021",
    expiryDate: "—",
    status: "Verified",
  },
  {
    name: "Passport",
    category: "Identity",
    uploadDate: "12 Mar 2021",
    expiryDate: "22 Nov 2026",
    status: "Verified",
  },
  {
    name: "National ID",
    category: "Identity",
    uploadDate: "12 Mar 2021",
    expiryDate: "—",
    status: "Verified",
  },
  {
    name: "Driving Licence",
    category: "Identity",
    uploadDate: "15 Mar 2021",
    expiryDate: "30 Jun 2027",
    status: "Verified",
  },
];

export function ViewEmployeeSheet({
  open,
  onOpenChange,
  employee,
}: ViewEmployeeSheetProps) {
  const data = employee || {
    fullName: "Daniel Okafor",
    jobTitle: "Senior Site Engineer",
    department: "Field Operations",
    team: "Infrastructure Team B",
    email: "daniel.okafor@apexworks.co",
    mobile: "+44 7712 445 908",
    startDate: "12 March 2021",
    homeAddress: "48 Bridgewater Road, Manchester, M15 4FN",
    shift: "Day Shift · 07:00-16:00",
    emergencyContact: "Robert Vance · +44 7712 445 908",
    weekendDay: "Friday",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full !max-w-[830px] sm:w-[850px]  overflow-y-auto custom-scrollbar bg-[#FAF9F6] p-6 sm:p-8 custom-scrollbar border-l border-slate-200">
        
        {/* Profile Header */}
        <SheetHeader className="p-0 text-left border-b border-slate-200/80 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border border-slate-200 shadow-xs shrink-0">
                <AvatarImage src={data.avatar} alt={data.fullName} />
                <AvatarFallback>DO</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <SheetTitle className="text-xl font-bold text-[#0F172A]">
                    {data.fullName}
                  </SheetTitle>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border-0">
                    {data.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  {data.jobTitle} · {data.department} · {data.team}
                </p>

                <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {data.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {data.mobile}
                  </span>
                </div>
              </div>
            </div>

            <Button className="bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-9 px-5 rounded-xl shadow-xs shrink-0">
              Edit Employee
            </Button>

          </div>
        </SheetHeader>

        {/* Section 1: Personal Information */}
        <div className="pt-6 space-y-4 text-left">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Personal Information
          </h3>

          {/* Grid layout adjusted to gap-x-6 & gap-y-5 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 text-xs">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Full Name</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.fullName}</p>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] text-slate-400 font-medium">Company Email</p>
              <p className="font-semibold text-[#0F172A] mt-1 truncate" title={data.email}>
                {data.email}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Job Title</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.jobTitle}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Mobile Number</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.mobile}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Start Date</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.startDate}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Team</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.team}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-[11px] text-slate-400 font-medium">Home Address</p>
              <p className="font-semibold text-[#0F172A] mt-1 leading-relaxed">
                {data.homeAddress}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Shift</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.shift}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Department</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.department}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Emergency Contact</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.emergencyContact}</p>
            </div>

            <div>
              <p className="text-[11px] text-slate-400 font-medium">Weekend Day</p>
              <p className="font-semibold text-[#0F172A] mt-1">{data.weekendDay}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Documents */}
        <div className="pt-8 space-y-4 text-left">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Documents
          </h3>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-300/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-white/70 hover:bg-white transition-colors cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-2">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-[#0F172A]">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5 mb-3">
              PDF, PNG, JPG up to 25MB
            </p>
            <Button variant="outline" size="sm" className="h-8 text-xs font-bold rounded-lg border-slate-300 px-4">
              Select Files
            </Button>
          </div>

          {/* Table Container without horizontal scroll */}
          <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden mt-4 shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/60">
                  <th className="py-3 px-4">Document Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Upload Date</th>
                  <th className="py-3 px-3">Expiry Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                {mockDocuments.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0F172A] text-xs">{doc.name}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{doc.category}</td>
                    <td className="py-3 px-3 text-slate-500 text-xs">{doc.uploadDate}</td>
                    <td className="py-3 px-3 text-slate-400 text-xs">{doc.expiryDate}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold text-[10px] rounded-full">
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-500">
                        <button className="p-1 hover:text-slate-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:text-slate-900 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:text-red-600 transition-colors">
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}