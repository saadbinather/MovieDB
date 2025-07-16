import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Director from "@/models/Director";

export async function GET() {
  try {
    await connectDB();
    const directors = await Director.find({}).sort({ name: 1 });
    return NextResponse.json(directors);
  } catch (error) {
    console.error("Error fetching directors:", error);
    return NextResponse.json(
      { error: "Failed to fetch directors" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const director = await Director.create(body);
    return NextResponse.json(director, { status: 201 });
  } catch (error) {
    console.error("Error creating director:", error);
    return NextResponse.json(
      { error: "Failed to create director" },
      { status: 500 }
    );
  }
}
