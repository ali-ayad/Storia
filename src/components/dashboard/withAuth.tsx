"use client"

import { FC, ReactNode } from "react"
import { useAuth } from "@/hooks/useAuth"

interface WithAuthProps {
  children: ReactNode
}

const WithAuth: FC<WithAuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default WithAuth
