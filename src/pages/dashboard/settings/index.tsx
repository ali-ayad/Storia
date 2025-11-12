"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw, Bell, Shield, Palette, Globe } from "lucide-react"
import WithAuth from "@/components/dashboard/withAuth"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Storia",
    siteDescription: "A platform for sharing amazing stories",
    siteUrl: "https://storia.com",
    allowRegistration: true,
    emailNotifications: true,
    maintenanceMode: false,
    theme: "light",
    maxStoriesPerAuthor: 50,
    moderationRequired: false
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Settings saved:", settings)
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
  
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your platform settings and preferences</p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5" />
                <h3 className="text-lg font-semibold">General Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="siteName" className="text-sm font-medium">
                      Site Name
                    </label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="siteUrl" className="text-sm font-medium">
                      Site URL
                    </label>
                    <Input
                      id="siteUrl"
                      name="siteUrl"
                      value={settings.siteUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="siteDescription" className="text-sm font-medium">
                    Site Description
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                    className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
              </div>
            </div>

            {/* User Settings */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5" />
                <h3 className="text-lg font-semibold">User Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow User Registration</div>
                    <div className="text-sm text-muted-foreground">Allow new users to register on your platform</div>
                  </div>
                  <input
                    type="checkbox"
                    name="allowRegistration"
                    checked={settings.allowRegistration}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-input"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Moderation Required</div>
                    <div className="text-sm text-muted-foreground">Require approval for new stories</div>
                  </div>
                  <input
                    type="checkbox"
                    name="moderationRequired"
                    checked={settings.moderationRequired}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maxStoriesPerAuthor" className="text-sm font-medium">
                    Max Stories Per Author
                  </label>
                  <Input
                    id="maxStoriesPerAuthor"
                    name="maxStoriesPerAuthor"
                    type="number"
                    value={settings.maxStoriesPerAuthor}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-muted-foreground">Send email notifications for important events</div>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-input"
                  />
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="h-5 w-5" />
                <h3 className="text-lg font-semibold">System Settings</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">Put the site in maintenance mode</div>
                  </div>
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-input"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="theme" className="text-sm font-medium">
                    Theme
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Save Actions */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full gap-2"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
                <Button variant="outline" className="w-full">
                  Reset to Defaults
                </Button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-card border border-border/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={settings.maintenanceMode ? "secondary" : "default"}>
                    {settings.maintenanceMode ? "Maintenance" : "Online"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registration:</span>
                  <Badge variant={settings.allowRegistration ? "default" : "secondary"}>
                    {settings.allowRegistration ? "Open" : "Closed"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Moderation:</span>
                  <Badge variant={settings.moderationRequired ? "default" : "secondary"}>
                    {settings.moderationRequired ? "Required" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
