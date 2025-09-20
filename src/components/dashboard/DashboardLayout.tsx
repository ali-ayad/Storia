"use client"

import { FC, ReactNode, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Plus, 
  Menu, 
  X,
  LogOut,
  Globe
} from "lucide-react"

interface Props {
  children: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
      description: "Dashboard overview"
    },
    {
      title: "Stories",
      icon: BookOpen,
      href: "/dashboard/stories",
      description: "Manage stories"
    },
    {
      title: "Authors",
      icon: Users,
      href: "/dashboard/authors",
      description: "Manage authors"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      description: "System settings"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
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
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <Link href="/dashboard" className="text-lg font-semibold">
              Storia Dashboard
            </Link>
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
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Sidebar footer */}
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
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

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout


