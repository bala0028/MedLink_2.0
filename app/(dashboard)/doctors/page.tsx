import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Filter, Star } from "lucide-react";

export default function FindDoctorsPage() {
  const doctors = [
    { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", location: "New York, NY", rating: 4.9, reviews: 124, fee: "$150", img: "10" },
    { id: 2, name: "Dr. Emily Chen", specialty: "Neurology", location: "San Francisco, CA", rating: 4.8, reviews: 89, fee: "$200", img: "11" },
    { id: 3, name: "Dr. Michael Scott", specialty: "Pediatrics", location: "Chicago, IL", rating: 4.7, reviews: 210, fee: "$120", img: "12" },
    { id: 4, name: "Dr. Robert Smith", specialty: "Orthopedics", location: "Austin, TX", rating: 4.9, reviews: 156, fee: "$180", img: "13" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Find Doctors</h1>
        <p className="text-muted-foreground">Search and book top specialists in your area.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search doctor, specialty, conditions..." className="pl-10 h-10 w-full" />
        </div>
        <div className="relative flex-1 md:max-w-xs">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Location" className="pl-10 h-10 w-full" />
        </div>
        <Button variant="outline" className="h-10">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map(doctor => (
          <Card key={doctor.id} className="border-border/50 overflow-hidden hover:shadow-md transition-all group">
            <div className="h-24 bg-muted/50 border-b border-border/50 relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <Avatar className="h-20 w-20 border-4 border-background shadow-sm group-hover:scale-105 transition-transform">
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${doctor.img}`} />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-14 pb-6 text-center">
              <h3 className="font-bold text-lg">{doctor.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{doctor.specialty}</p>
              
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-4">
                <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                <span className="font-medium text-foreground">{doctor.rating}</span>
                <span>({doctor.reviews} Reviews)</span>
              </div>
              
              <div className="flex justify-between items-center text-sm py-4 border-t border-border/50 mt-4 mb-4">
                <span className="text-muted-foreground">Consultation</span>
                <span className="font-semibold">{doctor.fee}</span>
              </div>
              
              <Button className="w-full">Book Visit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
