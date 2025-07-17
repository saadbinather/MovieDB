"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-14 items-center justify-between">
          {/* Left side - App logo/home */}
          <div className="flex items-center gap-4">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              className="text-sm flex items-center gap-2"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={pathname === "/" ? "/whitehome.svg" : "/home.svg"}
                  alt="Home"
                  width={18}
                  height={18}
                  className="w-[18px] h-[18px]"
                />
                {!session && <span className="hidden sm:inline">Movie App</span>}
              </Link>
            </Button>
          </div>

          {/* Center - Main navigation (only when authenticated) */}
          {session && (
            <div className="flex items-center gap-1 sm:gap-4">
              <Button
                variant={pathname === "/movies" ? "default" : "ghost"}
                className="text-sm"
                asChild
              >
                <Link href="/movies">Movies</Link>
              </Button>

              <Button
                variant={pathname === "/genres" ? "default" : "ghost"}
                className="text-sm"
                asChild
              >
                <Link href="/genres">Genres</Link>
              </Button>

              <Button
                variant={pathname === "/directors" ? "default" : "ghost"}
                className="text-sm"
                asChild
              >
                <Link href="/directors">Directors</Link>
              </Button>

              <Button
                variant={pathname === "/help" ? "default" : "ghost"}
                className="text-sm"
                asChild
              >
                <Link href="/help">Help</Link>
              </Button>
            </div>
          )}

          {/* Right side - User menu (only when authenticated) */}
          {session && (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{session.user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-sm text-muted-foreground">
                    {session.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
