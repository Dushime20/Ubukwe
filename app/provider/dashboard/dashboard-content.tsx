"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, ChevronLeft } from "lucide-react"
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
          <div className="fixed left-0 top-0 h-full w-64 bg-white border-r shadow-lg">
            {/* Mobile menu content - simplified for brevity */}
          </div>
        </div>
      )}

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        <header className="sticky top-0 z-40 border-b bg-white p-4 shadow-sm w-full" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-muted/50 md:hidden"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="p-2 hover:bg-muted/50 hidden md:block"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={headerUser.avatar} alt={headerUser.name} />
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
                <Button key={index} variant={action.variant} size="sm" className={index === 0 ? "hidden sm:flex" : ""} aria-label={action.label}>
                  {action.icon}
                  <span className="hidden md:inline">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto" role="main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

