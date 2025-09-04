"use client"

import { FC, ReactNode } from "react"
import Link from "next/link"

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Nav */}
      <header className="border-b border-border/20 bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold">Dashboard</Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/dashboard">Home</Link>
            <Link href="/">Public Site</Link>
            <button
              onClick={() => {
                document.cookie = "token=; path=/; max-age=0"
                window.location.href = "/auth/login"
              }}
              className="hover:text-foreground"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout


