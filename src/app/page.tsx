"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/AuthForm";
import data from "./data/movies.json";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Film } from "lucide-react";
import Image from "next/image";

// Helper function to find genre by ID
const getGenre = (genreId: string) => {
  return data.genres.find((g) => g.id === genreId);
};

export default function Home() {
  const { user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show authentication form if user is not logged in
  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to Movie App</h1>
            <p className="text-muted-foreground text-lg">
              Please sign in or create an account to access our movie collection
            </p>
          </div>

          <AuthForm mode={authMode} onToggleMode={toggleAuthMode} />
        </div>
      </div>
    );
  }

  // Show movie content if user is authenticated
  const topMovies = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center mb-10 space-y-4">
        <h1 className="text-4xl font-bold text-center">Featured Movies</h1>
        <p className="text-muted-foreground text-lg text-center max-w-2xl">
          Discover our top-rated films, carefully curated based on ratings and
          viewer feedback.
        </p>
      </div>

      <div className="grid gap-6 max-w-5xl mx-auto">
        {topMovies.map((movie, index) => {
          const genre = getGenre(movie.genreId);

          return (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="block group"
            >
              <Card className="overflow-hidden transition-shadow duration-300 group-hover:shadow-xl bg-background border border-border rounded-xl">
                <CardContent className="p-6 md:flex md:gap-6 md:items-start">
                  {/* Poster */}
                  <div className="relative w-full md:w-48 h-72 shrink-0 mx-auto md:mx-0 rounded-xl overflow-hidden shadow-md">
                    {/* Rank Badge - Top Left with text-shadow */}
                    <div className="absolute top-2 left-2 text-white text-3xl font-mono font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] z-10">
                      #{index + 1}
                    </div>

                    <Image
                      src={movie.posterUrl}
                      alt={`${movie.title} poster`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  {/* Text & Meta */}
                  <div className="flex-1 mt-6 md:mt-0 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Title + Genre */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {movie.title}
                        </h2>
                        {genre && (
                          <Badge
                            variant="outline"
                            className="text-sm px-2 py-1"
                          >
                            {genre.name}
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {movie.description}
                      </p>

                      {/* Year & ID */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Released: {movie.releaseYear}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Film className="h-4 w-4" />
                          <span>ID: {movie.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating & Ranking Row */}
                    <div className="mt-6 flex justify-between items-center">
                      {/* Rating (left) */}
                      <div className="flex  items-center gap-2 bg-muted px-4 py-2 rounded-md text-base font-medium">
                        <Star className="h-5 w-5 fill-black text-black" />
                        <span>{movie.rating.toFixed(1)} </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/movies"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          View All Movies
        </Link>
      </div>
    </div>
  );
}
