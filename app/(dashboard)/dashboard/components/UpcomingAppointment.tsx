import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";

export function UpcomingAppointment() {
  return (
    <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Upcoming Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary ring-4 ring-primary/10">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg font-bold">Dr. Emily Chen</h4>
              <p className="text-sm text-muted-foreground">Neurologist • General Hospital</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 items-center bg-background/50 backdrop-blur rounded-2xl p-4 border border-border/50 flex-1 md:flex-none">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium">Date</span>
                <span className="text-sm font-semibold">Oct 24, 2026</span>
              </div>
            </div>
            <div className="w-px h-8 bg-border hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium">Time</span>
                <span className="text-sm font-semibold">10:30 AM</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">Reschedule</Button>
            <Button className="flex-1 md:flex-none flex items-center gap-2 shadow-lg shadow-primary/25">
              <Video className="h-4 w-4" />
              Join Video Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
