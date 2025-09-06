"use client"

import { FC, ReactNode, useState } from "react"
import Link from "next/link"
import Sidebar from "./Sidebar"
import MainContent from "./MainContent"
import AddStoriesContent from "./AddStoriesContent"
import AddAuthorsContent from "./AddAuthorsContent"

interface Props {
  children?: ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("main")

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return <MainContent />
      case "add-stories":
        return <AddStoriesContent />
      case "add-authors":
        return <AddAuthorsContent />
      default:
        return children || <MainContent />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Nav */}
      <header className="border-b border-border/20 bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold">Dashboard</Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/dashboard">Home</Link>
            <Link href="/">Public Site</Link>
            <button
              onClick={() => {
                document.cookie = "token=; path=/; max-age=0"
                window.location.href = "/auth/login"
              }}
              className="hover:text-foreground"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout


