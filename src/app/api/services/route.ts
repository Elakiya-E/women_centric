import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/services - Retrieve all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        subServices: true,
        availability: true,
      },
    });
    
    // Return standard array. If empty, the client receives [] allowing loading/empty state handling
    return NextResponse.json(services, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, startingPrice, rating, badge, iconName, gradient } = body;

    // Field validations
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'title'" }, { status: 400 });
    }
    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'description'" }, { status: 400 });
    }
    if (!startingPrice || typeof startingPrice !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'startingPrice'" }, { status: 400 });
    }
    if (rating === undefined || typeof rating !== "number") {
      return NextResponse.json({ error: "Invalid or missing 'rating'" }, { status: 400 });
    }
    if (!badge || typeof badge !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'badge'" }, { status: 400 });
    }
    if (!iconName || typeof iconName !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'iconName'" }, { status: 400 });
    }
    if (!gradient || typeof gradient !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'gradient'" }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        title,
        description,
        startingPrice,
        rating,
        badge,
        iconName,
        gradient,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
