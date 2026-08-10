"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Shield,
  MapPin,
  Heart,
  AlertTriangle,
  Search,
  ChevronDown,
} from "lucide-react";
import { AddTeamMemberSheet } from "./AddTeamMemberSheet";
import { AddDepartmentModal } from "./AddDepartmentModal";
import { ViewEmployeeSheet,  EmployeeDetails } from "./ViewEmployeeSheet";

const employeeData: EmployeeDetails[] = Array(12).fill({
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
});
export default function HRPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [departmentModalOpen, setDepartmentModalOpen] = useState(false);

  // State for View Employee Sidebar Sheet
  const [viewSheetOpen, setViewSheetOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetails | null>(null);

  const handleViewEmployee = (emp: EmployeeDetails) => {
    setSelectedEmployee(emp);
    setViewSheetOpen(true);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <span className="text-2xl font-bold text-[#0F172A]">28</span>
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
              <span className="text-2xl font-bold text-[#0F172A]">8</span>
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
              <span className="text-2xl font-bold text-[#0F172A]">12</span>
              <span className="text-xs font-medium text-slate-500">
                Pending
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Organization Chart */}
        <Card className="bg-white border-0 border-l-4 border-l-emerald-500 shadow-xs rounded-2xl p-5">
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
              <span className="text-2xl font-bold text-[#0F172A]">24</span>
              <span className="text-xs font-medium text-slate-500">Teams</span>
            </div>
          </CardContent>
        </Card>
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
              {employeeData.map((emp, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  {/* Employee Name & Avatar */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback>RV</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-[#0F172A]">
                        {emp.fullName}
                      </span>
                    </div>
                  </td>

                  <td className="py-2.5 px-4 text-slate-500">{emp.jobTitle}</td>
                  <td className="py-2.5 px-4 text-slate-500">
                    {emp.department}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{emp.mobile}</td>

                  {/* Status Badge */}
                  <td className="py-2.5 px-4">
                    {idx % 3 === 2 ? (
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] rounded-full">
                        Onboarding
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 font-bold text-[10px] rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </td>

                  {/* Actions Buttons */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => handleViewEmployee(emp)} className="px-2.5 py-1 bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-[10px] rounded-md transition-colors">
                        View
                      </button>
                      <button className="px-2.5 py-1 bg-[#10B981] hover:bg-emerald-700 text-white font-bold text-[10px] rounded-md transition-colors">
                        Edit
                      </button>
                      <button className="px-2.5 py-1 bg-[#EF4444] hover:bg-red-700 text-white font-bold text-[10px] rounded-md transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Slide-over Sheet Component */}
      <AddTeamMemberSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <AddDepartmentModal
        open={departmentModalOpen}
        onOpenChange={setDepartmentModalOpen}
      />
      <ViewEmployeeSheet
        open={viewSheetOpen}
        onOpenChange={setViewSheetOpen}
        employee={selectedEmployee}
      />
    </div>
  );
}
