"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, User } from "lucide-react"

interface AuthorFormData {
  name: string
  email: string
  bio: string
  website: string
  status: "active" | "inactive"
}

interface AuthorFormProps {
  initialData?: Partial<AuthorFormData>
  onSubmit: (data: AuthorFormData) => Promise<void>
  isSubmitting?: boolean
  submitLabel?: string
}

const AuthorForm: FC<AuthorFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save Author"
}) => {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: "",
    email: "",
    bio: "",
    website: "",
    status: "active",
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Author Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="website" className="text-sm font-medium">
          Website
        </label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium">
          Biography *
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Tell us about the author..."
          className="w-full min-h-[200px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          onClick={() => setFormData({
            name: "",
            email: "",
            bio: "",
            website: "",
            status: "active"
          })}
        >
          Clear Form
        </Button>
      </div>

      {/* Author Info */}
      <div className="bg-muted/30 rounded-md p-4">
        <h4 className="text-sm font-medium mb-2">Author Information</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 font-medium capitalize">{formData.status}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Bio Length:</span>
            <span className="ml-2 font-medium">{formData.bio.length} characters</span>
          </div>
          <div>
            <span className="text-muted-foreground">Has Website:</span>
            <span className="ml-2 font-medium">{formData.website ? "Yes" : "No"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email Valid:</span>
            <span className="ml-2 font-medium">
              {formData.email && formData.email.includes("@") ? "Yes" : "No"}
            </span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AuthorForm
