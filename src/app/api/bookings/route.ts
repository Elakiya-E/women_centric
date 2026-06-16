import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/bookings - Retrieve all bookings with associated service details
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        service: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/bookings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Submit a new booking request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, name, phone, city, date, time, requirement } = body;

    // Field validations
    if (!serviceId || typeof serviceId !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'serviceId'" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Invalid or missing 'name'" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || !/^\+?[\d\s-]{10,15}$/.test(phone.trim())) {
      return NextResponse.json({ error: "Invalid, missing, or improperly formatted 'phone'" }, { status: 400 });
    }
    if (!city || typeof city !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'city'" }, { status: 400 });
    }
    if (!date || typeof date !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'date'" }, { status: 400 });
    }
    if (!time || typeof time !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'time'" }, { status: 400 });
    }
    if (!requirement || typeof requirement !== "string" || requirement.trim().length === 0) {
      return NextResponse.json({ error: "Invalid or missing 'requirement'" }, { status: 400 });
    }

    // Verify serviceId exists
    const serviceExists = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!serviceExists) {
      return NextResponse.json({ error: `Service with ID '${serviceId}' not found.` }, { status: 404 });
    }

    const newBooking = await prisma.booking.create({
      data: {
        serviceId,
        name,
        phone,
        city,
        date,
        time,
        requirement,
        status: "PENDING",
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/bookings error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
