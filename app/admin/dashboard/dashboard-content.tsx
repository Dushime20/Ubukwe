"use client"

import { Suspense } from "react"
import { AdminDashboardContent } from "./admin-dashboard-content.js"

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f9fafc] flex items-center justify-center">Loading...</div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}

