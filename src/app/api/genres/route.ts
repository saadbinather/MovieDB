import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Genre from "@/models/Genre";

export async function GET() {
  try {
    await connectDB();
    const genres = await Genre.find({}).sort({ name: 1 });
    return NextResponse.json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const genre = await Genre.create(body);
    return NextResponse.json(genre, { status: 201 });
  } catch (error) {
    console.error("Error creating genre:", error);
    return NextResponse.json(
      { error: "Failed to create genre" },
      { status: 500 }
    );
  }
}
