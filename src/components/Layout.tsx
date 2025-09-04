"use client";

import { FC, ReactNode } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-foreground focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Global header */}
      <Navigation />

      {/* Main content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Global footer */}
      <Footer />
    </div>
  );
};

export default Layout;
