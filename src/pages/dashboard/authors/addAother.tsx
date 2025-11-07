"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddAuthorMutation } from "@/Api/authorsApi";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner"; // ✅ Correct toast import

interface AddAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAuthorModal({ isOpen, onClose }: AddAuthorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [addAuthor, { isLoading }] = useAddAuthorMutation();

  if (!isOpen) return null;

  // ✅ Upload image to Supabase storage
  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `authors/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("authors")
      .upload(filePath, imageFile);

    if (uploadError) {
      toast.error("❌ Image upload failed!");
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("authors")
      .getPublicUrl(filePath);

    return urlData?.publicUrl ?? null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loadingToast = toast.loading("Adding author...");

    let image_url = null;
    if (imageFile) {
      image_url = await handleImageUpload();
      if (!image_url) {
        toast.dismiss(loadingToast);
        return; // stop on upload failure
      }
    }

    try {
      await addAuthor({ ...formData, image_url }).unwrap();

      toast.dismiss(loadingToast);
      toast.success("Author added ✅");

      setFormData({ name: "", bio: "", email: "" });
      setImageFile(null);
      setImagePreview(null);
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
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Author</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="Author name"
            required
          />

          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="Short biography..."
            required
          />

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="author@example.com"
            required
          />

          {/* ✅ Image upload section */}
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                setImagePreview(file ? URL.createObjectURL(file) : null);
              }}
              className="w-full text-sm"
            />
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg border"
            />
          )}

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
