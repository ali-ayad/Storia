"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Mail, Globe, Search } from "lucide-react";
import DataTable, { Column } from "@/components/dashboard/tables/DataTable";
import AddAuthorModal from "./addAother"; // your modal
import {
  useDeleteAuthorMutation,
  useGetAuthorsPaginatedQuery,
} from "@/Api/authorsApi";
import { DeletePopconfirm } from "@/components/DeletePopconfirm";
import { toast } from "sonner";
import Image from "next/image";

export default function AuthorsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const [deleteAuthor] = useDeleteAuthorMutation();
  const { data, isLoading } = useGetAuthorsPaginatedQuery({
    page,
    pageSize,
    search,
  });

  const authors = data?.data ?? [];
  const total = data?.count ?? 0;

  const handleDelete = async (id: string) => {
    const { error } = await deleteAuthor(id);

    if (error) {
      toast.error("Failed to delete author");
    } else {
      toast.success("Author deleted ✅");
    }
  };

  const columns: Column<(typeof authors)[0]>[] = [
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
      key: "name",
      label: "Name",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    {
      key: "bio",
      label: "Bio",
      render: (value) => (
        <span className="text-sm text-muted-foreground line-clamp-2">
          {value || "—"}
        </span>
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
        <span className="text-muted-foreground">{value?.split("T")[0]}</span>
      ),
    },
    {
      key: "actions", // ✅ UI-only column
      label: "Actions",
      width: "120px",
      render: (_value, author) => (
        <div className="flex gap-3 items-center">
          {/* Edit Action */}
          <button onClick={() => console.log("Edit", author)}>
            <Edit className="w-4 h-4 text-blue-500 cursor-pointer" />
          </button>

          {/* Delete Action */}
          <DeletePopconfirm
            title="Delete this author?"
            onConfirm={() => handleDelete(author.id)}
          />
        </div>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
            pagination={{
              page,
              pageSize,
              total,
              onPageChange: setPage,
            }}
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
