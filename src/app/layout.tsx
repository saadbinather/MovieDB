import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";
import Help from "../components/Help";

export const metadata: Metadata = {
  title: "Movie Database",
  description: "Browse movies, genres, and directors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1 container mx-auto px-4 pt-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
