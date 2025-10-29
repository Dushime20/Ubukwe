"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, ChevronLeft, Home, Package, BookOpen, MessageSquare, FileText, DollarSign, User, LogOut } from "lucide-react"
import { ProviderTabsSidebar } from "@/components/ui/provider-tabs-sidebar"
import { useAuth } from "@/hooks/useAuth"
import { ProviderOverview } from "@/components/provider/overview"
import { ProviderServices } from "@/components/provider/services"
import { ProviderBookings } from "@/components/provider/bookings"
import { ProviderEarnings } from "@/components/provider/earnings"
import { ProviderProfile } from "@/components/provider/profile"
import { InquiryManagement } from "@/components/provider/inquiry-management"
import { QuoteBuilder } from "@/components/provider/quote-builder"
import { AvailabilityCalendar } from "@/components/provider/availability-calendar"
import { AssetLibrary } from "@/components/provider/asset-library"
import { ProviderOnboardingForm } from "@/components/provider/onboarding-form"
import { ProviderContracts } from "@/components/provider/contracts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Plus } from "lucide-react"

export function ProviderDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab") || "overview"
  const inquiryId = searchParams.get("inquiryId")
  const customerId = searchParams.get("customerId")
  
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
    router.push(`/provider/dashboard?tab=${tab}`, { scroll: false })
  }

  const providerStats = {
    totalBookings: 24,
    monthlyEarnings: 850000,
    averageRating: 4.8,
    activeServices: 3,
  }

  const recentBookings = [
    { id: 1, client: "Marie Uwimana", service: "Traditional Dancers", date: "2024-03-15", status: "confirmed", amount: 120000 },
    { id: 2, client: "Jean Baptiste", service: "MC Services", date: "2024-03-22", status: "pending", amount: 80000 },
    { id: 3, client: "Grace Mukamana", service: "Traditional Dancers", date: "2024-04-05", status: "completed", amount: 150000 },
  ]

    const services = [
    { 
      id: 1, 
      title: "Traditional Intore Dancers", 
      category: "Entertainment", 
      location: "Kigali",
      priceRange: "120,000 - 200,000 RWF",
      priceRangeMin: 120000,
      priceRangeMax: 200000,
      bookings: 12, 
      rating: 4.9, 
      status: "active" as const,
      description: "Professional traditional Rwandan dancers specializing in Intore and cultural performances for weddings.",
      specialties: ["Intore Dance", "Cultural Music", "Traditional Costumes"],
      verified: true,
      packages: [
        {
          id: "1",
          name: "Basic Package",
          price: 120000,
          duration: "2 hours",
          description: "Perfect for intimate ceremonies",
          features: ["Traditional dance performance", "Up to 5 dancers", "Basic costumes", "2-hour performance"],
          popular: false,
        },
        {
          id: "2",
          name: "Standard Package",
          price: 180000,
          duration: "3 hours",
          description: "Most popular choice for weddings",
          features: ["Extended traditional dance performance", "Up to 8 dancers", "Premium costumes", "Live drumming", "3-hour performance", "Cultural storytelling"],
          popular: true,
        }
      ],
      gallery: [],
      phone: "+250 788 123 456",
      email: "contact@intoregroup.rw"
    },
    { 
      id: 2, 
      title: "Wedding MC Services", 
      category: "Entertainment", 
      location: "Kigali",
      priceRange: "80,000 - 120,000 RWF",
      priceRangeMin: 80000,
      priceRangeMax: 120000,
      bookings: 8, 
      rating: 4.7, 
      status: "active" as const,
      description: "Bilingual MC specializing in Rwandan wedding ceremonies and cultural traditions.",
      specialties: ["Bilingual Hosting", "Cultural Expertise", "Event Coordination"],
      verified: true,
    },
    { 
      id: 3, 
      title: "Cultural Music Performance", 
      category: "Entertainment", 
      location: "Kigali",
      priceRange: "100,000 - 180,000 RWF",
      priceRangeMin: 100000,
      priceRangeMax: 180000,
      bookings: 4, 
      rating: 4.8, 
      status: "draft" as const,
      description: "Traditional Rwandan musicians playing authentic instruments for wedding ceremonies.",
      specialties: ["Traditional Instruments", "Live Performances"],
    },
  ]

  const headerUser = {
    name: "Jean Mukamana",
    role: "Traditional Dance Provider",
    avatar: "/rwandan-traditional-dancer.jpg",
    initials: "JM",
  }

  const headerActions = [
    { label: "Messages", icon: <MessageCircle className="h-4 w-4 mr-2" />, variant: "outline" as const },
    { label: "Add Service", icon: <Plus className="h-4 w-4 mr-2" />, variant: "default" as const },
  ]

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <ProviderOverview providerStats={providerStats} recentBookings={recentBookings} />
      case "services": return <ProviderServices services={services} />
      case "bookings": return <ProviderBookings bookings={recentBookings as any} />
      case "inquiries": return (
        <InquiryManagement 
          onSendQuote={(inqId, custId) => {
            router.push(`/provider/dashboard?tab=quotes&inquiryId=${inqId}&customerId=${custId}`, { scroll: false })
          }}
        />
      )
      case "quotes": return <QuoteBuilder customerId={customerId || undefined} inquiryId={inquiryId || undefined} />
      
      case "contracts": return <ProviderContracts />
      case "onboarding": return <ProviderOnboardingForm />
      case "earnings": return <ProviderEarnings recentCompleted={recentBookings.filter((b) => b.status === "completed")} />
      case "profile": return <ProviderProfile />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] flex">
      <ProviderTabsSidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        user={user ? { firstName: user.firstName, lastName: user.lastName, email: user.email, avatar: user.profilePicture } : undefined}
        onLogout={logout}
      />

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu} aria-hidden="true" />
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg overflow-y-auto">
            <div className="p-4 h-full flex flex-col">
              <div className="mb-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Provider Dashboard</h2>
                  <p className="text-xs text-muted-foreground">Manage your services</p>
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
              
              <nav className="flex-1 overflow-y-auto space-y-3 pt-2">
                {[
                  {
                    title: "Overview",
                    items: [
                      { id: "overview", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
                      { id: "onboarding", label: "Onboarding", icon: <FileText className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Services",
                    items: [
                      { id: "services", label: "My Services", icon: <Package className="w-4 h-4" /> },
                      { id: "bookings", label: "Bookings", icon: <BookOpen className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "CRM",
                    items: [
                      { id: "inquiries", label: "Inquiries", icon: <MessageSquare className="w-4 h-4" /> },
                      { id: "quotes", label: "Quotes", icon: <FileText className="w-4 h-4" /> },
                      { id: "contracts", label: "Contracts", icon: <FileText className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Business",
                    items: [
                      { id: "earnings", label: "Earnings", icon: <DollarSign className="w-4 h-4" /> },
                      { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                    ]
                  }
                ].map((group) => (
                  <div key={group.title} className="space-y-1">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-1">
                      {group.title}
                    </h3>
                    <div className="space-y-0.5">
                      {group.items.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            handleTabChange(tab.id);
                            toggleMobileMenu();
                          }}
                          className={`relative w-full text-left text-sm px-3 py-2.5 rounded-md transition-all duration-200 flex items-center gap-3 ${
                            activeTab === tab.id
                              ? "bg-muted text-foreground shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-full ${activeTab === tab.id ? 'bg-primary' : 'bg-transparent'}`} />
                          <span className="w-4 h-4 flex-shrink-0">{tab.icon}</span>
                          <span className="font-medium truncate">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {user && (
                <div className="flex-shrink-0 pt-4 border-t border-border/50 mt-4">
                  <div className="mb-4 px-3">
                    <div className="flex items-center p-3 rounded-lg bg-muted/30 min-w-0">
                      <div className="flex items-center space-x-3 flex-1 min-w-0 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (logout) logout();
                          toggleMobileMenu();
                        }}
                        className="ml-2 p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200 flex-shrink-0"
                        title="Logout"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
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
                  <Button key={index} variant={action.variant} size="sm" className={`text-xs md:text-sm ${index === 0 ? "hidden sm:flex" : ""}`} aria-label={action.label}>
                    {action.icon}
                    <span className="hidden lg:inline">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto" role="main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

