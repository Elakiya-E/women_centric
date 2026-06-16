import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/knowledge - Retrieve articles (optionally filtered by ?category)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const filterClause = category && category !== "All" ? { category } : {};

    const articles = await prisma.article.findMany({
      where: filterClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/knowledge error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/knowledge - Create a new educational article
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, desc, readTime } = body;

    // Field validations
    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'title'" }, { status: 400 });
    }
    if (!category || typeof category !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'category'" }, { status: 400 });
    }
    if (!desc || typeof desc !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'desc'" }, { status: 400 });
    }
    if (!readTime || typeof readTime !== "string") {
      return NextResponse.json({ error: "Invalid or missing 'readTime'" }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        category,
        desc,
        readTime,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/knowledge error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
