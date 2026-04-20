import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');
  
  try {
    const availability = await prisma.availability.findMany({
      where: doctorId ? { doctorId } : undefined
    });
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const availability = await prisma.availability.create({
      data: {
        doctorId: body.doctorId,
        day: body.day,
        startTime: body.startTime,
        endTime: body.endTime
      }
    });
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save availability" }, { status: 500 });
  }
}
