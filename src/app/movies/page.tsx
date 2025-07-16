"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, Filter, ChevronDown, Heart } from "lucide-react";
import data from "../data/movies.json";

type SortOption = "rating-desc" | "rating-asc" | "title-asc" | "year-desc";

export default function MoviesPage() {
  const [movies, setMovies] = useState(data.movies);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("rating-desc");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (movieId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(movieId)) {
      newFavorites.delete(movieId);
      toast({
        title: "Removed from favorites",
        description: "Movie has been removed from your favorites.",
      });
    } else {
      newFavorites.add(movieId);
      toast({
        title: "Added to favorites",
        description: "Movie has been added to your favorites.",
      });
    }
    setFavorites(newFavorites);
  };

  // Sort movies based on selected option
  const getSortedMovies = (movies: any[], sortOption: SortOption) => {
    const sorted = [...movies];

    switch (sortOption) {
      case "rating-desc":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "rating-asc":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "title-asc":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "year-desc":
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      default:
        return sorted;
    }
  };

  const sortedMovies = getSortedMovies(movies, sortOption);

  const filteredMovies = sortedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSortOptionLabel = (option: SortOption) => {
    switch (option) {
      case "rating-desc":
        return "Rating (High to Low)";
      case "rating-asc":
        return "Rating (Low to High)";
      case "title-asc":
        return "Title (A-Z)";
      case "year-desc":
        return "Release Year";
      default:
        return "Sort by";
    }
  };

  const getGenreById = (genreId: string) => {
    return data.genres.find((genre) => genre.id === genreId);
  };

  const getDirectorById = (directorId: string) => {
    return data.directors.find((director) => director.id === directorId);
  };

  const renderMovieCard = (movie: any) => {
    const genre = getGenreById(movie.genreId);
    const director = getDirectorById(movie.directorId);
    const isFavorite = favorites.has(movie.id);

    return (
      <Card
        key={movie.id}
        className="group relative overflow-hidden bg-background border border-border hover:shadow-lg transition-all duration-300 rounded-lg"
      >
        <div className="absolute top-3 right-3 z-10">
          <Heart
            className={`h-6 w-6 cursor-pointer ${
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie.id);
            }}
          />
        </div>

        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold line-clamp-2 text-foreground">
                {movie.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {movie.releaseYear}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {movie.rating.toFixed(1)}
            </span>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium">Genre:</span>
              <Link
                href="/genres"
                className="hover:text-primary hover:underline cursor-pointer"
              >
                {genre?.name || "Unknown"}
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Director:</span>
              <Link
                href={`/directors/${director?.id || ""}`}
                className="hover:text-primary hover:underline cursor-pointer"
              >
                {director?.name || "Unknown"}
              </Link>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {movie.description}
          </p>
        </CardContent>
      </Card>
    );
  };

  const content = (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Movies</h1>
        <p className="text-muted-foreground text-center">
          Explore our collection of movies
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {getSortOptionLabel(sortOption)}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortOption("rating-desc")}>
              Rating (High to Low)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("rating-asc")}>
              Rating (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("title-asc")}>
              Title (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortOption("year-desc")}>
              Release Year
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <Skeleton className="w-full h-full" />
              </div>
              <CardHeader className="pb-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(renderMovieCard)}
        </div>
      )}

      {!isLoading && filteredMovies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No movies found matching your search.
          </p>
          <Button
            variant="outline"
            onClick={() => setSearchTerm("")}
            className="mx-auto"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
}
