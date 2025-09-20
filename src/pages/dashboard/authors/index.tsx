"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Mail, Globe, Users, CheckCircle, Pause, BookOpen } from "lucide-react"
import DataTable, { Column } from "@/components/dashboard/tables/DataTable"
import StatsCards from "@/components/dashboard/StatsCards"
import AddAuthorModal from "@/components/dashboard/modals/AddAuthorModal"

export default function AuthorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Mock data - replace with actual API calls
  const authors = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      bio: "Award-winning author with over 10 years of experience in fiction writing.",
      website: "https://johndoe.com",
      storiesCount: 5,
      status: "active",
      joinedAt: "2023-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      bio: "Mystery and thriller writer, known for her captivating plot twists.",
      website: "https://janesmith.com",
      storiesCount: 8,
      status: "active",
      joinedAt: "2023-02-20"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      bio: "Romance novelist specializing in contemporary love stories.",
      website: "",
      storiesCount: 3,
      status: "inactive",
      joinedAt: "2023-03-10"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const columns: Column<typeof authors[0]>[] = [
    {
      key: "name",
      label: "Author",
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">{item.bio}</div>
        </div>
      )
    },
    {
      key: "email",
      label: "Contact",
      render: (value, item) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            {value}
          </div>
          {item.website && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-3 w-3" />
              <a href={item.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Website
              </a>
            </div>
          )}
        </div>
      )
    },
    {
      key: "storiesCount",
      label: "Stories",
      render: (value) => <Badge variant="outline">{value} stories</Badge>
    },
    {
      key: "status",
      label: "Status",
      render: (value) => getStatusBadge(value)
    },
    {
      key: "joinedAt",
      label: "Joined",
      render: (value) => <span className="text-muted-foreground">{value}</span>
    }
  ]

  const stats = [
    {
      title: "Total Authors",
      value: authors.length,
      icon: <Users className="h-6 w-6" />,
      change: { value: 20.0, type: "increase" as const },
      badge: { text: "+2 this month", variant: "secondary" as const }
    },
    {
      title: "Active",
      value: authors.filter(a => a.status === "active").length,
      icon: <CheckCircle className="h-6 w-6" />,
      change: { value: 15.2, type: "increase" as const },
      badge: { text: "83% active", variant: "default" as const }
    },
    {
      title: "Inactive",
      value: authors.filter(a => a.status === "inactive").length,
      icon: <Pause className="h-6 w-6" />,
      change: { value: 5.1, type: "decrease" as const }
    },
    {
      title: "Total Stories",
      value: authors.reduce((sum, a) => sum + a.storiesCount, 0),
      icon: <BookOpen className="h-6 w-6" />,
      change: { value: 18.7, type: "increase" as const }
    }
  ]

  const handleAddAuthor = async (formData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log("Author data:", formData)
    // Here you would typically refresh the authors list or add to state
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Authors</h1>
            <p className="text-muted-foreground mt-2">Manage all authors on your platform</p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Author
          </Button>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Authors Table */}
        <DataTable
          data={authors}
          columns={columns}
          onView={(author) => console.log("View author:", author)}
          onEdit={(author) => console.log("Edit author:", author)}
          onDelete={(author) => console.log("Delete author:", author)}
          emptyMessage="No authors found. Add your first author to get started!"
        />

        {/* Add Author Modal */}
        <AddAuthorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAuthor}
        />
      </div>
    </DashboardLayout>
  )
}
