"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  MapPin,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import { AddTeamMemberSheet } from "./AddTeamMemberSheet";
import { AddDepartmentModal } from "./AddDepartmentModal";
import { ViewEmployeeSheet, EmployeeDetails } from "./ViewEmployeeSheet";

import { EditEmployeeSheet } from "./EditEmployeeSheet";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

export default function HRPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);

  // State for View Employee Sidebar Sheet
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetails | null>(null);

  // State for Edit Employee Sidebar Sheet
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [employeeToEditId, setEmployeeToEditId] = useState<string | null>(null);

  // State for Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<{id: string, name: string} | null>(null);

  const { data: teamMembers, isLoading: isLoadingTeamMembers } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const res = await fetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/team-members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      const res = await fetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/departments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();
      return resData?.data || [];
    },
  });

  const getDepartmentName = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dept = departmentsData?.find((d: any) => d.id === id);
    return dept ? dept.name : id;
  };

  const handleViewEmployee = (emp: EmployeeDetails) => {
    setSelectedEmployee(emp);
    setViewSheetOpen(true);
  };

  const handleEditEmployee = (empId: string) => {
    setEmployeeToEditId(empId);
    setEditSheetOpen(true);
    setViewSheetOpen(false); // Close view sheet if open
  };

  const handleDeleteEmployee = (id: string, name: string) => {
    setEmployeeToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  return (
    <div className="w-full p-6 space-y-6 bg-[#FAF9F5] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Team</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Build the C.I.A. organisation: departments, people, permissions and
            onboarding.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setDepartmentModalOpen(true)}
            variant="outline"
            className="bg-white border-slate-300 text-slate-800 font-bold text-xs h-9 px-4 rounded-lg hover:bg-slate-50"
          >
            Add Department
          </Button>
          <Button
            onClick={() => setSheetOpen(true)}
            className="bg-[#0B132B] hover:bg-slate-900 text-white font-bold text-xs h-9 px-4 rounded-lg shadow-sm"
          >
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* People */}
        <Card className="bg-white border-0 border-l-4 border-l-blue-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-full text-blue-600">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">People</span>
              </div>
              <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {teamMembers?.length || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Employees
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Departments */}
        <Card className="bg-white border-0 border-l-4 border-l-cyan-400 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-100 rounded-full text-cyan-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">
                  Departments
                </span>
              </div>
              <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {departmentsData?.length || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Departments
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding */}
        <Card className="bg-white border-0 border-l-4 border-l-amber-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 rounded-full text-amber-600">
                  <Heart className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">
                  Onboarding
                </span>
              </div>
              <span className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">
                {teamMembers?.filter((emp: EmployeeDetails) => !emp.isCompleted).length || 0}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Pending
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Organization Chart */}
        {/* <Card className="bg-white border-0 border-l-4 border-l-emerald-500 shadow-xs rounded-2xl p-5">
          <CardContent className="p-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-[#0F172A]">
                  Organization Chart
                </span>
              </div>
              <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>
            <div className="bg-slate-50 rounded-xl px-4 py-2.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#0F172A]">0</span>
              <span className="text-xs font-medium text-slate-500">Teams</span>
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <div className="relative w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search employee..."
            className="bg-white border-slate-200 h-9 pl-9 text-xs rounded-lg"
          />
        </div>

        <button className="flex items-center gap-2 h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
          Department <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <button className="flex items-center gap-2 h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
          Job Title <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>

        <button className="flex items-center gap-2 h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
          Status <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Employee Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0B132B] text-white text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">EMPLOYEE</th>
                <th className="py-3 px-4">JOB TITLE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">MOBILE NUMBER</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {isLoadingTeamMembers ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-500">
                    <div className="flex flex-col gap-2 items-center">
                      <Skeleton className="h-8 w-full max-w-2xl" />
                      <Skeleton className="h-8 w-full max-w-2xl" />
                      <Skeleton className="h-8 w-full max-w-2xl" />
                    </div>
                  </td>
                </tr>
              ) : teamMembers?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-slate-500">
                    No team members found.
                  </td>
                </tr>
              ) : (
                teamMembers?.map((emp: EmployeeDetails) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Employee Name & Avatar */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={emp.photoUrl} />
                          <AvatarFallback>
                            {emp.fullName?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-[#0F172A]">
                          {emp.fullName}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-4 text-slate-500">
                      {emp.jobTitle}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {getDepartmentName(emp.departmentId)}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {emp.phoneNumber}
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-4">
                      {emp.isCompleted ? (
                        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] rounded-full">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-amber-50 text-amber-600 font-bold text-[10px] rounded-full">
                          ONBOARDING
                        </span>
                      )}
                    </td>

                    {/* Actions Buttons */}
                    <td className="py-2.5 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleViewEmployee(emp)}
                          className="px-2.5 py-1 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-[10px] rounded-md transition-colors"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleEditEmployee(emp.id)}
                          className="px-2.5 py-1 bg-[#10B981] hover:bg-emerald-700 text-white font-bold text-[10px] rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteEmployee(emp.id, emp.fullName)}
                          className="px-2.5 py-1 bg-[#EF4444] hover:bg-red-700 text-white font-bold text-[10px] rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Slide-over Sheet Component */}
      <AddTeamMemberSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <EditEmployeeSheet 
        open={editSheetOpen} 
        onOpenChange={setEditSheetOpen} 
        employeeId={employeeToEditId} 
      />
      <AddDepartmentModal
        open={departmentModalOpen}
        onOpenChange={setDepartmentModalOpen}
      />
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        employeeId={employeeToDelete?.id || null}
        employeeName={employeeToDelete?.name || null}
      />
      <ViewEmployeeSheet
        open={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
        employee={selectedEmployee}
        onEdit={() => {
          if (selectedEmployee?.id) {
            handleEditEmployee(selectedEmployee.id);
          }
        }}
      />
    </div>
  );
}
