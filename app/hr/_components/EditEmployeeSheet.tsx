"use client";

import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Clock, UploadCloud, File as FileIcon, X } from "lucide-react";
import Image from "next/image";
import { authenticatedFetch } from "@/lib/api";

interface EditEmployeeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId?: string | null;
}

interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function EditEmployeeSheet({
  open,
  onOpenChange,
  employeeId,
}: EditEmployeeSheetProps) {
  const queryClient = useQueryClient();
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [documents, setDocuments] = useState<File[]>([]);

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [employeeCategory, setEmployeeCategory] = useState("ENGINEER");
  const [workerType, setWorkerType] = useState("Field Engineer");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [shiftName, setShiftName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [workEmail, setWorkEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [leaveBalance, setLeaveBalance] = useState("0");

  const [isCompleted, setIsCompleted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const days = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => {
      if (f.size > 25 * 1024 * 1024) {
        toast.error(`File ${f.name} is too large (max 25MB)`);
        return false;
      }
      return true;
    });
    setDocuments((prev) => [...prev, ...validFiles]);
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/departments`,
        {},
      );
      const data = await res.json();
      return data?.data || [];
    },
  });

  const { data: employeeData } = useQuery({
    queryKey: ["team-member", employeeId],
    queryFn: async () => {
      if (!employeeId) return null;
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/team-members/${employeeId}`,
        {}
      );
      const resData = await res.json();
      return resData?.data;
    },
    enabled: !!employeeId && open,
  });

  useEffect(() => {
    if (employeeData && open) {
      setFullName(employeeData.fullName || "");
      setJobTitle(employeeData.jobTitle || "");
      setDepartmentId(employeeData.departmentId || "");
      setEmployeeCategory(employeeData.employeeCategory || "ENGINEER");
      setWorkerType(employeeData.workerType || "Field Engineer");
      setStartDate(employeeData.startDate ? employeeData.startDate.split("T")[0] : "");
      setStartTime(employeeData.startTime || "08:00");
      setEndTime(employeeData.endTime || "18:00");
      setShiftName(employeeData.shiftName || "");
      setSelectedDays(
        (employeeData.weekendDays || []).map((d: string) =>
          d.charAt(0).toUpperCase() + d.slice(1).toLowerCase()
        )
      );
      setWorkEmail(employeeData.workEmail || "");
      setPhoneNumber(employeeData.phoneNumber || "");
      setHomeAddress(employeeData.homeAddress || "");
      setEmergencyContactName(employeeData.emergencyContactName || "");
      setEmergencyContactPhone(employeeData.emergencyContactPhoneNumber || "");
      setLeaveBalance(employeeData.leaveBalance?.toString() || "0");
      setPhotoPreview(employeeData.photoUrl || null);
      setPhoto(null);
      setDocuments([]);
      setIsCompleted(employeeData.isCompleted || false);
    }
  }, [employeeData, open]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-team-member", employeeId],
    mutationFn: async (formData: FormData) => {
      const apiBaseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await authenticatedFetch(
        `${apiBaseURL.replace(/\/$/, "")}/hr/team-members/${employeeId}`,
        {
          method: "PATCH",
          headers: {
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (!res.ok || (data.statusCode && data.statusCode >= 400)) {
        throw new Error(data.message || "Failed to update team member");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message || "Team member updated successfully");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member", employeeId] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update team member");
    },
  });

  const handleSubmit = () => {
    if (!employeeId) return;
    if (
      !fullName ||
      !jobTitle ||
      !departmentId ||
      !startDate ||
      !startTime ||
      !endTime ||
      !shiftName ||
      !workEmail ||
      !phoneNumber ||
      !emergencyContactName ||
      !emergencyContactPhone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    if (photo) formData.append("photo", photo);
    
    documents.forEach((doc) => {
      formData.append("documents", doc);
    });

    formData.append("fullName", fullName);
    formData.append("jobTitle", jobTitle);
    formData.append("departmentId", departmentId);
    formData.append("employeeCategory", employeeCategory);
    formData.append("workerType", workerType);
    formData.append("startDate", startDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("shiftName", shiftName);

    // Formatting weekend days (e.g. MO, TU)
    const formattedDays = selectedDays.map((d) => d.toUpperCase()).join(",");
    formData.append("weekendDays", formattedDays);
    formData.append("workEmail", workEmail);
    formData.append("phoneNumber", phoneNumber);
    if (homeAddress) formData.append("homeAddress", homeAddress);
    formData.append("emergencyContactName", emergencyContactName);
    formData.append("emergencyContactPhoneNumber", emergencyContactPhone);
    formData.append("isCompleted", isCompleted.toString());
    formData.append("leaveBalance", leaveBalance);

    mutate(formData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[480px] bg-white p-6 overflow-y-auto custom-scrollbar border-l border-slate-200">
        {/* Title */}
        <SheetHeader className="p-0 text-left pb-4 border-b border-slate-100">
          <SheetTitle className="text-lg font-bold text-[#0F172A]">
            Edit Team Member
          </SheetTitle>
          <div className="pt-2">
            <span className="text-xs font-bold text-[#0F172A] border-b-2 border-[#0F172A] pb-1 inline-block">
              General Info
            </span>
          </div>
        </SheetHeader>

        {/* Form Body */}
        <div className="space-y-4 pt-4 text-left">
          {/* Upload Photo Dropzone */}
          <div
            className="border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer relative"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative h-20 w-20 rounded-full overflow-hidden border border-slate-300">
                <Image
                  src={photoPreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full border border-slate-300 flex items-center justify-center bg-white text-slate-600">
                <Camera className="h-5 w-5" />
              </div>
            )}
            <div className="text-center">
              <p className="text-xs font-bold text-[#0F172A]">
                {photoPreview ? "Change Photo" : "Upload Client Photo"}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                PNG, JPG supported · Max 5MB
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jonathan Smith"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Job Title */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Fiber Support Lead"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Department */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Department <span className="text-red-500">*</span>
            </Label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="">Select Department</option>
              {departmentsData?.map((dept: Department) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Category & Worker Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                Category <span className="text-red-500">*</span>
              </Label>
              <select
                value={employeeCategory}
                onChange={(e) => setEmployeeCategory(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="ENGINEER">Engineer</option>
                <option value="WORKER">Worker</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                Worker Type <span className="text-red-500">*</span>
              </Label>
              <select
                value={workerType}
                onChange={(e) => setWorkerType(e.target.value)}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="Field Engineer">Field Engineer</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Office Staff">Office Staff</option>
              </select>
            </div>
          </div>

          {/* Start Date */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Start Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Start Time & End Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-white border-slate-200 h-10 rounded-xl text-xs pr-8"
                />
                <Clock className="h-4 w-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">
                End Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-white border-slate-200 h-10 rounded-xl text-xs pr-8"
                />
                <Clock className="h-4 w-4 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Shift Name */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Shift Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={shiftName}
              onChange={(e) => setShiftName(e.target.value)}
              placeholder="Enter the shift name"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Weekend Day Picker */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Weekend Day <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center justify-between gap-1">
              {days.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`flex-1 h-9 rounded-xl text-xs font-bold transition-colors border ${
                      isSelected
                        ? "bg-[#38BDF8] text-white border-[#38BDF8]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leave Balance */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Leave Balance
            </Label>
            <Input
              type="number"
              value={leaveBalance}
              onChange={(e) => setLeaveBalance(e.target.value)}
              placeholder="e.g. 10"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              min="0"
            />
          </div>

          {/* Work Email */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Work Email <span className="text-red-500">*</span>
            </Label>
            <Input
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="name@fieldops.com"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+44 (0) 7000 000 000"
              className="bg-white border-slate-200 h-10 rounded-xl text-xs"
            />
          </div>

          {/* Home Address */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Home Address
            </Label>
            <Textarea
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              placeholder="Optional: Full home address"
              className="bg-white border-slate-200 rounded-xl text-xs min-h-[60px]"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">
              Emergency Contact <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="Name"
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
              <Input
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                placeholder="Phone Number"
                className="bg-white border-slate-200 h-10 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Documents Upload Section */}
          <div className="pt-4 space-y-3">
            <Label className="text-sm font-bold text-[#0F172A]">Documents</Label>
            <div
              className="border-2 border-dashed border-slate-300/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => docInputRef.current?.click()}
            >
              <input
                type="file"
                ref={docInputRef}
                onChange={handleDocumentsChange}
                accept="application/pdf, image/png, image/jpeg"
                multiple
                className="hidden"
              />
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-2">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-[#0F172A]">
                Drag & drop files here, or click to browse
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5 mb-3">
                PDF, PNG, JPG up to 25MB
              </p>
              <Button type="button" variant="outline" size="sm" className="h-8 text-xs font-bold rounded-lg border-slate-300 px-4">
                Select Files
              </Button>
            </div>

            {/* Selected Documents List */}
            {documents.length > 0 && (
              <div className="space-y-2 mt-4">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-xs"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                        <FileIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0F172A] truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Onboarding Status */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-bold text-[#0F172A]">Complete Onboarding</Label>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Mark as completed to promote from onboarding to a permanent employee.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-6 mt-4 border-t border-slate-100">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border-slate-300 rounded-xl font-bold text-xs h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-[#0B132B] hover:bg-slate-900 text-white rounded-xl font-bold text-xs h-10"
          >
            {isPending ? "Updating..." : "Update Employee"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
