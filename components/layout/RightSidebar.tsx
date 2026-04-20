import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeartPulse, Activity, Flame, Droplets } from "lucide-react";

export function RightSidebar() {
  return (
    <aside className="w-80 hidden xl:flex flex-col border-l border-border/50 bg-background/50 backdrop-blur-sm p-6 overflow-y-auto min-h-screen custom-scrollbar">
      <div className="flex flex-col gap-8">
        
        {/* Health Summary */}
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-primary" />
            Health Summary
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-primary/5 border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                <Activity className="h-5 w-5 text-blue-500 mb-1" />
                <span className="text-xl font-bold">120/80</span>
                <span className="text-xs text-muted-foreground">Blood Pressure</span>
              </CardContent>
            </Card>
            <Card className="bg-destructive/5 border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                <Flame className="h-5 w-5 text-destructive mb-1" />
                <span className="text-xl font-bold">78</span>
                <span className="text-xs text-muted-foreground">Heart Rate (bpm)</span>
              </CardContent>
            </Card>
            <Card className="bg-orange-500/5 border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                <Droplets className="h-5 w-5 text-orange-500 mb-1" />
                <span className="text-xl font-bold">98</span>
                <span className="text-xs text-muted-foreground">Glucose (mg/dL)</span>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
                <Activity className="h-5 w-5 text-green-500 mb-1" />
                <span className="text-xl font-bold">22.5</span>
                <span className="text-xs text-muted-foreground">BMI</span>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Doctors */}
        <div>
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            Popular Doctors
          </h3>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-border/50">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">Dr. Sarah Jenkins</span>
                  <span className="text-xs text-muted-foreground">Cardiology • 4.9 ⭐</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}
