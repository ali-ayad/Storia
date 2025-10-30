"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useAddAuthorMutation } from "@/Api/authorsApi"; // ✅ IMPORT MUTATION

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

  const [addAuthor, { isLoading, isSuccess, error }] = useAddAuthorMutation(); // ✅

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addAuthor(formData); // ✅ INSERT INTO SUPABASE

    // Reset & close modal
    setFormData({ name: "", bio: "", email: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/20 rounded-lg w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Author</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* INPUTS */}
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg"
            placeholder="author@example.com"
            required
          />

      
        

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

          {/* ✅ Feedback messages */}
          {/* {isSuccess && <p className="text-green-500 text-xs pt-1">Author added ✅</p>}
          {error && <p className="text-red-500 text-xs pt-1">Error adding author ❌</p>} */}
        </form>
      </div>
    </div>
  );
}
