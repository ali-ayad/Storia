"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WithAuth from "@/components/dashboard/withAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Search } from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import AddStoryModal from "./addStroy";
import {
  useDeleteStoryMutation,
  useGetStoriesPaginatedQuery,
  useGetStoriesQuery,
} from "@/Api/storiesApi";
import Image from "next/image";
import type { Story } from "@/Api/storiesApi";
import { toast } from "sonner";
import { DeletePopconfirm } from "@/components/DeletePopconfirm";

export default function StoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading } = useGetStoriesPaginatedQuery(
    { page, pageSize },
    { refetchOnMountOrArgChange: true }
  );

  const stories = data?.data ?? [];
  const total = data?.count ?? 0;

  const [deleteStory, { isLoading: deleting }] = useDeleteStoryMutation();

  const columns: Column<Story>[] = [
    {
      key: "index",
      label: "Order",
      width: "50px",
      render: (_value, _item, index) => <span>{(index ?? 0) + 1}</span>,
    },
    {
      key: "image_url",
      label: "Image",
      width: "70px",
      render: (value) =>
        value ? (
          <Dialog>
            <DialogTrigger asChild>
              <Image
                src={value as string}
                alt="author image"
                width={50}
                height={70}
                className="rounded-md object-cover border cursor-pointer transition-transform hover:scale-105"
                unoptimized
              />
            </DialogTrigger>

            <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none">
              <div className="flex justify-center items-center">
                <Image
                  src={value as string}
                  alt="Full preview"
                  width={500}
                  height={700}
                  className="rounded-lg object-contain"
                  unoptimized
                />
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <span className="text-muted-foreground text-sm">No image</span>
        ),
    },
    {
      key: "title",
      label: "Title",
      render: (value) => (
        <div className="font-medium">
          {typeof value === "string" ? value : ""}
        </div>
      ),
    },
    {
      key: "author_id",
      label: "Author",
      render: (_value, story) => (
        <span>{story.authors?.name ?? "Unknown"}</span>
      ),
    },
    {
      key: "created_at",
      label: "Created",
      render: (value) => {
        const date = new Date(value as string);
        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      width: "120px",
      render: (_value, story) => (
        <div className="flex gap-3 items-center">
          {/* Edit */}
          <button onClick={() => console.log("Edit", story)}>
            <Edit className="w-4 h-4 text-blue-500 cursor-pointer" />
          </button>

          {/* Delete with confirmation */}
          <DeletePopconfirm
            title="Delete this story?"
            onConfirm={() => handleDelete(story.id)}
          />
        </div>
      ),
    },
  ];
  const handleDelete = async (id: string) => {
    const { error } = await deleteStory(id);

    if (error) {
      toast.error("Delete failed");
    } else {
      toast.success("Story deleted ✅");
    }
  };

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
              pagination={{
                page,
                pageSize,
                total,
                onPageChange: setPage,
              }}
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
