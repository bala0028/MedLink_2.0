import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { user: true }
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const doctor = await prisma.doctor.create({
      data: {
        userId: body.userId,
        specialization: body.specialization,
        experience: body.experience,
        fee: body.fee,
        bio: body.bio
      }
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}
