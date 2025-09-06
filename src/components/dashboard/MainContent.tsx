"use client"

import { FC } from "react"
import { Badge } from "@/components/ui/badge"

const MainContent: FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to your story management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-card border border-border/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Stories</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="text-2xl">📖</div>
          </div>
          <Badge variant="secondary" className="mt-2">+3 this week</Badge>
        </div>

        <div className="bg-card border border-border/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Authors</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div className="text-2xl">✍️</div>
          </div>
          <Badge variant="secondary" className="mt-2">+1 this week</Badge>
        </div>

        <div className="bg-card border border-border/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">18</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
          <Badge variant="default" className="mt-2">75% published</Badge>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <div className="text-lg">📝</div>
            <div className="flex-1">
              <p className="text-sm font-medium">New story "The Adventure Begins" created</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <div className="text-lg">✍️</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Author "John Doe" added to platform</p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
            <div className="text-lg">📖</div>
            <div className="flex-1">
              <p className="text-sm font-medium">Story "Mystery of the Lost City" published</p>
              <p className="text-xs text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
