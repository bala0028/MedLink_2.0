import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany();
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const appointment = await prisma.appointment.create({
      data: {
        doctorId: body.doctorId,
        patientId: body.patientId,
        date: new Date(body.date),
        status: body.status || "PENDING"
      }
    });
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}
