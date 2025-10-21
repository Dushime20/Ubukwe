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
  Menu,
  Home,
  Package,
  BookOpen,
  User,
  ChevronLeft,
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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <ProviderTabsSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg">
            <div className="p-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Provider Dashboard</h2>
                  <p className="text-sm text-muted-foreground">Manage your services</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-muted/50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Overview", icon: <Home className="w-4 h-4" /> },
                  { id: "services", label: "My Services", icon: <Package className="w-4 h-4" /> },
                  { id: "bookings", label: "Bookings", icon: <BookOpen className="w-4 h-4" /> },
                  { id: "earnings", label: "Earnings", icon: <DollarSign className="w-4 h-4" /> },
                  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left text-sm px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
                    }`}
                  >
                    <span className="w-5 h-5">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-16 pt-6 border-t">
                <div>
                  <button className="w-full text-left bg-black text-white text-sm px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3">
                    Logout
                  </button>
                </div>
                <div className="text-xs text-muted-foreground text-center mt-5">
                  Ubukwe Platform
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-48'}`}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-muted/50 md:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="p-2 hover:bg-muted/50 hidden md:block"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={headerUser.avatar} />
                  <AvatarFallback>{headerUser.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold">{headerUser.name}</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">{headerUser.role}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              {headerActions.map((action, index) => (
                <Button key={index} variant={action.variant} size="sm" className={index === 0 ? "hidden sm:flex" : ""}>
                  {action.icon}
                  <span className="hidden md:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}