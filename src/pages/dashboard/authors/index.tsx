"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Mail, Globe, Search } from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import AddAuthorModal from "./addAother"; // your modal
import {
  useGetAuthorsQuery,
  useDeleteAuthorMutation,
} from "@/Api/authorsApi";

export default function AuthorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: authors = [], isLoading, error } = useGetAuthorsQuery();
  const [deleteAuthor] = useDeleteAuthorMutation();

  const getStatusBadge = () => (
    <Badge variant="default">Active</Badge>
  );

  const columns: Column<typeof authors[0]>[] = [
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
         
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Joined",
      render: (value) => (
        <span className="text-muted-foreground">
          {value?.split("T")[0]}
        </span>
      ),
    },
  ];

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

          <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Author
          </Button>
        </div>

        {/* Search */}
        <div className="bg-card rounded-lg">
          <div className="p-6 border-b border-border/20 mb-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search authors..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/20 rounded-lg"
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            data={authors}
            columns={columns}
            loading={isLoading}
            allActions={[
              {
                label: "Edit",
                icon: <Edit />,
                onClick: (author) => console.log("Edit", author),
              },
              {
                label: "Delete",
                icon: <Trash2 />,
                onClick: async (author) => await deleteAuthor(author.id),
              },
            ]}
            emptyMessage="No authors yet. Add one to get started!"
          />
        </div>

        {/* Add Modal */}
        <AddAuthorModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
