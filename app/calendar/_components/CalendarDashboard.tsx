"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { NewAssignmentModal } from "./NewAssignmentModal";

const statCards = [
  { value: "10", title: "MEETINGS THIS MONTH", subtitle: "Scheduled across all teams", border: "border-t-[#48BB78]", text: "text-[#48BB78]" },
  { value: "15", title: "TODAY'S ASSIGNMENTS", subtitle: "Active workforce tasks", border: "border-t-[#0088CC]", text: "text-[#0088CC]" },
  { value: "321", title: "PENDING APPROVALS", subtitle: "Waiting on supervisor review", border: "border-t-[#ECC94B]", text: "text-[#ECC94B]" },
  { value: "10", title: "LEAVE REQUESTS", subtitle: "Awaiting HR decision", border: "border-t-[#3182CE]", text: "text-[#3182CE]" },
];

export default function CalendarDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="w-full p-6 space-y-6 bg-[#FAF9F5] min-h-screen">
      
      {/* Top Bar: Category Pill Filters & CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/80 rounded-xl shadow-xs">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeFilter === "All" ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All
          </button>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Team
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Customer
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">
            <span className="h-2 w-2 rounded-full bg-amber-600" />
            Site
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 rounded-lg">
            <span className="h-2 w-2 rounded-full bg-teal-500" />
            Contractor
          </button>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-sm"
        >
          Get New Assignment Started
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <Card key={idx} className={`bg-white rounded-2xl border-0 border-t-[5px] shadow-xs ${card.border}`}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-extrabold ${card.text}`}>{card.value}</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mt-2">{card.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid: Mini Left Sidebar Calendar/Tasks + Main Right Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Widget Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Mini Month Picker */}
          <Card className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-400 font-medium">Date & Time</span>
              <span className="text-sm font-bold text-[#0F172A]">Jul 2026</span>
            </div>
            
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center mt-3 text-[10px] font-bold text-slate-400">
              <span>Mon</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
            </div>
            
            {/* Dates Matrix */}
            <div className="grid grid-cols-7 gap-1 text-center mt-2 text-xs font-medium">
              <span className="text-slate-300">26</span><span className="text-slate-300">27</span><span className="text-slate-300">28</span><span className="text-slate-300">29</span><span className="text-slate-300">30</span>
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
              <span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
              <span className="bg-[#0F172A] text-white font-bold rounded-lg py-1">21</span>
              <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
            </div>
          </Card>

          {/* Tasks Widget Box */}
          <Card className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-4 space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A]">TASKS (5)</h4>
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1">
              <span className="bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full">All</span>
              <span className="border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">Today</span>
              <span className="border border-slate-200 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full">Upcoming</span>
            </div>

            {/* Task Item Cards */}
            <div className="space-y-2 pt-1">
              <div className="p-3 border border-slate-100 rounded-xl flex items-start gap-3 bg-white">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <CalendarIcon className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-[#0F172A] truncate">Site Safety Review</h5>
                  <p className="text-[11px] text-slate-500">CityFibre • Manchester</p>
                  <span className="text-[10px] text-slate-400">Jul 20, 10:00 AM · Team</span>
                </div>
                <span className="bg-amber-100/60 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-300">Today</span>
              </div>

              <div className="p-3 border border-slate-100 rounded-xl flex items-start gap-3 bg-white">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <CalendarIcon className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-[#0F172A] truncate">Site Safety Review</h5>
                  <p className="text-[11px] text-slate-500">CityFibre • Manchester</p>
                  <span className="text-[10px] text-slate-400">Jul 20, 10:00 AM · Team</span>
                </div>
                <span className="bg-emerald-100/60 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">Completed</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Main Calendar Grid */}
        <Card className="lg:col-span-9 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 space-y-4">
          
          {/* Calendar Navigation Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200">
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 text-xs font-bold rounded-full border-slate-200 px-4">
                Today
              </Button>
            </div>

            <h3 className="text-base font-bold text-[#0F172A]">July 2026</h3>

            <div className="flex items-center p-1 bg-slate-100 rounded-full">
              <span className="bg-[#0F172A] text-white text-xs font-bold px-3 py-1 rounded-full">Month</span>
              <span className="text-slate-600 text-xs font-medium px-3 py-1">Week</span>
              <span className="text-slate-600 text-xs font-medium px-3 py-1">Day</span>
            </div>
          </div>

          {/* Day Columns Header */}
          <div className="grid grid-cols-7 text-center border-b border-slate-100 pb-2 text-xs font-bold text-slate-500">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 border-l border-t border-slate-200 text-xs font-semibold">
            {/* Days Mock Grid */}
            <div className="h-24 p-2 border-r border-b border-slate-200 text-slate-300">29</div>
            <div className="h-24 p-2 border-r border-b border-slate-200 text-slate-300">30</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">1</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">2</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">3</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">4</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">5</div>

            <div className="h-24 p-2 border-r border-b border-slate-200">6</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">7</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">8</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">9</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">10</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">11</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">12</div>

            <div className="h-24 p-2 border-r border-b border-slate-200">13</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">14</div>
            {/* Day 15 with Pills */}
            <div className="h-24 p-1.5 border-r border-b border-slate-200 space-y-1">
              <span>15</span>
              <div className="bg-blue-100/70 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded-md">Customer</div>
              <div className="bg-amber-100/70 text-amber-700 text-[10px] font-medium px-1.5 py-0.5 rounded-md">Team</div>
            </div>
            <div className="h-24 p-2 border-r border-b border-slate-200">16</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">17</div>
            <div className="h-24 p-2 border-r border-b border-slate-200 bg-[#FEFDF2]">18</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">19</div>

            <div className="h-24 p-2 border-r border-b border-slate-200">20</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">21</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">22</div>
            {/* Day 23 with Pills */}
            <div className="h-24 p-1.5 border-r border-b border-slate-200 space-y-1">
              <span>23</span>
              <div className="bg-teal-100/70 text-teal-700 text-[10px] font-medium px-1.5 py-0.5 rounded-md">Contractor</div>
              <div className="bg-blue-100/70 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded-md">Customer</div>
            </div>
            <div className="h-24 p-2 border-r border-b border-slate-200">24</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">25</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">26</div>

            <div className="h-24 p-2 border-r border-b border-slate-200">27</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">28</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">29</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">30</div>
            <div className="h-24 p-2 border-r border-b border-slate-200">31</div>
            <div className="h-24 p-2 border-r border-b border-slate-200 text-slate-300">1</div>
            <div className="h-24 p-2 border-r border-b border-slate-200 text-slate-300">2</div>
          </div>
        </Card>
      </div>

      {/* Render Modal Component */}
      <NewAssignmentModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}