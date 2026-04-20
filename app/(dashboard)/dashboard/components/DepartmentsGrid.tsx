import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Eye, Bone, Stethoscope, Baby } from "lucide-react";

export function DepartmentsGrid() {
  const departments = [
    { name: "Cardiology", icon: Heart, count: 24, color: "text-red-500", bg: "bg-red-500/10" },
    { name: "Neurology", icon: Brain, count: 18, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Orthopedics", icon: Bone, count: 12, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Ophthalmology", icon: Eye, count: 8, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Pediatrics", icon: Baby, count: 15, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "General", icon: Stethoscope, count: 42, color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Departments</h3>
        <a href="#" className="text-sm font-medium text-primary hover:underline">View All</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {departments.map((dept, i) => (
          <Card key={i} className="hover:border-primary/50 cursor-pointer transition-colors group">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
              <div className={`p-4 rounded-2xl ${dept.bg} group-hover:-translate-y-1 transition-transform duration-300`}>
                <dept.icon className={`h-6 w-6 ${dept.color}`} />
              </div>
              <div>
                <p className="font-semibold text-sm">{dept.name}</p>
                <p className="text-xs text-muted-foreground">{dept.count} Doctors</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
