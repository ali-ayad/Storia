"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AddStoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: {
    title: string
    author: string
    genre: string
    content: string
  }) => void
}

export default function AddStoryModal({ isOpen, onClose, onSubmit }: AddStoryModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    content: "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ title: "", author: "", genre: "", content: "" }) // reset form
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border/20 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <h2 className="text-lg font-semibold">Add New Story</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="Story title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <select
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              required
            >
              <option value="">Select author</option>
              <option value="elena-shadowmere">Elena Shadowmere</option>
              <option value="marcus-nightfall">Marcus Nightfall</option>
              <option value="aria-stormwind">Aria Stormwind</option>
              <option value="theron-blackwood">Theron Blackwood</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              required
            >
              <option value="">Select genre</option>
              <option value="Epic Fantasy">Epic Fantasy</option>
              <option value="Dark Fantasy">Dark Fantasy</option>
              <option value="High Fantasy">High Fantasy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Story Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-background border border-border/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
              placeholder="Enter story content..."
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-1"
            >
              Add Story
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
