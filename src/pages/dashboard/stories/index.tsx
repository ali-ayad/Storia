"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WithAuth from "@/components/dashboard/withAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Search } from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import AddStoryModal from "./addStroy";
import { useGetStoriesQuery } from "@/Api/storiesApi";

export default function StoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: stories = [], isLoading, error } = useGetStoriesQuery();
  console.log("📌 Stories fetched:", stories);

  const columns: Column<(typeof stories)[0]>[] = [
    {
      key: "title",
      label: "Title",
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
  key: "author_id",
  label: "Author",
  render: (_, story: any) => story.authors?.name ?? "Unknown",
},

    {
      key: "created_at",
      label: "Created",
      render: (value) => (
        <span className="text-muted-foreground">
          {value?.split("T")[0]}
        </span>
      ),
    },
  ];

  return (
    <WithAuth>
      <DashboardLayout>
        <div className="space-y-6 mt-7">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Stories Management</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Story
            </Button>
          </div>

          {/* Table */}
          <div className="bg-card rounded-lg">
            {/* Search */}
            <div className="p-6 border-b border-border/20 mb-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border/20 rounded-lg focus:ring-primary/20 transition"
                />
              </div>
            </div>

            {/* ✅ Loading + Expandable Content Support */}
            <DataTable
              data={stories}
              columns={columns}
              loading={isLoading}
              expandableRow={(story) => (
                <div className="p-4 bg-background/50 rounded-lg border border-border/10">
                  <h4 className="font-semibold mb-2 text-primary">
                    Story Content
                  </h4>
                  <p className="text-muted-foreground">{story.content}</p>
                </div>
              )}
              allActions={[
                {
                  label: "Edit",
                  icon: <Edit className="w-4 h-4" />,
                  onClick: (story) => console.log("Edit", story),
                },
              ]}
              emptyMessage="No stories found. Add your first story!"
            />
          </div>

          {/* Add Story Modal */}
          <AddStoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </DashboardLayout>
    </WithAuth>
  );
}
