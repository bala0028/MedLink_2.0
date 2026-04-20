"use client";

import { DashboardCharts } from "./components/DashboardCharts";
import { AppointmentsDataTable } from "./components/AppointmentsDataTable";
import { Search, Bell, Calendar as CalendarIcon, ChevronRight, Share2, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-[#f9fafb] overflow-hidden relative">
      <div className="flex-1 flex flex-col h-full overflow-y-auto px-4 py-4 custom-scrollbar relative z-10">
        
        {/* Allex Theme Header */}
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-[#191c1e] tracking-tight">Hello Doctor!!</h1>
              <span className="text-3xl">👋</span>
           </div>
           
           <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm hover:border-slate-300 transition-all">
                <CalendarIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-bold text-slate-700">Days</span>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
              </button>
              
              <button className="flex items-center gap-2 bg-[#191c1e] text-white rounded-xl px-5 py-2 hover:bg-black transition-all shadow-lg shadow-black/10">
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-bold">Export</span>
              </button>
           </div>
        </div>

        <div className="space-y-4">
          <DashboardCharts />
          <AppointmentsDataTable />
        </div>

        <div className="h-10 shrink-0"></div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}

