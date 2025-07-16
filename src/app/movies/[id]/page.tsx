// /app/movies/[id]/page.tsx

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

type Movie = {
  id: string;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  directorId: string;
  genreId: string;
};

type Genre = {
  id: number;
  name: string;
  description: string;
};

type MovieData = {
  movies: Movie[];
  genres: Genre[];
};

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "src/app/data/movies.json");
  const data = await fs.readFile(filePath, "utf8");
  const { movies }: MovieData = JSON.parse(data);

  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const filePath = path.join(process.cwd(), "src/app/data/movies.json");
  const data = await fs.readFile(filePath, "utf8");
  const { movies, genres }: MovieData = JSON.parse(data);

  const movie = movies.find((m) => m.id === params.id);
  if (!movie) notFound();

  const genreIdNumber = parseInt(movie.genreId.slice(1));
  const genre = genres.find((g) => g.id === genreIdNumber);

  const relatedMovies = movies
    .filter((m) => m.genreId === movie.genreId && m.id !== movie.id)
    .slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <Link href="/movies" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Movies
        </Link>

        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
        <div className="text-gray-600 mb-4">
          {genre?.name} • {movie.releaseYear} • ⭐ {movie.rating}/10
        </div>

        <p className="text-gray-700 mb-6">{movie.description}</p>

        {genre && (
          <div className="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">About {genre.name}</h2>
            <p>{genre.description}</p>
          </div>
        )}

        {relatedMovies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">More {genre?.name} Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedMovies.map((related) => (
                <Link
                  key={related.id}
                  href={`/movies/${related.id}`}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <h3 className="font-semibold">{related.title}</h3>
                  <p className="text-sm text-gray-600">{related.releaseYear}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
