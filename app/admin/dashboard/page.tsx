"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Eye,
  Edit,
  Ban,
  MessageCircle,
  Star,
  Clock,
  UserCheck,
  Settings,
  BarChart3,
} from "lucide-react"
import { AdminTabsSidebar } from "@/components/ui/admin-tabs-sidebar";
import { AdminOverview } from "@/components/admin/overview";
import { AdminUsers } from "@/components/admin/users";
import { AdminProviders } from "@/components/admin/providers";
import { AdminBookingsMetrics } from "@/components/admin/bookings";
import { AdminDisputes } from "@/components/admin/disputes";
import { AdminAnalytics } from "@/components/admin/analytics";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock admin data
  const platformStats = {
    totalUsers: 1247,
    activeProviders: 89,
    totalBookings: 342,
    monthlyRevenue: 15600000, // RWF
    pendingApprovals: 12,
    activeDisputes: 3,
  }

  const recentActivity = [
    {
      id: 1,
      type: "new_provider",
      user: "Marie Uwimana",
      action: "Applied as Traditional Dancer",
      time: "2 hours ago",
      status: "pending",
    },
    {
      id: 2,
      type: "booking",
      user: "Jean Baptiste",
      action: "Booked MC Services",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "dispute",
      user: "Grace Mukamana",
      action: "Reported issue with catering service",
      time: "6 hours ago",
      status: "investigating",
    },
    {
      id: 4,
      type: "payment",
      user: "Emmanuel Nkurunziza",
      action: "Payment processed for venue booking",
      time: "8 hours ago",
      status: "completed",
    },
  ]

  const pendingProviders = [
    {
      id: 1,
      name: "Marie Uwimana",
      service: "Traditional Dancers",
      location: "Kigali",
      experience: "5 years",
      documents: "Complete",
      appliedDate: "2024-03-10",
    },
    {
      id: 2,
      name: "Joseph Habimana",
      service: "Wedding Photography",
      location: "Butare",
      experience: "8 years",
      documents: "Incomplete",
      appliedDate: "2024-03-12",
    },
    {
      id: 3,
      name: "Claudine Mukamana",
      service: "Catering Services",
      location: "Gisenyi",
      experience: "12 years",
      documents: "Complete",
      appliedDate: "2024-03-14",
    },
  ]

  const users = [
    {
      id: 1,
      name: "Jean Baptiste Niyonzima",
      email: "jean@example.com",
      type: "Customer",
      joinDate: "2024-01-15",
      status: "Active",
      bookings: 3,
    },
    {
      id: 2,
      name: "Marie Uwimana",
      email: "marie@example.com",
      type: "Provider",
      joinDate: "2024-02-20",
      status: "Active",
      bookings: 12,
    },
    {
      id: 3,
      name: "Grace Mukamana",
      email: "grace@example.com",
      type: "Customer",
      joinDate: "2024-03-01",
      status: "Suspended",
      bookings: 1,
    },
  ]

  const disputes = [
    {
      id: 1,
      customer: "Grace Mukamana",
      provider: "Kigali Catering Co.",
      issue: "Food quality concerns",
      date: "2024-03-15",
      status: "investigating",
      priority: "high",
    },
    {
      id: 2,
      customer: "Jean Baptiste",
      provider: "Heritage Decorations",
      issue: "Late delivery of decorations",
      date: "2024-03-14",
      status: "resolved",
      priority: "medium",
    },
    {
      id: 3,
      customer: "Emmanuel Nkurunziza",
      provider: "Intore Cultural Group",
      issue: "Billing discrepancy",
      date: "2024-03-13",
      status: "pending",
      priority: "low",
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview platformStats={platformStats} recentActivity={recentActivity} />
      case "users":
        return <AdminUsers users={users as any} />
      case "providers":
        return <AdminProviders pendingProviders={pendingProviders as any} />
      case "bookings":
        return <AdminBookingsMetrics />
      case "disputes":
        return <AdminDisputes disputes={disputes as any} />
      case "analytics":
        return <AdminAnalytics />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminTabsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col ml-48">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Ubukwe Platform Management</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
