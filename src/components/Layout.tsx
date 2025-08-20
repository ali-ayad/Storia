"use client";

import { FC, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Home, Map, Settings } from "lucide-react";
import Navigation from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      {/* Navbar */}
   <Navigation></Navigation>

      {/* Main content */}
      <main className="m-5 mt-11">
       {children}
      </main>
    </div>
  );
};

export default Layout;
