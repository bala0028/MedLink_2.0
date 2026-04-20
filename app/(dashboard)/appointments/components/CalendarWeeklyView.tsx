"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventCard, EventData } from "./EventCard";
import { EventModal } from "./EventModal";
import { format, startOfWeek, addDays, isSameDay, differenceInMinutes, startOfMonth, endOfMonth, getDaysInMonth, isToday } from 'date-fns';
import { useRouter } from 'next/navigation';

const HOURS = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];
const HOUR_HEIGHT = 120; // 120px per hour row
const START_HOUR = 8; // 8 AM
const END_HOUR = 17; // 5 PM (17:00)

export type AppointmentProps = {
  id: string;
  title: string | null;
  date: Date | string;
  endTime: Date | string | null;
  colorTheme: string | null;
  [key: string]: unknown;
};

export function CalendarWeeklyView({ initialAppointments }: { initialAppointments: AppointmentProps[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'Day'|'Week'|'Month'>('Week');
  const [baseDate, setBaseDate] = useState(new Date());
  const [now, setNow] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Update real-time indicator every minute
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Map Backend Data Context
  const events: EventData[] = initialAppointments.map((apt: AppointmentProps) => {
    const startDate = new Date(apt.date);
    const endDate = apt.endTime ? new Date(apt.endTime) : new Date(startDate.getTime() + 60 * 60 * 1000); // Default +1 hour
    return {
      id: apt.id,
      title: apt.title || "Untitled Appointment",
      startTime: format(startDate, 'HH:mm'),
      endTime: format(endDate, 'HH:mm'),
      displayTime: `${format(startDate, 'h.mm a')} - ${format(endDate, 'h.mm a')}`,
      colorTheme: (apt.colorTheme as 'green' | 'purple' | 'blue') || 'blue',
      dayIndex: startDate.getDay(), // Provided to satisfy the EventData interface
      _rawDate: startDate,
      guests: [] // Future extension
    };
  }).filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Setup column dates depending on View Mode
  const getDaysArray = () => {
    if (viewMode === 'Day') return [baseDate];
    if (viewMode === 'Month') return []; // Handled separately
    
    // Week Mode
    const start = startOfWeek(baseDate, { weekStartsOn: 1 }); // Monday start
    return Array.from({ length: 7 }).map((_, i) => addDays(start, i)); // Show Mon-Sun
  };

  const days = getDaysArray();

  // Positioning Mechanics
  const timeToPixels = (dt: Date | string) => {
    let hours = 0, minutes = 0;
    if (typeof dt === 'string') {
      [hours, minutes] = dt.split(':').map(Number);
    } else {
      hours = dt.getHours();
      minutes = dt.getMinutes();
    }
    
    if (hours < START_HOUR) return 0;
    if (hours > END_HOUR) return (END_HOUR - START_HOUR + 1) * HOUR_HEIGHT;
    
    const fraction = minutes / 60;
    return ((hours - START_HOUR) + fraction) * HOUR_HEIGHT;
  };

  const calculateHeight = (start: string, end: string) => {
    return Math.max(timeToPixels(end) - timeToPixels(start), 30); // minimum 30px height
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] font-sans">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search appointments.." 
              className="pl-9 h-10 bg-slate-50 border-slate-200 rounded-lg focus-visible:ring-blue-500/20"
            />
          </div>
          <Button variant="outline" className="h-10 border-slate-200 text-slate-600 font-semibold gap-2 shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </Button>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 shadow-md">
            <Plus className="w-4 h-4 mr-2" /> Add Event
          </Button>

          <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
            {(['Day', 'Week', 'Month'] as const).map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${viewMode === mode ? 'font-bold text-[#191c1e] bg-white shadow-sm' : 'font-semibold text-slate-500 hover:text-slate-800'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="flex-1 overflow-auto p-2 md:p-6 pb-12">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col min-w-[800px] relative">
          
          {/* Header Row */}
          <div className="flex border-b border-slate-200 bg-white z-20 sticky top-0">
            <div className="w-24 shrink-0 border-r border-slate-200 flex flex-col items-center justify-center p-2 bg-slate-50">
              <span className="font-bold text-xs text-slate-500 tracking-wide uppercase">Timezone</span>
              <span className="font-bold text-sm text-slate-800 tracking-wide">IST</span>
            </div>
            
            {viewMode !== 'Month' ? (
              days.map((day, idx) => {
                const isActive = isToday(day);
                return (
                  <div key={idx} className="flex-1 border-r last:border-r-0 border-slate-200 flex items-center justify-center py-4 bg-white">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`font-bold text-xs tracking-widest uppercase ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                        {format(day, 'MMM')} {format(day, 'EEEEEE')}
                      </span>
                      <span className={`text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full ${isActive ? 'bg-blue-600 text-white' : 'text-slate-800'}`}>
                        {format(day, 'dd')}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center py-4 text-xl font-bold">
                {format(baseDate, 'MMMM yyyy')}
              </div>
            )}
          </div>

          {/* Body Section */}
          <div className="flex flex-1 relative bg-white min-h-[600px]">
             {/* Mock Add Event Modal Overlay */}
             {showModal && (
               <EventModal 
                 initialDateStr={format(baseDate, 'yyyy-MM-dd')}
                 onClose={() => setShowModal(false)} 
                 onSuccess={() => { setShowModal(false); router.refresh(); }} 
               />
             )}

            {viewMode === 'Month' ? (
              <div className="flex-1 flex items-center justify-center text-slate-400 p-12">
                Month view grid is currently disabled. Toggle to Week or Day view to see events plotting accurately.
              </div>
            ) : (
              <>
                {/* Time Axis */}
                <div className="w-24 shrink-0 border-r border-slate-200 flex flex-col bg-white z-10">
                  {HOURS.map((hour, idx) => (
                    <div key={idx} className="border-b border-slate-200 flex items-start justify-center relative bg-white z-10" style={{ height: HOUR_HEIGHT }}>
                      <span className="text-xs font-semibold text-slate-500 mt-2">{hour}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Cells */}
                <div className="flex flex-1 relative bg-slate-50/30">
                  
                  {/* Current Time Line (Only plotted if current time is within view bounds) */}
                  {now.getHours() >= START_HOUR && now.getHours() <= END_HOUR && (
                    <div 
                      className="absolute w-full flex items-center z-30 pointer-events-none" 
                      style={{ top: timeToPixels(now) - 10 }}
                    >
                      <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-1 overflow-hidden whitespace-nowrap rounded-l-none rounded-r-full absolute -left-24 w-24 flex items-center justify-center border-y border-r border-red-200 shadow-sm z-30">
                        {format(now, 'h:mm a')}
                      </span>
                      <div className="w-full h-[2px] bg-red-400 relative">
                          <div className="absolute -left-1.5 -top-[5px] w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm"></div>
                      </div>
                    </div>
                  )}

                  {days.map((day, dayIdx) => (
                    <div key={dayIdx} className="flex-1 border-r last:border-r-0 border-slate-200 relative min-h-full">
                      {/* Horizontal Grid Pattern */}
                      {HOURS.map((_, hIdx) => (
                        <div key={hIdx} className="border-b border-slate-100" style={{ height: HOUR_HEIGHT }}></div>
                      ))}

                      {/* Render Events for this Specific Day */}
                      {events.filter(e => isSameDay(e._rawDate, day)).map(event => (
                        <div 
                          key={event.id}
                          className="absolute px-2 w-full z-10"
                          style={{ 
                            top: timeToPixels(event.startTime) + 2,
                            height: calculateHeight(event.startTime, event.endTime) - 4
                          }}
                        >
                          <EventCard event={event} className="h-full" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
