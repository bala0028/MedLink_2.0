import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface EventData {
  id: string;
  title: string;
  startTime: string; // e.g., "09:20"
  endTime: string;   // e.g., "10:30"
  displayTime: string; // e.g., "9.20 AM - 10.30 AM"
  colorTheme: 'green' | 'purple' | 'blue';
  dayIndex: number; // 0 for Monday, 1 for Tuesday
  guests?: string[];
  _rawDate: Date;
}

interface EventCardProps {
  event: EventData;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function EventCard({ event, style, className, onClick }: EventCardProps) {
  // Map color themes to specific pastel backgrounds and dark borders
  const themeStyles = {
    green: "bg-[#ecfccb] border-[#d9f99d] text-slate-800",
    purple: "bg-[#f3e8ff] border-[#e9d5ff] text-slate-800",
    blue: "bg-[#e0e7ff] border-[#c7d2fe] text-slate-800",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute w-full rounded-xl p-3 border cursor-pointer hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden",
        themeStyles[event.colorTheme],
        className
      )}
      style={style}
    >
      <div>
        <h4 className="font-semibold text-sm leading-tight text-[#191c1e]">{event.title}</h4>
        <p className="text-xs font-medium text-slate-500 mt-1">{event.displayTime}</p>
      </div>
      
      {event.guests && event.guests.length > 0 && (
        <div className="flex -space-x-2 mt-2">
          {event.guests.slice(0, 3).map((guest, i) => (
            <Avatar key={i} className="w-6 h-6 border-2 border-white">
              <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${guest}`} />
              <AvatarFallback className="text-[10px]">{guest.substring(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
          {event.guests.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 z-10">
              +{event.guests.length - 3}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
