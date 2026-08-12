/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Eye, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { authenticatedFetch } from "@/lib/api";

export interface DocumentItem {
  name: string;
  category: string;
  uploadDate: string;
  expiryDate?: string | null;
  status: string;
  url: string;
  publicId: string;
}

export interface EmployeeDetails {
  id: string;
  fullName: string;
  jobTitle: string;
  departmentId: string;
  workerType: string;
  startDate: string;
  startTime: string;
  endTime: string;
  shiftName: string;
  weekendDays: string[];
  workEmail: string;
  phoneNumber: string;
  homeAddress?: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  photoUrl?: string;
  hasPhoto?: boolean;
  isCompleted?: boolean;
  employeeCategory?: string;
  leaveBalance?: number;
  documents?: DocumentItem[];
  createdAt: string;
  updatedAt: string;
}

interface ViewEmployeeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: EmployeeDetails | null;
  onEdit?: () => void;
}

export function ViewEmployeeSheet({
  open,
  onOpenChange,
  employee,
  onEdit,
}: ViewEmployeeSheetProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["team-member", employee?.id],
    queryFn: async () => {
      if (!employee?.id) return null;
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/team-members/${employee.id}`,
        {}
      );
      const resData = await res.json();
      return resData?.data;
    },
    enabled: !!employee?.id && open,
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/departments`,
        {}
      );
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  const getDepartmentName = (id: string) => {
    const dept = departmentsData?.find((d: any) => d.id === id);
    return dept ? dept.name : id;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full !max-w-[830px] sm:w-[850px] overflow-y-auto custom-scrollbar bg-[#FAF9F6] p-6 sm:p-8 border-l border-slate-200">
        {isLoading ? (
          <div className="space-y-6 mt-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        ) : data ? (
          <>
            {/* Profile Header */}
            <SheetHeader className="p-0 text-left border-b border-slate-200/80 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border border-slate-200 shadow-xs shrink-0 bg-white">
                    <AvatarImage src={data.photoUrl} alt={data.fullName} className="object-cover" />
                    <AvatarFallback>{data.fullName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <SheetTitle className="text-xl font-bold text-[#0F172A]">
                        {data.fullName}
                      </SheetTitle>
                      {data.isCompleted ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border-0">
                          ACTIVE
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border-0">
                          ONBOARDING
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium">
                      {data.jobTitle} · {getDepartmentName(data.departmentId)}
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {data.workEmail}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {data.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <Button onClick={onEdit} className="bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-9 px-5 rounded-xl shadow-xs shrink-0">
                  Edit Employee
                </Button>
              </div>
            </SheetHeader>

            {/* Section 1: Personal Information */}
            <div className="pt-6 space-y-4 text-left">
              <h3 className="text-sm font-bold text-[#0F172A]">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 text-xs">
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Full Name
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.fullName}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Work Email
                  </p>
                  <p
                    className="font-semibold text-[#0F172A] mt-1 truncate"
                    title={data.workEmail}
                  >
                    {data.workEmail}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Job Title
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.jobTitle}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Phone Number
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.phoneNumber}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Start Date
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {formatDate(data.startDate)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Worker Type
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.workerType}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Home Address
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1 leading-relaxed">
                    {data.homeAddress || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Category</p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.employeeCategory || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Shift</p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.shiftName} · {data.startTime}-{data.endTime}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Department
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {getDepartmentName(data.departmentId)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Emergency Contact
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.emergencyContactName} · {data.emergencyContactPhoneNumber}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Weekend Days
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.weekendDays?.join(", ") || "—"}
                  </p>
                </div>
                

                <div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Leave Balance
                  </p>
                  <p className="font-semibold text-[#0F172A] mt-1">
                    {data.leaveBalance ?? 0}
                  </p>
                </div>
              </div>
            </div>
            {/* Section 2: Documents */}
            {data.documents && data.documents.length > 0 && (
              <div className="pt-8 space-y-4 text-left">
                <h3 className="text-sm font-bold text-[#0F172A]">Documents</h3>

                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
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
                      {data.documents.map((doc: DocumentItem, idx: number) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-bold text-[#0F172A] text-xs">
                            {doc.name}
                          </td>
                          <td className="py-3 px-3 text-slate-400 text-xs">
                            {doc.category}
                          </td>
                          <td className="py-3 px-3 text-slate-500 text-xs">
                            {formatDate(doc.uploadDate)}
                          </td>
                          <td className="py-3 px-3 text-slate-400 text-xs">
                            {doc.expiryDate ? formatDate(doc.expiryDate) : "—"}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold text-[10px] rounded-full">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-500">
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 hover:text-slate-900 transition-colors"
                                title="View Document"
                              >
                                <Eye className="h-4 w-4" />
                              </a>
                              <a
                                href={doc.url.replace('/upload/', '/upload/fl_attachment/')}
                                download={doc.name}
                                className="p-1 hover:text-slate-900 transition-colors"
                                title="Download Document"
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-4 text-center text-slate-500 mt-10">
            No data found
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
