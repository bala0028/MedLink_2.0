import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RecentConsultations() {
  const consultations = [
    { id: "C-1029", patient: "Michael Scott", doctor: "Dr. Sarah Jenkins", date: "Oct 22, 2026", status: "Completed", type: "Video Call", image: "12" },
    { id: "C-1028", patient: "Pam Beesly", doctor: "Dr. Emily Chen", date: "Oct 21, 2026", status: "Prescribed", type: "In-Person", image: "5" },
    { id: "C-1027", patient: "Jim Halpert", doctor: "Dr. Robert Smith", date: "Oct 20, 2026", status: "Completed", type: "Video Call", image: "8" },
    { id: "C-1026", patient: "Dwight Schrute", doctor: "Dr. Sarah Jenkins", date: "Oct 19, 2026", status: "Follow-up", type: "In-Person", image: "3" },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recent Consultations</CardTitle>
        <Button variant="outline" size="sm" className="hidden sm:flex text-xs h-8">
          <FileText className="mr-2 h-3.5 w-3.5" />
          Export Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((consultation) => (
              <TableRow key={consultation.id} className="border-border/50">
                <TableCell className="font-medium text-xs text-muted-foreground">{consultation.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={`https://i.pravatar.cc/150?img=${consultation.image}`} />
                      <AvatarFallback>{consultation.patient.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{consultation.patient}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{consultation.doctor}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{consultation.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {consultation.type === "Video Call" ? (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                    )}
                    {consultation.type}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    consultation.status === "Completed" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                    consultation.status === "Prescribed" ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" :
                    "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                  }>
                    {consultation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <CopyPlus className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
