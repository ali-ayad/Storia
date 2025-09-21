"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Globe,
  Users,
  CheckCircle,
  Pause,
  BookOpen,
  Search,
} from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import AddAuthorModal from "./addAother";


interface Author {
  id: number
  name: string
  email: string
  bio: string
  website: string
  storiesCount: number
  status: "active" | "inactive"
  joinedAt: string
}

type AuthorFormData = Omit<Author, "id" | "storiesCount" | "status" | "joinedAt">






export default function AuthorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data - replace with actual API calls
  const [authors, setAuthors] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      bio: "Award-winning author with over 10 years of experience in fiction writing.",
      website: "https://johndoe.com",
      storiesCount: 5,
      status: "active",
      joinedAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      bio: "Mystery and thriller writer, known for her captivating plot twists.",
      website: "https://janesmith.com",
      storiesCount: 8,
      status: "active",
      joinedAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      bio: "Romance novelist specializing in contemporary love stories.",
      website: "",
      storiesCount: 3,
      status: "inactive",
      joinedAt: "2023-03-10",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: Column<(typeof authors)[0]>[] = [
    {
      key: "name",
      label: "Author",
      render: (value, item) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {item.bio}
          </div>
        </div>
      ),
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
              <a
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Website
              </a>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "storiesCount",
      label: "Stories",
      render: (value) => <Badge variant="outline">{value} stories</Badge>,
    },
   
    {
      key: "joinedAt",
      label: "Joined",
      render: (value) => <span className="text-muted-foreground">{value}</span>,
    },
  ];

 

const handleAddAuthor = async (formData: AuthorFormData) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // simulate API

  setAuthors(prev => [
    ...prev,
    {
      id: prev.length + 1, // temporary ID
      storiesCount: 0,
      status: "active",
      joinedAt: new Date().toISOString().split("T")[0],
      ...formData, // matches Author type
    },
  ])
}



  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Authors</h1>
            <p className="text-muted-foreground mt-2">
              Manage all authors on your platform
            </p>
          </div>
          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Author
          </Button>
        </div>

      

        {/* Authors Table */}
        <div className="bg-card rounded-lg">
          <div className="p-6 border-b border-border/20 mb-5">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search stories..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
             
            </div>
          </div>

          <DataTable
            data={authors}
            columns={columns}
            allActions={[
              {
                label: "Edit",
                icon: <Edit />,
                onClick: (story) => console.log("Edit", story),
              },
              {
                label: "Delete",
                icon: <Trash2 />,
                onClick: (author) =>
                  setAuthors((prev) => prev.filter((a) => a.id !== author.id)),
              },
            ]}
            emptyMessage="No authors found. Add your first author to get started!"
          />
        </div>
        {/* Add Author Modal */}
        <AddAuthorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAuthor}
        />
      </div>
    </DashboardLayout>
  );
}
