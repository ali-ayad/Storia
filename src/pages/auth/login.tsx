"use client"

import Link from "next/link"
import { Eye } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
      
          <h1 className="text-2xl font-semibold mt-6 mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border/20 rounded-lg p-8 shadow-lg">
          <form className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="admin@fantasy.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign In
            </button>
          </form>

         
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Storia
          </Link>
        </div>
      </div>
    </div>
  )
}
