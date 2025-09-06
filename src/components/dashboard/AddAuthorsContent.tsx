"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const AddAuthorsContent: FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    website: "",
    socialMedia: ""
  })

  const [authors, setAuthors] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", stories: 5, status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", stories: 3, status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", stories: 7, status: "inactive" }
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Author data:", formData)
    // Add to authors list
    const newAuthor = {
      id: authors.length + 1,
      name: formData.name,
      email: formData.email,
      stories: 0,
      status: "active" as const
    }
    setAuthors(prev => [...prev, newAuthor])
    // Reset form
    setFormData({
      name: "",
      email: "",
      bio: "",
      website: "",
      socialMedia: ""
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Authors</h1>
        <p className="text-muted-foreground mt-2">Add new authors and manage existing ones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Author Form */}
        <div className="bg-card border border-border/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Author</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                Email *
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

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Website
              </label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://author-website.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="socialMedia" className="text-sm font-medium">
                Social Media
              </label>
              <Input
                id="socialMedia"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleInputChange}
                placeholder="@author_handle"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Biography
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about the author..."
                className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button type="submit" className="w-full">
              Add Author
            </Button>
          </form>
        </div>

        {/* Authors List */}
        <div className="bg-card border border-border/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Existing Authors</h3>
          <div className="space-y-3">
            {authors.map((author) => (
              <div key={author.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{author.name}</h4>
                    <Badge variant={author.status === "active" ? "default" : "secondary"}>
                      {author.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{author.email}</p>
                  <p className="text-xs text-muted-foreground">{author.stories} stories</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAuthorsContent
