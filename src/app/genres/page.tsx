"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Film, Library, TrendingUp } from "lucide-react";
import data from "../data/movies.json";

export default function GenresPage() {
  // Group movies by genre and add them to each genre object
  const genresWithMovies = data.genres.map((genre) => {
    const genreMovies = data.movies.filter(
      (movie) => movie.genreId === genre.id
    );
    return {
      ...genre,
      movies: genreMovies.map((movie) => movie.title),
    };
  });

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-10">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-10 space-y-4">
          <div className="flex items-center gap-2">
            <Library className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-center">Movie Genres</h1>
          </div>
          <p className="text-muted-foreground text-lg text-center max-w-2xl">
            "This is Cinema"
          </p>
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {genresWithMovies.map((genre) => (
            <Card
              key={genre.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {genre.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Film className="h-3 w-3 mr-1" />
                        {genre.movies.length} Movies
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm leading-relaxed">
                  {genre.description}
                </CardDescription>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Popular Movies
                  </h3>
                  <ScrollArea className="h-24 w-full rounded-md border p-2">
                    <div className="space-y-2">
                      {genre.movies.map((movie, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                        >
                          <span className="h-2 w-2 rounded-full bg-primary/50" />
                          {movie}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Genres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {genresWithMovies.length}
              </div>
              <p className="text-muted-foreground text-sm">
                Available categories
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Most Popular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {genresWithMovies[0]?.name || "N/A"}
              </div>
              <p className="text-muted-foreground text-sm">
                Highest movie count
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Movies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {genresWithMovies.reduce(
                  (acc, genre) => acc + genre.movies.length,
                  0
                )}
              </div>
              <p className="text-muted-foreground text-sm">Across all genres</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
