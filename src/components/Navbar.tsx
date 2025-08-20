"use client";

import { useState } from "react";
import { Search, User, Menu, ChevronDown, X } from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className="border-b border-border/20 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-wider">
            FANTASY
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["home", "authors", "stories", "genres"].map((item) => (
              <div key={item} className="relative">
                <button
                  onClick={() => handleDropdownToggle(item)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.toUpperCase()}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === item && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border/20 rounded-lg shadow-lg py-2">
                    {/* TODO: Replace with your real links per item */}
                    <Link
                      href={`/${item}`}
                      onClick={closeDropdown}
                      className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                    >
                      All {item}
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/blog"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              BLOG
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <Link href="/login">
              <User className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </Link>
            <Menu
              onClick={() => setMobileOpen(true)}
              className="w-6 h-6 text-muted-foreground hover:text-foreground cursor-pointer transition-colors md:hidden"
            />
          </div>
        </nav>
      </div>

      {/* Desktop Overlay for dropdowns */}
      {activeDropdown && (
        <div className="hidden md:block fixed inset-0 z-40" onClick={closeDropdown} />
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={closeMobile}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-background shadow-lg z-50 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-bold">FANTASY</span>
              <X
                onClick={closeMobile}
                className="w-6 h-6 cursor-pointer text-muted-foreground hover:text-foreground"
              />
            </div>

            <nav className="space-y-4">
              {["home", "authors", "stories", "genres"].map((item) => (
                <div key={item} className="flex flex-col">
                  <button
                    onClick={() => handleDropdownToggle(item)}
                    className="flex items-center justify-between text-left text-foreground hover:text-primary font-medium"
                  >
                    {item.toUpperCase()}
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform ${
                        activeDropdown === item ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeDropdown === item && (
                    <div className="ml-4 mt-2 space-y-2">
                      {/* TODO: Replace with real links */}
                      <Link
                        href={`/${item}`}
                        onClick={closeMobile}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        All {item}
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/blog"
                onClick={closeMobile}
                className="block text-foreground hover:text-primary font-medium"
              >
                BLOG
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
