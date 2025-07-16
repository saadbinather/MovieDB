import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Director from "@/models/Director";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const director = await Director.findOne({ id: params.id });

    if (!director) {
      return NextResponse.json(
        { error: "Director not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(director);
  } catch (error) {
    console.error("Error fetching director:", error);
    return NextResponse.json(
      { error: "Failed to fetch director" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const director = await Director.findOneAndUpdate({ id: params.id }, body, {
      new: true,
    });

    if (!director) {
      return NextResponse.json(
        { error: "Director not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(director);
  } catch (error) {
    console.error("Error updating director:", error);
    return NextResponse.json(
      { error: "Failed to update director" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const director = await Director.findOneAndDelete({ id: params.id });

    if (!director) {
      return NextResponse.json(
        { error: "Director not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Director deleted successfully" });
  } catch (error) {
    console.error("Error deleting director:", error);
    return NextResponse.json(
      { error: "Failed to delete director" },
      { status: 500 }
    );
  }
}
