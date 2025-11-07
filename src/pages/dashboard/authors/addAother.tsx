"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddAuthorMutation } from "@/Api/authorsApi";
import { toast } from "sonner";
import ImageUpload from "@/components/ImageUpload"; // ✅ Spinner-based uploader

interface AddAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAuthorModal({
  isOpen,
  onClose,
}: AddAuthorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    image_url: "",
  });

  const [addAuthor, { isLoading }] = useAddAuthorMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading("Adding author...");

    try {
      await addAuthor(formData).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Author added ✅");

      // Reset
      setFormData({
        name: "",
        bio: "",
        email: "",
        image_url: "",
      });
      onClose();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to add author!");
      console.error("Add Author Error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/20 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Author</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Name */}
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="Author name"
            required
          />

          {/* Bio */}
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="Short biography..."
            required
          />

          {/* Email */}
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="author@example.com"
            required
          />

          {/* ✅ Image Upload Section (Spinner-based) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <ImageUpload
              bucket="authors"
              onUploadComplete={(url) =>
                setFormData({ ...formData, image_url: url })
              }
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium flex-1"
            >
              {isLoading ? "Adding..." : "Add Author"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-card border border-border/20 px-3 py-2 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
