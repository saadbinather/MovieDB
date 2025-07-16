// /app/movies/page.tsx

import { promises as fs } from "fs";
import path from "path";
import Movies from "@/components/Movies"; // Fixed import path

export const revalidate = 20; // ISR: Revalidate every 60 seconds

type Movie = {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

// Store the random number outside the function so it's part of the build/ISR
let cachedRandom = Math.random();

async function getMovies(): Promise<{ movies: Movie[]; random: number }> {
  const filePath = path.join(process.cwd(), "src/app/data/movies.json");
  const data = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(data);

  return {
    movies: parsed.movies,
    random: cachedRandom, // Use the cached random number that will only change with ISR
  };
}

export default async function MoviesPage() {
  const { movies: initialMovies, random } = await getMovies();

  console.log(random); // This will now only change after ISR revalidation

  return <Movies initialMovies={initialMovies} />;
}
