"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddStoryMutation } from "@/Api/storiesApi";
import { useGetAuthorsQuery } from "@/Api/authorsApi";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
 // ✅ Sonner Toast

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStoryModal({ isOpen, onClose }: AddStoryModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: authors = [] } = useGetAuthorsQuery();
  const [addStory, { isLoading }] = useAddStoryMutation();

  if (!isOpen) return null;

  const handleImageUpload = async () => {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `stories/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("stories")
      .upload(filePath, imageFile);

    if (uploadError) {
      toast.error("❌ Image upload failed!");
      console.error("Upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("stories")
      .getPublicUrl(filePath);

    return urlData?.publicUrl ?? null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let image_url = null;
    if (imageFile) {
      const uploadToast = toast.loading("Uploading image...");
      image_url = await handleImageUpload();
      toast.dismiss(uploadToast);

      if (!image_url) return; // ✅ Stop if upload failed
    }

    const newStory = {
      title: formData.title,
      content: formData.content,
      author_id: formData.author,
      image_url,
    };

    try {
      const promise = addStory(newStory).unwrap();

    

      await promise;
toast.success("Story added ✅");
      setFormData({ title: "", content: "", author: "" });
      setImageFile(null);
      setImagePreview(null);
      onClose();
    } catch (err) {
      console.error("Failed to add story:", err);
      toast.error("❌ Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/20 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Story</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg text-sm"
            placeholder="Story title"
            required
          />

          <select
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg text-sm"
            required
          >
            <option value="">Select author...</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>

          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg text-sm"
            placeholder="Enter content..."
            required
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Story Image
            </label>
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
              {isLoading ? "Adding..." : "Add Story"}
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
