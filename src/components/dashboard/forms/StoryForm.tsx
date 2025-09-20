"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, Eye } from "lucide-react"

interface StoryFormData {
  title: string
  author: string
  description: string
  content: string
  category: string
  status: "draft" | "published"
}

interface StoryFormProps {
  initialData?: Partial<StoryFormData>
  onSubmit: (data: StoryFormData) => Promise<void>
  onPreview?: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

const StoryForm: FC<StoryFormProps> = ({
  initialData = {},
  onSubmit,
  onPreview,
  isSubmitting = false,
  submitLabel = "Save Story"
}) => {
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    author: "",
    description: "",
    content: "",
    category: "",
    status: "draft",
    ...initialData
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const wordCount = formData.content.split(" ").filter(word => word.length > 0).length
  const characterCount = formData.content.length

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Story Title *
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter story title"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="author" className="text-sm font-medium">
            Author *
          </label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Enter author name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">Select category</option>
            <option value="Adventure">Adventure</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of the story"
          className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Story Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your story here..."
          className="w-full min-h-[400px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        {onPreview && (
          <Button type="button" variant="outline" onClick={onPreview} className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        )}
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => setFormData({
            title: "",
            author: "",
            description: "",
            content: "",
            category: "",
            status: "draft"
          })}
        >
          Clear Form
        </Button>
      </div>

      {/* Story Stats */}
      <div className="bg-muted/30 rounded-md p-4">
        <h4 className="text-sm font-medium mb-2">Story Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Word Count:</span>
            <span className="ml-2 font-medium">{wordCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Character Count:</span>
            <span className="ml-2 font-medium">{characterCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Reading Time:</span>
            <span className="ml-2 font-medium">~{Math.ceil(wordCount / 200)} min</span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 font-medium capitalize">{formData.status}</span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default StoryForm
