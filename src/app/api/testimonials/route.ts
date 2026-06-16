import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/testimonials - Retrieve all customer reviews
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/testimonials - Create a client testimonial
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, location, rating, review, initials, bgClass } = body;

    // Field validations
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'name'" }, { status: 400 });
    }
    if (!location || typeof location !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'location'" }, { status: 400 });
    }
    if (rating === undefined || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid or missing 'rating' (must be integer 1 to 5)" }, { status: 400 });
    }
    if (!review || typeof review !== "string" || review.trim().length === 0) {
      return NextResponse.json({ error: "Invalid or missing 'review'" }, { status: 400 });
    }
    if (!initials || typeof initials !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'initials'" }, { status: 400 });
    }
    if (!bgClass || typeof bgClass !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'bgClass'" }, { status: 400 });
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        location,
        rating,
        review,
        initials,
        bgClass,
      },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
