"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

function hasTokenCookie(): boolean {
  if (typeof document === "undefined") return false
  return document.cookie.split(";").some((c) => c.trim().startsWith("token="))
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    if (!hasTokenCookie()) {
      router.replace("/auth/login")
    }
  }, [router])

  if (!hasTokenCookie()) {
    return null
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mt-2">You are logged in.</p>
    </DashboardLayout>
  )
}


