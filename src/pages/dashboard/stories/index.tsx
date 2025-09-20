"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, BookOpen, CheckCircle, FileText, Eye as EyeIcon } from "lucide-react"
import DataTable, { Column } from "@/components/dashboard/tables/DataTable"
import StatsCards from "@/components/dashboard/StatsCards"
import WithAuth from "@/components/dashboard/withAuth"
import AddStoryModal from "@/components/dashboard/modals/AddStoryModal"

export default function StoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Mock data - replace with actual API calls
  const stories = [
    {
      id: 1,
      title: "The Adventure Begins",
      author: "John Doe",
      category: "Adventure",
      status: "published",
      createdAt: "2024-01-15",
      views: 1250
    },
    {
      id: 2,
      title: "Mystery of the Lost City",
      author: "Jane Smith",
      category: "Mystery",
      status: "draft",
      createdAt: "2024-01-14",
      views: 890
    },
    {
      id: 3,
      title: "Love in Paris",
      author: "Mike Johnson",
      category: "Romance",
      status: "published",
      createdAt: "2024-01-13",
      views: 2100
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="default">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const columns: Column<typeof stories[0]>[] = [
    {
      key: "title",
      label: "Title",
      render: (value) => <div className="font-medium">{value}</div>
    },
    {
      key: "author",
      label: "Author",
      render: (value) => <span className="text-muted-foreground">{value}</span>
    },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="outline">{value}</Badge>
    },
    {
      key: "status",
      label: "Status",
      render: (value) => getStatusBadge(value)
    },
    {
      key: "views",
      label: "Views",
      render: (value) => <span className="text-muted-foreground">{value.toLocaleString()}</span>
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value) => <span className="text-muted-foreground">{value}</span>
    }
  ]

  const stats = [
    {
      title: "Total Stories",
      value: stories.length,
      icon: <BookOpen className="h-6 w-6" />,
      change: { value: 14.3, type: "increase" as const },
      badge: { text: "+3 this week", variant: "secondary" as const }
    },
    {
      title: "Published",
      value: stories.filter(s => s.status === "published").length,
      icon: <CheckCircle className="h-6 w-6" />,
      change: { value: 8.2, type: "increase" as const },
      badge: { text: "75% published", variant: "default" as const }
    },
    {
      title: "Drafts",
      value: stories.filter(s => s.status === "draft").length,
      icon: <FileText className="h-6 w-6" />,
      change: { value: 5.1, type: "increase" as const }
    },
    {
      title: "Total Views",
      value: stories.reduce((sum, s) => sum + s.views, 0),
      icon: <EyeIcon className="h-6 w-6" />,
      change: { value: 12.5, type: "increase" as const }
    }
  ]

  const handleAddStory = async (formData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Story data:", formData)
    // Here you would typically refresh the stories list or add to state
  }

  return (
    <WithAuth>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Stories</h1>
              <p className="text-muted-foreground mt-2">Manage all your stories</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Story
            </Button>
          </div>

          {/* Stats */}
          <StatsCards stats={stats} />

          {/* Stories Table */}
          <DataTable
            data={stories}
            columns={columns}
            onView={(story) => console.log("View story:", story)}
            onEdit={(story) => console.log("Edit story:", story)}
            onDelete={(story) => console.log("Delete story:", story)}
            emptyMessage="No stories found. Create your first story to get started!"
          />

          {/* Add Story Modal */}
          <AddStoryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSubmit={handleAddStory}
          />
        </div>
      </DashboardLayout>
    </WithAuth>
  )
}
