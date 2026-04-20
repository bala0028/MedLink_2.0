"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function getAppointmentsAction() {
  try {
    const session = await auth();
    // In a real app we would filter by the logged-in user (patient or doctor id)
    // For this demonstration, we'll fetch all or mock some dynamically if empty
    
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: 'asc' }
    });

    return { success: true, count: appointments.length, appointments };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return { success: false, error: "Failed to fetch appointments" };
  }
}

export async function createAppointmentAction(data: {
  title: string;
  date: Date;
  endTime: Date;
  colorTheme: string;
}) {
  try {
    // In a real app we'll enforce the current user
    // Provide fallback mock UUIDs for doctor/patient if none to allow UI testing easily
    
    // Pick the first available doctor/patient for demonstration purposes
    const doctor = await prisma.doctor.findFirst();
    const patient = await prisma.patient.findFirst();
    
    if (!doctor || !patient) {
      return { success: false, error: "System must have at least one doctor and one patient seeded to create appointments." };
    }

    const appointment = await prisma.appointment.create({
      data: {
        title: data.title,
        date: data.date,
        endTime: data.endTime,
        colorTheme: data.colorTheme,
        doctorId: doctor.id,
        patientId: patient.id,
        status: "CONFIRMED"
      }
    });

    revalidatePath("/appointments");
    return { success: true, appointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { success: false, error: "Failed to create appointment" };
  }
}
