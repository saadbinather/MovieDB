import { promises as fs } from "fs";
import path from "path";

// Define the type for our genre data
type Genre = {
  id: number;
  name: string;
  description: string;
  movies: string[];
};

// Server Component - fetches data on every request
async function getGenres() {
  const filePath = path.join(process.cwd(), "src/app/data/movies.json");
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data).genres as Genre[];
}

export default async function GenresPage() {
  // Data is fetched on every request
  const genres = await getGenres();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Genres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <div key={genre.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{genre.name}</h2>
            <p className="text-gray-600 mb-4">{genre.description}</p>
            <p className="text-sm text-gray-500">
              {genre.movies.length} movies in this genre
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
