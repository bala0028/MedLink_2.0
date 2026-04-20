"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";

const APPOINTMENTS = [
  { name: "Zaina Riddle", status: "First visit", date: "May 23", time: "5:00 PM", payment: "Paid", img: "1" },
  { name: "Jakub Tucker", status: "Follow-up", date: "May 23", time: "6:00 PM", payment: "Pending", img: "2" },
  { name: "Aleksander Craig", status: "First visit", date: "May 23", time: "7:00 PM", payment: "Pending", img: "3" },
  { name: "Brianna Sears", status: "Discharge summary", date: "May 24", time: "9:00 AM", payment: "Paid", img: "4" },
  { name: "Rory Todd", status: "First visit", date: "May 24", time: "10:00 AM", payment: "Paid", img: "5" },
];

export function AppointmentsDataTable() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
           <h3 className="font-black text-xl text-slate-800 tracking-tight">Recent Appointments</h3>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Patient Management / Detailed List</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors">
            Filter <ChevronDown className="w-3 h-3" />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all">
            <MoreHorizontal className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-4 px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Name</th>
              <th className="text-left py-4 px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="text-left py-4 px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Date</th>
              <th className="text-left py-4 px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Time</th>
              <th className="text-right py-4 px-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Payment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {APPOINTMENTS.map((apt, i) => (
              <tr key={i} className="group hover:bg-slate-50/80 transition-all duration-300">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md ring-1 ring-slate-100 transition-transform group-hover:scale-110 duration-500">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${apt.img}`} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{apt.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-bold text-[#191c1e] group-hover:text-blue-600 transition-colors">{apt.name}</span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <StatusPill status={apt.status} />
                </td>
                <td className="py-4 px-2 text-sm font-bold text-slate-500">{apt.date}</td>
                <td className="py-4 px-2 text-sm font-bold text-slate-500">{apt.time}</td>
                <td className="py-4 px-2 text-right">
                  <div className={`inline-flex items-center gap-2 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border ${apt.payment === 'Paid' ? 'text-emerald-600 bg-emerald-50 border-emerald-100 shadow-sm shadow-emerald-500/10' : 'text-slate-400 bg-slate-50 border-slate-100'}`}>
                    {apt.payment === 'Paid' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5 opacity-50" />}
                    {apt.payment}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'First visit': 'bg-blue-50 text-blue-600 border-blue-100 shadow-sm shadow-blue-500/5',
    'Follow-up': 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-500/5',
    'Discharge summary': 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-500/5',
  };

  return (
    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all hover:scale-105 cursor-default ${styles[status]}`}>
      {status}
    </span>
  );
}
