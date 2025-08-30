"use client";

import type React from "react";
import { useState } from "react";
import { Search, User, Menu, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ import usePathname
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname(); // ✅ get current path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="border-b border-border/20 bg-background/90 backdrop-blur-md sticky top-0 z-50 shadow-sm shadow-black/20">
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider bg-gradient-to-r from-primary via-red-400 to-amber-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-lg"
          >
            Storia
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${isActive("/") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              HOME
            </Link>
            <Link
              href="/authors"
              className={`transition-colors ${isActive("/authors") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              AUTHORS
            </Link>
            <Link
              href="/stories"
              className={`transition-colors ${isActive("/stories") ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
            >
              STORIES
            </Link>

            {/* Genres Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                GENRES
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Fantasy Types</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/genres/epic-fantasy">Epic Fantasy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/genres/urban-fantasy">Urban Fantasy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/genres/dark-fantasy">Dark Fantasy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/genres/high-fantasy">High Fantasy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 relative">
            {/* Search input sliding in */}
            <div className="relative flex items-center">
              <Search
                onClick={toggleSearch}
                className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110"
              />

              <div
                className={`absolute right-0 top-0 flex items-center h-10 transition-all duration-300 overflow-hidden ${
                  isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </div>

            <Link href="/auth/login">
              <User className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg" />
            </Link>

            <button onClick={toggleMobileMenu} className="md:hidden">
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              ) : (
                <Menu className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-all duration-300 hover:scale-110" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20">
            <div className="flex flex-col space-y-4 pt-4">
              {["/", "/authors", "/stories", "/genres/epic-fantasy", "/blog"].map((link) => (
                <Link
                  key={link}
                  href={link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`transition-colors ${isActive(link) ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"}`}
                >
                  {link === "/" ? "HOME" :
                   link === "/authors" ? "AUTHORS" :
                   link === "/stories" ? "STORIES" :
                   link === "/genres/epic-fantasy" ? "GENRES" :
                   "BLOG"}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
