import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Pill, FileText } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface PrescriptionWithDetails {
  id: string;
  notes: string | null;
  fileUrl: string;
  appointment?: {
    date: Date;
    status: string;
    doctor?: {
      user?: {
        name: string | null;
      } | null;
    } | null;
  } | null;
}

export default async function PrescriptionsPage() {
  // Fetch real data from the database
  const dbPrescriptions = await prisma.prescription.findMany({
    include: {
      appointment: {
        include: {
          doctor: {
            include: {
              user: true
            }
          }
        }
      }
    }
  }) as unknown as PrescriptionWithDetails[];

  // Map the database structure to our UI structure
  const prescriptions = dbPrescriptions.map((rx: PrescriptionWithDetails) => {
    // Extract medication name from the start of notes (e.g. "Lisinopril 10mg, take 1 tab...")
    const notesParts = rx.notes?.split(',') || ["Prescription Details"];
    const medicationName = notesParts[0];

    return {
      id: rx.id,
      medication: medicationName,
      dosage: rx.notes || "Please check attached PDF for dosage instructions.",
      doctor: rx.appointment?.doctor?.user?.name || "Unknown Doctor",
      date: rx.appointment?.date ? new Date(rx.appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Unknown Date",
      status: rx.appointment?.status === 'COMPLETED' ? 'Expired' : 'Active', // Mocking mapping
      refills: 1, // Not supported in DB yet, keeping static for UI
      fileUrl: rx.fileUrl
    };
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Prescriptions</h1>
        <p className="text-muted-foreground">Manage your current medications and past prescriptions.</p>
      </div>

      <div className="flex flex-col gap-6">
        {prescriptions.length === 0 ? (
          <p className="text-muted-foreground text-sm italic">No prescriptions found in your records.</p>
        ) : (
          prescriptions.map((rx) => (
            <Card key={rx.id} className="border-border/50 overflow-hidden">
              <div className={`h-2 w-full ${rx.status === 'Active' ? 'bg-primary' : 'bg-muted'}`}></div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-4 rounded-full ${rx.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      <Pill className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold">{rx.medication}</h3>
                        <Badge variant="secondary" className={
                          rx.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                        }>
                          {rx.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-2">{rx.dosage}</p>
                      <p className="text-sm text-muted-foreground mb-1">Prescribed by {rx.doctor} on {rx.date}</p>
                      <p className="text-xs font-semibold text-primary">{rx.refills} refills remaining</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-3 shrink-0">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" /> PDF
                    </Button>
                    <Button className="flex items-center gap-2" disabled={rx.status === 'Expired'}>
                      Request Refill
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
