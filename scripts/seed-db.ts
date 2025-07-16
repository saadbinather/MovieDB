import { connectDB } from "../src/lib/mongodb";
import Movie from "../src/models/Movie";
import Genre from "../src/models/Genre";
import Director from "../src/models/Director";
import fs from "fs";
import path from "path";

interface MovieData {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
  url?: string;
  posterUrl?: string;
}

interface GenreData {
  id: string;
  name: string;
  description?: string;
  movies?: string[];
}

interface DirectorData {
  id: string;
  name: string;
  biography?: string;
  url?: string;
}

async function seedDatabase() {
  try {

    await connectDB();
    console.log("Connected to MongoDB");

    // Read data from JSON files
    const publicDataPath = path.join(process.cwd(), "public", "data.json");
    const appDataPath = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "movies.json"
    );
    const genresDataPath = path.join(
      process.cwd(),
      "src",
      "data",
      "genres.json"
    );

    // Read the main data file
    const publicData = JSON.parse(fs.readFileSync(publicDataPath, "utf8"));

    // Read additional data files if they exist
    let appData = { movies: [], genres: [] };
    let genresData = { genres: [] };

    if (fs.existsSync(appDataPath)) {
      appData = JSON.parse(fs.readFileSync(appDataPath, "utf8"));
    }

    if (fs.existsSync(genresDataPath)) {
      genresData = JSON.parse(fs.readFileSync(genresDataPath, "utf8"));
    }

    // Combine all data sources
    const allMovies: MovieData[] = [
      ...(publicData.movies || []),
      ...(appData.movies || []),
    ];
    const allGenres: GenreData[] = [
      ...(publicData.genres || []),
      ...(appData.genres || []),
      ...(genresData.genres || []),
    ];
    const allDirectors: DirectorData[] = publicData.directors || [];

    // Remove duplicates based on id
    const uniqueMovies = allMovies.filter(
      (movie: MovieData, index: number, self: MovieData[]) =>
        index === self.findIndex((m: MovieData) => m.id === movie.id)
    );
    const uniqueGenres = allGenres.filter(
      (genre: GenreData, index: number, self: GenreData[]) =>
        index === self.findIndex((g: GenreData) => g.id === genre.id)
    );
    const uniqueDirectors = allDirectors.filter(
      (director: DirectorData, index: number, self: DirectorData[]) =>
        index === self.findIndex((d: DirectorData) => d.id === director.id)
    );

    // Clear existing collections
    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await Director.deleteMany({});
    console.log("Cleared existing collections");

    // Seed Directors
    if (uniqueDirectors.length > 0) {
      await Director.insertMany(uniqueDirectors);
      console.log(`Seeded ${uniqueDirectors.length} directors`);
    }

    // Seed Genres (update with movie counts)
    if (uniqueGenres.length > 0) {
      const genresWithMovies = uniqueGenres.map((genre: GenreData) => ({
        ...genre,
        movies: uniqueMovies
          .filter((movie: MovieData) => movie.genreId === genre.id)
          .map((movie: MovieData) => movie.title),
      }));

      await Genre.insertMany(genresWithMovies);
      console.log(`Seeded ${genresWithMovies.length} genres`);
    }

    // Seed Movies
    if (uniqueMovies.length > 0) {
      await Movie.insertMany(uniqueMovies);
      console.log(`Seeded ${uniqueMovies.length} movies`);
    }

    console.log("Database seeding completed successfully!");

    // Display summary
    console.log("\n=== Seeding Summary ===");
    console.log(`Directors: ${uniqueDirectors.length}`);
    console.log(`Genres: ${uniqueGenres.length}`);
    console.log(`Movies: ${uniqueMovies.length}`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
