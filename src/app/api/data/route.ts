import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Genre from "@/models/Genre";
import Director from "@/models/Director";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // Try to connect to database first
    await connectToDatabase();

    // Fetch all data from MongoDB
    const [movies, genres, directors] = await Promise.all([
      Movie.find({}).sort({ createdAt: -1 }),
      Genre.find({}).sort({ name: 1 }),
      Director.find({}).sort({ name: 1 }),
    ]);

    // If database has data, return it
    if (movies.length > 0 || genres.length > 0 || directors.length > 0) {
      const data = {
        movies: movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.description,
          releaseYear: movie.releaseYear,
          rating: movie.rating,
          directorId: movie.directorId,
          genreId: movie.genreId,
          url: movie.url,
          posterUrl: movie.posterUrl,
        })),
        genres: genres.map((genre) => ({
          id: genre.id,
          name: genre.name,
          description: genre.description,
          movies: genre.movies || [],
        })),
        directors: directors.map((director) => ({
          id: director.id,
          name: director.name,
          biography: director.biography,
          url: director.url,
        })),
      };

      return NextResponse.json(data);
    }
  } catch (dbError) {
    console.log("Database error, falling back to JSON file:", dbError);
  }

  // Fallback to JSON file if database is empty or fails
  try {
    const filePath = path.join(process.cwd(), "src/app/data/movies.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const jsonData = JSON.parse(fileData);

    return NextResponse.json(jsonData);
  } catch (fileError) {
    console.error("Error reading JSON file:", fileError);
    return NextResponse.json(
      { error: "Failed to fetch data from both database and file" },
      { status: 500 }
    );
  }
}
