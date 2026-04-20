import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Clock, Users, ChevronDown, Check } from "lucide-react";
import { createAppointmentAction } from '@/app/actions/appointments';

export function EventModal({ onClose, onSuccess, initialDateStr }: { onClose: () => void, onSuccess: () => void, initialDateStr?: string }) {
  const [title, setTitle] = useState('');
  const [colorTheme, setColorTheme] = useState('blue');
  const [startTime, setStartTime] = useState('09:20');
  const [endTime, setEndTime] = useState('10:20');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = [
    { id: 'green', hex: '#ecfccb' },
    { id: 'purple', hex: '#f3e8ff' },
    { id: 'blue', hex: '#e0e7ff' },
  ];

  const handleSave = async () => {
    if (!title.trim() || isSubmitting) return;
    setIsSubmitting(true);
    
    // Parse time to actual Date object
    const startParts = startTime.split(':');
    const endParts = endTime.split(':');
    
    // Default to today if no date, or parse initialDateStr when possible
    const date = new Date();
    date.setHours(parseInt(startParts[0], 10), parseInt(startParts[1], 10), 0, 0);
    
    const endDate = new Date();
    endDate.setHours(parseInt(endParts[0], 10), parseInt(endParts[1], 10), 0, 0);

    const res = await createAppointmentAction({
      title,
      date,
      endTime: endDate,
      colorTheme
    });

    setIsSubmitting(false);
    if (res.success) {
      onSuccess();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <Card className="absolute z-50 w-[340px] bg-white rounded-2xl shadow-2xl p-5 border-border/40 animate-in fade-in zoom-in-95" 
          style={{ top: '150px', left: '300px' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[#191c1e]">Add New Event</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 text-slate-500">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">Mark Schedule</label>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 justify-between h-10 border-slate-200 text-slate-500 font-normal px-3">
              <span className="flex items-center gap-2"><Users className="w-4 h-4"/> Add Guest</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
            <div className="flex items-center gap-2">
              {colors.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setColorTheme(c.id)}
                  className="w-5 h-5 rounded-full flex items-center justify-center border border-slate-200" 
                  style={{ backgroundColor: c.hex }}
                >
                  {colorTheme === c.id && <Check className="w-3 h-3 text-slate-800" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">New Event</label>
          <Input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Discuss with Selena" 
            className="h-10 border-slate-200 focus-visible:ring-blue-500/20" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500">Date & Time</label>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-slate-200 bg-white">
              <span className="text-sm">Wed, August 10</span>
            </div>
            <div className="flex items-center divide-x divide-slate-200 bg-white">
              <div className="flex-1 flex items-center justify-between px-3 py-2">
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-6 w-24 p-0 border-0 focus-visible:ring-0 text-sm font-medium shadow-none outline-none" />
              </div>
              <div className="px-2 text-slate-400">-</div>
              <div className="flex-1 flex items-center justify-between px-3 py-2">
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="h-6 w-24 p-0 border-0 focus-visible:ring-0 text-sm font-medium shadow-none outline-none text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span className="text-sm font-medium">Weekly</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClose} disabled={isSubmitting} className="h-9 font-medium text-slate-600">Cancel</Button>
            <Button onClick={handleSave} disabled={isSubmitting} className="h-9 bg-blue-600 hover:bg-blue-700 font-medium px-6 shadow-md shadow-blue-600/20">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
