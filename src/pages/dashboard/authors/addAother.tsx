"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AddAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    bio: string;
    email: string;
    website: string;
  }) => void;
}

export default function AddAuthorModal({ isOpen, onClose, onSubmit }: AddAuthorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    website: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: "", bio: "", email: "", website: "" }) // reset form
    onClose()
  }

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="Author name"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="Short biography..."
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="author@example.com"
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="https://example.com"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-1"
            >
              Add Author
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-card border border-border/20 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
