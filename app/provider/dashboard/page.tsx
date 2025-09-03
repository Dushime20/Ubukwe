"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  DollarSign,
  Users,
  Star,
  Plus,
  Edit,
  Eye,
  MessageCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import { ProviderTabsSidebar } from "@/components/ui/provider-tabs-sidebar";
import { ProviderOverview } from "@/components/provider/overview";
import { ProviderServices } from "@/components/provider/services";
import { ProviderBookings } from "@/components/provider/bookings";
import { ProviderEarnings } from "@/components/provider/earnings";
import { ProviderProfile } from "@/components/provider/profile";

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data - in real app this would come from API
  const providerStats = {
    totalBookings: 24,
    monthlyEarnings: 850000, // RWF
    averageRating: 4.8,
    activeServices: 3,
  }

  const recentBookings = [
    {
      id: 1,
      client: "Marie Uwimana",
      service: "Traditional Dancers",
      date: "2024-03-15",
      status: "confirmed",
      amount: 120000,
    },
    {
      id: 2,
      client: "Jean Baptiste",
      service: "MC Services",
      date: "2024-03-22",
      status: "pending",
      amount: 80000,
    },
    {
      id: 3,
      client: "Grace Mukamana",
      service: "Traditional Dancers",
      date: "2024-04-05",
      status: "completed",
      amount: 150000,
    },
  ]

  const services = [
    {
      id: 1,
      title: "Traditional Intore Dancers",
      category: "Dance",
      price: "120,000 RWF",
      bookings: 12,
      rating: 4.9,
      status: "active",
    },
    {
      id: 2,
      title: "Wedding MC Services",
      category: "Entertainment",
      price: "80,000 RWF",
      bookings: 8,
      rating: 4.7,
      status: "active",
    },
    {
      id: 3,
      title: "Cultural Music Performance",
      category: "Music",
      price: "100,000 RWF",
      bookings: 4,
      rating: 4.8,
      status: "draft",
    },
  ]

  const headerUser = {
    name: "Jean Mukamana",
    role: "Traditional Dance Provider",
    avatar: "/rwandan-traditional-dancer.jpg",
    initials: "JM",
  }

  const headerActions = [
    {
      label: "Messages",
      icon: <MessageCircle className="h-4 w-4 mr-2" />,
      variant: "outline" as const,
    },
    {
      label: "Add Service",
      icon: <Plus className="h-4 w-4 mr-2" />,
      variant: "default" as const,
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <ProviderOverview providerStats={providerStats} recentBookings={recentBookings} />
        )

      case "services":
        return (
          <ProviderServices services={services} />
        )

      case "bookings":
        return (
          <ProviderBookings bookings={recentBookings as any} />
        )

      case "earnings":
        return (
          <ProviderEarnings recentCompleted={recentBookings.filter((b) => b.status === "completed")} />
        )

      case "profile":
        return (
          <ProviderProfile />
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <ProviderTabsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col ml-48">
        <DashboardHeader user={headerUser} actions={headerActions} showSearch={true} showNotifications={true} showSettings={true} />
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
