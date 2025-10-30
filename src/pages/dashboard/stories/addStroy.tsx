"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddStoryMutation } from "@/Api/storiesApi";
import { useGetAuthorsQuery } from "@/Api/authorsApi"; // ✅ Fetch authors

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StoryFormData {
  title: string;
  content: string;
  author: string; // will store author_id
}

export default function AddStoryModal({ isOpen, onClose }: AddStoryModalProps) {
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    content: "",
    author: "",
  });

  const { data: authors = [] } = useGetAuthorsQuery(); // ✅ load authors

  const [addStory, { isLoading }] = useAddStoryMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStory = {
      title: formData.title,
      content: formData.content,
      author_id: formData.author, // ✅ Send author UUID!
    };

    try {
      await addStory(newStory).unwrap();
      setFormData({ title: "", content: "", author: "" });
      onClose();
    } catch (err) {
      console.error("Failed to add story:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/20 rounded-lg w-full max-w-md">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Story</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg text-sm"
              placeholder="Story title"
              required
            />
          </div>

          {/* ✅ Author Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <select
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg text-sm"
              placeholder="Enter story content..."
              required
            />
          </div>

          {/* Buttons */}
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
