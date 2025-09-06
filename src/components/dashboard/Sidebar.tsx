"use client"

import { FC, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Sidebar: FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: "main",
      label: "Main",
      icon: "🏠",
      description: "Dashboard overview"
    },
    {
      id: "add-stories",
      label: "Add Stories",
      icon: "📖",
      description: "Create new stories"
    },
    {
      id: "add-authors",
      label: "Add Authors",
      icon: "✍️",
      description: "Manage authors"
    }
  ]

  return (
    <aside className="w-64 bg-background border-r border-border/20 h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-auto p-4",
                activeTab === tab.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="text-lg">{tab.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{tab.label}</span>
                <span className={cn(
                  "text-xs",
                  activeTab === tab.id ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {tab.description}
                </span>
              </div>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
