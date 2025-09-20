"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Users, 
  Settings,
  Menu, 
  X,
  LogOut,
  Globe,
  BarChart3
} from "lucide-react"

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    { key: "overview", title: "Overview", href: "/dashboard", icon: BarChart3 },
    { key: "stories", title: "Stories", href: "/dashboard/stories", icon: BookOpen },
    { key: "authors", title: "Authors", href: "/dashboard/authors", icon: Users },
    { key: "settings", title: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border/20 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:flex-shrink-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold tracking-wider text-primary">
                STORIA
              </Link>
              <span className="hidden lg:inline text-muted-foreground">/ Dashboard</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-card"
                  )}
                  onClick={() => setSidebarOpen(false)} // close on mobile
                >
                  <item.icon className="w-5 h-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border/20">
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>Public Site</span>
              </Link>
              <button
                onClick={() => {
                  document.cookie = "token=; path=/; max-age=0"
                  window.location.href = "/auth/login"
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors w-full text-left"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 border-b border-border/20 bg-background/90 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
