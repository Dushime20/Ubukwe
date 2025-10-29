"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Bell,
  Search,
} from "lucide-react"
import { AdminTabsSidebar } from "@/components/ui/admin-tabs-sidebar";
import { AdminOverview } from "@/components/admin/overview";
import { AdminUsers } from "@/components/admin/users";
import { AdminProviders } from "@/components/admin/providers";
import { AdminBookingsMetrics } from "@/components/admin/bookings";
import { AdminDisputes } from "@/components/admin/disputes";
import { AdminAnalytics } from "@/components/admin/analytics";
import { useAuth } from "@/hooks/useAuth";

export function AdminDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "overview"
  
  const [activeTab, setActiveTab] = useState(tabFromUrl)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const currentTab = searchParams.get("tab") || "overview"
    if (currentTab !== activeTab) {
      setActiveTab(currentTab)
    }
  }, [searchParams, activeTab])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`/admin/dashboard?tab=${tab}`, { scroll: false })
  }

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

  const users = [
    { id: 1, name: "Marie Uwimana", email: "marie@example.com", role: "Customer", status: "active", joined: "2024-01-15" },
    { id: 2, name: "Jean Baptiste", email: "jean@example.com", role: "Customer", status: "active", joined: "2024-02-20" },
    { id: 3, name: "Grace Mukamana", email: "grace@example.com", role: "Customer", status: "active", joined: "2024-03-01" },
  ]

  const pendingProviders = [
    { id: 1, name: "Amahoro Dance Troupe", service: "Dance", location: "Kigali", experience: "6-10 years", documents: "Complete", appliedDate: "2024-03-12" },
    { id: 2, name: "Heritage Decorations", service: "Decoration", location: "Musanze", experience: "2-5 years", documents: "Pending", appliedDate: "2024-03-10" },
  ]

  const disputes = [
    { id: 1, customer: "Grace Mukamana", provider: "Intore Cultural Group", issue: "Late arrival", date: "2024-03-10", status: "investigating", priority: "high" },
    { id: 2, customer: "Jean Baptiste", provider: "Kigali Catering", issue: "Food quality", date: "2024-03-12", status: "pending", priority: "medium" },
  ]

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const headerUser = {
    name: user ? `${user.firstName} ${user.lastName}` : "Admin",
    role: "Platform Administrator",
    avatar: user?.profilePicture,
    initials: user ? `${user.firstName?.[0]}${user.lastName?.[0]}` : "AD",
  }

  const headerActions = [
    { label: "Notifications", icon: <Bell className="h-4 w-4 mr-2" />, variant: "ghost" as const },
    { label: "Settings", icon: <Settings className="h-4 w-4 mr-2" />, variant: "outline" as const },
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
    <div className="min-h-screen bg-[#f9fafc]">
      {/* Desktop Sidebar */}
      <AdminTabsSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
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
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg overflow-y-auto">
            <div className="p-4 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Admin Dashboard</h2>
                  <p className="text-xs text-muted-foreground">Platform Management</p>
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
              <div className="flex-1 overflow-y-auto">
                <AdminTabsSidebar 
                  activeTab={activeTab} 
                  onTabChange={(tab) => {
                    handleTabChange(tab)
                    toggleMobileMenu()
                  }}
                  isCollapsed={false}
                  mobile={true}
                  user={user ? {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    avatar: user.profilePicture
                  } : undefined}
                  onLogout={logout}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 border-b bg-white shadow-sm w-full" role="banner">
          <div className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-muted/50 md:hidden flex-shrink-0"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-muted/50 hidden md:block flex-shrink-0"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                  <Avatar className="h-7 w-7 md:h-8 md:w-8 flex-shrink-0">
                    <AvatarImage src={headerUser.avatar} alt={headerUser.name} />
                    <AvatarFallback className="text-xs">{headerUser.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h1 className="text-base md:text-lg lg:text-xl font-semibold truncate">{headerUser.name}</h1>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{headerUser.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                {headerActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant={action.variant} 
                    size="sm" 
                    className={`text-xs md:text-sm ${index === 0 ? "hidden sm:flex" : ""}`} 
                    aria-label={action.label}
                  >
                    {action.icon}
                    <span className="hidden lg:inline">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto" role="main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

