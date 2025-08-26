"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/50">
      <div className="container mx-auto px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-xl font-bold">Storia</h2>
            <p className="text-sm text-muted-foreground max-w-xs mt-2">
              The ultimate destination for fantasy storytelling.
            </p>
          </div>

          <div className="flex space-x-4">
            {["f", "t", "i"].map((icon) => (
              <div
                key={icon}
                className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors"
              >
                <span className="text-xs font-medium">{icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
          <p>© 2024 Storia. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
