"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import WithAuth from "@/components/dashboard/withAuth";
import AddStoryModal from "./addStroy";
import { useGetStoriesQuery } from "@/Api/storiesApi";

export default function StoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

 

   const { data: stories, error, isLoading } = useGetStoriesQuery();

    console.log(stories)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="default">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const columns: Column<typeof stories[0]>[] = [
    {
      key: "title",
      label: "Title",
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: "author",
      label: "Author",
      render: (value) => <span className="text-muted-foreground">{value}</span>,
    },
    {
      key: "category",
      label: "Category",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "status",
      label: "Status",
      render: (value) => getStatusBadge(value),
    },
    {
      key: "views",
      label: "Views",
      render: (value) => (
        <span className="text-muted-foreground">{value}</span>
      ),
    },
    {
      key: "created_at",
      label: "Created",
      render: (value) => <span className="text-muted-foreground">{value}</span>,
    },
  ];

  // const handleAddStory = (formData: any) => {
  //   console.log("New story:", formData);
  //   // Optionally add to state:
  //   setStories((prev) => [
  //     ...prev,
  //     { ...formData, id: prev.length + 1, views: 0, createdAt: new Date().toISOString(), status: "draft" },
  //   ]);
  // };

 

  return (
    <WithAuth>
      <DashboardLayout>
        <div className="space-y-6 mt-7">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Stories Management</h1>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
            >
              <Plus className="w-4 h-4 " />
              Add Story
            </Button>
          </div>

          {/* Stories Table */}
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
              data={stories}
              columns={columns}
              allActions={[
                {
                  label: "Edit",
                  icon: <Edit />,
                  onClick: (story) => console.log("Edit", story),
                },
                // {
                //   label: "Delete",
                //   icon: <Trash2 />,
                
                //   onClick: (story) =>
                //     setStories((prev) =>
                //       prev.filter((s) => s.id !== story.id)
                //     ),
                // },
              ]}
              expandableRow={(story) => (
                <div className="p-4 bg-background/50 rounded-lg border border-border/10">
                  <h4 className="font-semibold mb-2 text-primary">
                    Story Content:
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {story.content}
                  </p>
                </div>
              )}
            />
          </div>

          {/* Add Story Modal */}
          <AddStoryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // onSubmit={handleAddStory}
          />
        </div>
      </DashboardLayout>
    </WithAuth>
  );
}
