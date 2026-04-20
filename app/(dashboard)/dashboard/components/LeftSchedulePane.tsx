"use client";

import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const PATIENTS = [
  { name: "Zaina Riddle", symptom: "Headache", time: "10:30", status: "completed", img: "1" },
  { name: "Jakub Tucker", symptom: "Runny nose", time: "10:30", status: "pending", img: "2" },
  { name: "Aleksander Craig", symptom: "Cold", time: "11:30", status: "pending", img: "3" },
  { name: "Brianna Sears", symptom: "Flu", time: "12:00", status: "pending", img: "4" },
  { name: "Rory Todd", symptom: "Stomach-ache", time: "12:15", status: "pending", img: "5" },
  { name: "Mariyah Mcmahon", symptom: "Runny nose", time: "12:30", status: "pending", img: "6" },
  { name: "Austin Camacho", symptom: "Headache", time: "12:55", status: "pending", img: "7" },
];

export function LeftSchedulePane() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-[320px] bg-[#1c1f21] text-white flex flex-col h-full overflow-hidden shrink-0 rounded-[2.5rem] my-2 ml-2">
      {/* Mini Calendar Section */}
      <div className="p-6">
        <div className="bg-white rounded-[2rem] p-4 text-black">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-lg">My Schedule</h3>
            <div className="flex gap-1">
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none p-0"
            classNames={{
              day_selected: "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-xl",
              day_today: "bg-slate-100 text-slate-900 rounded-xl",
              head_cell: "text-slate-400 font-medium text-[10px] uppercase tracking-tighter",
              cell: "text-center text-sm p-0 overflow-visible",
              day: "h-9 w-9 p-0 font-bold hover:bg-slate-100 rounded-xl transition-all",
            }}
          />
        </div>
      </div>

      {/* Patient Count Stat */}
      <div className="px-6 mb-6">
        <div className="bg-[#2a2d30] rounded-[1.5rem] p-4 flex items-center justify-between hover:bg-[#33373b] transition-colors cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-400">19</span>
            <span className="text-sm text-slate-300 font-medium tracking-tight">Patients today</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1c1f21] flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Patients List Timeline */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
        <div className="relative space-y-6 pt-2">
          {/* Vertical Line */}
          <div className="absolute left-[20px] top-4 bottom-4 w-[1px] bg-slate-800"></div>

          {PATIENTS.map((patient, i) => (
            <div key={i} className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-[#1c1f21] ring-1 ring-slate-800 shadow-xl shrink-0">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${patient.img}`} />
                  <AvatarFallback className="bg-slate-700 text-white text-xs">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {patient.status === 'completed' && (
                  <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-0.5 border-2 border-[#1c1f21]">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate text-slate-100 leading-tight">{patient.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium">{patient.symptom}</p>
              </div>

              <div className="text-[11px] font-bold text-slate-600 shrink-0">
                {patient.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2a2d30;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
