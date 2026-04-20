import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, CalendarCheck, FileText, Activity } from "lucide-react";

export function StatsCards() {
  const stats = [
    { title: "Total Patients", value: "1,248", change: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Appointments", value: "42", change: "+4%", icon: CalendarCheck, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Consultations", value: "89", change: "+10%", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
    { title: "Reports", value: "312", change: "+2%", icon: FileText, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow group border-border/50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">{stat.change}</span>
              <span className="text-muted-foreground ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
