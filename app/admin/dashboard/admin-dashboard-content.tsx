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
import { DashboardHeader } from "@/components/ui/dashboard-header"
import { TranslatedText } from "@/components/translated-text";

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

  // Platform stats will be fetched by sub-components or in future iterations
  const platformStats = {
    totalUsers: 0,
    activeProviders: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    pendingApprovals: 0,
    activeDisputes: 0,
  }

  const recentActivity: any[] = []

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Header logic replaced by DashboardHeader

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminOverview platformStats={platformStats} recentActivity={recentActivity} />
      case "users":
        return <AdminUsers />
      case "providers":
        return <AdminProviders />
      case "bookings":
        return <AdminBookingsMetrics />
      case "disputes":
        return <AdminDisputes disputes={[]} />
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
          full_name: user.full_name || user.username,
          email: user.email,
          avatar: user.profile_image_url
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
                  <h2 className="text-lg font-bold text-foreground mb-1"><TranslatedText text="Admin Dashboard" /></h2>
                  <p className="text-xs text-muted-foreground"><TranslatedText text="Platform Management" /></p>
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
                    full_name: user.full_name || user.username,
                    email: user.email,
                    avatar: user.profile_image_url
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
        <DashboardHeader
          user={{
            full_name: user?.full_name || user?.username || "Admin",
            role: "Administrator",
            profile_image_url: user?.profile_image_url
          }}
          onLogout={logout}
          onToggleSidebar={toggleSidebar}
          onToggleMobileMenu={toggleMobileMenu}
          title="Admin Dashboard"
          subtitle="Platform Management"
        />

        {/* Content Area */}
        <main className="flex-1 p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto" role="main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

