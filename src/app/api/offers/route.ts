import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/offers - Fetch active bundle offers
export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/offers error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/offers - Create new promo offers
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, desc, discount, code, bgGradient, active } = body;

    // Field validations
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'title'" }, { status: 400 });
    }
    if (!desc || typeof desc !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'desc'" }, { status: 400 });
    }
    if (!discount || typeof discount !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'discount'" }, { status: 400 });
    }
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json({ error: "Invalid or missing 'code'" }, { status: 400 });
    }
    if (!bgGradient || typeof bgGradient !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'bgGradient'" }, { status: 400 });
    }

    // Check code uniqueness
    const codeExists = await prisma.offer.findUnique({
      where: { code: code.trim().toUpperCase() },
    });

    if (codeExists) {
      return NextResponse.json(
        { error: `Promo offer with code '${code}' already exists.` },
        { status: 409 }
      );
    }

    const newOffer = await prisma.offer.create({
      data: {
        title,
        desc,
        discount,
        code: code.trim().toUpperCase(),
        bgGradient,
        active: active !== undefined ? Boolean(active) : true,
      },
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/offers error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
