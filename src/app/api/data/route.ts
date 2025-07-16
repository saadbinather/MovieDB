import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Movie from "@/models/Movie";
import Genre from "@/models/Genre";
import Director from "@/models/Director";

export async function GET() {
  try {
    await connectDB();

    // Fetch all data from MongoDB
    const [movies, genres, directors] = await Promise.all([
      Movie.find({}).sort({ createdAt: -1 }),
      Genre.find({}).sort({ name: 1 }),
      Director.find({}).sort({ name: 1 }),
    ]);

    // Return data in the same format as the original JSON file
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
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
