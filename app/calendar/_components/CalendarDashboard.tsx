"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewAssignmentModal } from "./NewAssignmentModal";
import { authenticatedFetch } from "@/lib/api";

type CalendarView = "month" | "week" | "day";
type Assignment = {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  projectId?: { _id: string; name: string } | null;
  location: { address: string; latitude: number; longitude: number };
};

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});
const filters = ["All", "Team", "Customer", "Site", "Contractor"];
const statCards = [
  {
    value: "10",
    title: "MEETINGS THIS MONTH",
    subtitle: "Scheduled across all teams",
    border: "border-t-[#48BB78]",
    text: "text-[#48BB78]",
  },
  {
    value: "15",
    title: "TODAY'S ASSIGNMENTS",
    subtitle: "Active workforce tasks",
    border: "border-t-[#0088CC]",
    text: "text-[#0088CC]",
  },
  {
    value: "321",
    title: "PENDING APPROVALS",
    subtitle: "Waiting on supervisor review",
    border: "border-t-[#ECC94B]",
    text: "text-[#ECC94B]",
  },
  {
    value: "10",
    title: "LEAVE REQUESTS",
    subtitle: "Awaiting HR decision",
    border: "border-t-[#3182CE]",
    text: "text-[#3182CE]",
  },
];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function monday(date: Date) {
  const day = date.getDay() || 7;
  return addDays(startOfDay(date), 1 - day);
}

function assignmentOccursOn(assignment: Assignment, date: Date) {
  const from = startOfDay(new Date(assignment.startDate));
  const to = startOfDay(new Date(assignment.endDate));
  return date >= from && date <= to;
}

export default function CalendarDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(() => startOfDay(new Date()));

  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "whereabouts-calendar",
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ],
    queryFn: async (): Promise<Assignment[]> => {
      const params = new URLSearchParams({
        month: String(currentDate.getMonth() + 1),
        year: String(currentDate.getFullYear()),
      });
      const response = await authenticatedFetch(
        `/whereabouts/calendar?${params}`,
      );
      if (!response.ok) throw new Error("Failed to load assignments");
      const result = await response.json();
      return result.data ?? [];
    },
  });

  const visibleDays = useMemo(() => {
    if (view === "day") return [currentDate];
    if (view === "week")
      return Array.from({ length: 7 }, (_, index) =>
        addDays(monday(currentDate), index),
      );
    const first = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const last = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const start = monday(first);
    const end = addDays(monday(last), 6);
    const days: Date[] = [];
    for (let date = start; date <= end; date = addDays(date, 1))
      days.push(date);
    return days;
  }, [currentDate, view]);

  const miniCalendarDays = useMemo(() => {
    const first = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const last = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );
    const dates: Date[] = [];
    for (
      let date = monday(first);
      date <= addDays(monday(last), 6);
      date = addDays(date, 1)
    )
      dates.push(date);
    return dates;
  }, [currentDate]);

  function move(direction: -1 | 1) {
    if (view === "month")
      setCurrentDate(
        (date) => new Date(date.getFullYear(), date.getMonth() + direction, 1),
      );
    else if (view === "week")
      setCurrentDate((date) => addDays(date, direction * 7));
    else setCurrentDate((date) => addDays(date, direction));
  }

  const heading =
    view === "month"
      ? monthFormatter.format(currentDate)
      : view === "week"
        ? `Week of ${monday(currentDate).toLocaleDateString()}`
        : currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          });

  return (
    <div className="min-h-screen w-full space-y-6 bg-[#FAF9F5] p-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white p-1 shadow-xs">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${activeFilter === filter ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="h-10 rounded-xl bg-[#0F172A] px-6 text-xs font-bold text-white hover:bg-slate-800"
        >
          Get New Assignment Started
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card
            key={card.title}
            className={`rounded-2xl border-0 border-t-[5px] bg-white shadow-xs ${card.border}`}
          >
            <CardContent className="flex flex-col items-center justify-center p-4 text-center">
              <span className={`text-3xl font-extrabold ${card.text}`}>
                {card.value}
              </span>
              <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                {card.title}
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-400">
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <Card className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-medium text-slate-400">
                Date & Time
              </span>
              <span className="text-sm font-bold text-[#0F172A]">
                {monthFormatter.format(currentDate)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
              {dayNames.map((name) => (
                <span key={name}>{name.slice(0, 2)}</span>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-1">
              {miniCalendarDays.map((date) => {
                const selected =
                  date.toDateString() === currentDate.toDateString();
                const outside = date.getMonth() !== currentDate.getMonth();
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => {
                      setCurrentDate(date);
                      setView("day");
                    }}
                    className={`rounded-lg py-1 text-xs font-medium ${selected ? "bg-[#0F172A] text-white" : outside ? "text-slate-300" : "text-slate-700 hover:bg-slate-100"}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </Card>
        </aside>
        <Card className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs lg:col-span-9 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                aria-label="Previous period"
                onClick={() => move(-1)}
                className="h-8 w-8 rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Next period"
                onClick={() => move(1)}
                className="h-8 w-8 rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(startOfDay(new Date()))}
                className="h-8 rounded-full px-4 text-xs font-bold"
              >
                Today
              </Button>
            </div>
            <h1 className="text-base font-bold text-slate-900">{heading}</h1>
            <div className="flex w-fit rounded-full bg-slate-100 p-1">
              {(["month", "week", "day"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setView(option)}
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${view === option ? "bg-[#0F172A] text-white" : "text-slate-600"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {isLoading ? (
            <p className="py-12 text-center text-sm text-slate-500">
              Loading assignments…
            </p>
          ) : isError ? (
            <p className="py-12 text-center text-sm text-red-600">
              Could not load calendar assignments.
            </p>
          ) : (
            <>
              {view !== "day" && (
                <div
                  className={`grid ${view === "month" ? "grid-cols-7" : "grid-cols-7"} border-b border-slate-100 pb-2 text-center text-xs font-bold text-slate-500`}
                >
                  {dayNames.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
              )}
              <div
                className={
                  view === "month"
                    ? "grid grid-cols-7 border-l border-t border-slate-200"
                    : view === "week"
                      ? "grid grid-cols-7 border-l border-t border-slate-200"
                      : "space-y-3"
                }
              >
                {visibleDays.map((date) => {
                  const dayAssignments = assignments.filter((assignment) =>
                    assignmentOccursOn(assignment, date),
                  );
                  const outsideMonth =
                    view === "month" &&
                    date.getMonth() !== currentDate.getMonth();
                  if (view === "day")
                    return (
                      <div
                        key={date.toISOString()}
                        className="space-y-3 rounded-xl border border-slate-200 p-4"
                      >
                        <p className="font-bold text-slate-900">{heading}</p>
                        {dayAssignments.length ? (
                          dayAssignments.map((assignment) => (
                            <AssignmentCard
                              key={assignment._id}
                              assignment={assignment}
                            />
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">
                            No assignments for this day.
                          </p>
                        )}
                      </div>
                    );
                  return (
                    <div
                      key={date.toISOString()}
                      className={`min-h-28 border-b border-r border-slate-200 p-1.5 ${outsideMonth ? "bg-slate-50 text-slate-400" : ""}`}
                    >
                      <span className="text-xs font-semibold">
                        {date.getDate()}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayAssignments.slice(0, 2).map((assignment) => (
                          <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            compact
                          />
                        ))}
                        {dayAssignments.length > 2 && (
                          <p className="text-[10px] text-slate-500">
                            +{dayAssignments.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      </div>
      <NewAssignmentModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}

function AssignmentCard({
  assignment,
  compact = false,
}: {
  assignment: Assignment;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-md bg-blue-100/70 text-blue-800 ${compact ? "truncate px-1.5 py-1 text-[10px]" : "p-3 text-sm"}`}
      title={`${assignment.title} · ${assignment.projectId?.name ?? "No project"} · ${assignment.location.address}`}
    >
      <p className="font-bold">{assignment.title}</p>
      {!compact && (
        <p className="mt-1 text-xs">
          {assignment.projectId?.name ?? "No project"} ·{" "}
          {assignment.location.address}
        </p>
      )}
    </div>
  );
}
