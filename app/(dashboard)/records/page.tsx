import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Activity, Heart, Brain } from "lucide-react";

export default function MedicalRecordsPage() {
  const records = [
    { title: "Complete Blood Count", date: "Aug 10, 2026", type: "Lab Report", icon: Activity, size: "1.2 MB", doctor: "LabCorp" },
    { title: "ECG Summary", date: "Jul 22, 2026", type: "Test Result", icon: Heart, size: "850 KB", doctor: "Dr. Sarah Jenkins" },
    { title: "MRI Brain Scan Analysis", date: "Jan 15, 2026", type: "Imaging", icon: Brain, size: "4.5 MB", doctor: "Dr. Emily Chen" },
    { title: "Annual Physical Evaluation", date: "Dec 05, 2025", type: "Clinical Note", icon: FileText, size: "2.1 MB", doctor: "Dr. Michael Scott" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
          <p className="text-muted-foreground">Securely access and manage your medical history.</p>
        </div>
        <Button className="shadow-lg shadow-primary/25">
          <Upload className="mr-2 h-4 w-4" /> Upload Record
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record, i) => (
          <Card key={i} className="border-border/50 hover:shadow-md transition-shadow group flex flex-col justify-between h-full">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-xl group-hover:scale-110 transition-transform">
                  <record.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {record.type}
                </span>
              </div>
              <CardTitle className="text-lg mt-4 leading-tight">{record.title}</CardTitle>
              <CardDescription>
                Added by {record.doctor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-border/50">
                <span className="text-muted-foreground">{record.date}</span>
                <span className="font-mono text-xs font-semibold">{record.size}</span>
              </div>
              <Button variant="secondary" className="w-full mt-4 bg-muted hover:bg-primary hover:text-primary-foreground">
                View Document
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
