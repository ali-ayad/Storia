"use client";

import { FC, ReactNode } from "react";
import Footer from "@/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <main>
      
        {children}
        <Footer />
      </main>
      
    </div>
  );
};

export default Layout;
