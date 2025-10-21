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
  Menu,
  Home,
  Briefcase,
  BookOpen,
  ShieldAlert,
  ChevronLeft,
} from "lucide-react"
import { AdminTabsSidebar } from "@/components/ui/admin-tabs-sidebar";
import { AdminOverview } from "@/components/admin/overview";
import { AdminUsers } from "@/components/admin/users";
import { AdminProviders } from "@/components/admin/providers";
import { AdminBookingsMetrics } from "@/components/admin/bookings";
import { AdminDisputes } from "@/components/admin/disputes";
import { AdminAnalytics } from "@/components/admin/analytics";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AdminTabsSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        user={user ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.profilePicture
        } : undefined}
        onLogout={logout}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg">
            <div className="p-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h2>
                  <p className="text-sm text-muted-foreground">Platform Management</p>
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
                  { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
                  { id: "providers", label: "Providers", icon: <Briefcase className="w-4 h-4" /> },
                  { id: "bookings", label: "Bookings", icon: <BookOpen className="w-4 h-4" /> },
                  { id: "disputes", label: "Disputes", icon: <ShieldAlert className="w-4 h-4" /> },
                  { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
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

              <div className="mt-10 pt-6 border-t">
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
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
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
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-lg md:text-xl font-semibold">Admin Dashboard</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">Ubukwe Platform Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Reports</span>
              </Button>
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