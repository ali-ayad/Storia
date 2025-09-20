"use client"

import { ReactNode } from "react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import WithAuth from "@/components/dashboard/withAuth"

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <WithAuth>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </WithAuth>
  )
}
