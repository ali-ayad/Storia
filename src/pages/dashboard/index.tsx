"use client"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import MainContent from "@/components/dashboard/MainContent"
import WithAuth from "@/components/dashboard/withAuth"

export default function DashboardPage() {
  return (
    <WithAuth>
      <DashboardLayout>
        <MainContent />
      </DashboardLayout>
    </WithAuth>
  )
}


