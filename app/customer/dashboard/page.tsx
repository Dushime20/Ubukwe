"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Search, Menu, Home, CheckCircle, Star, BookOpen, DollarSign, ChevronLeft, Users, Clock, MapPin, Camera, FileText, ShieldAlert, LogOut } from "lucide-react";
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Planning } from "@/components/dashboard/planning";
import { Services } from "@/components/dashboard/services";
import { Bookings } from "@/components/dashboard/bookings";
import BudgetAnlyo from "@/components/dashboard/budget-anlyo";
import { ComprehensivePlanning } from "@/components/dashboard/comprehensive-planning";
import { VendorMarketplace } from "@/components/dashboard/vendor-marketplace";
import { GuestManagement } from "@/components/dashboard/guest-management";
import { MessagesHub } from "@/components/dashboard/messages-hub";
import { WeddingInspiration } from "@/components/dashboard/wedding-inspiration";
import { ComingSoon } from "@/components/ui/coming-soon";
import { useAuth } from "@/hooks/useAuth";
import { CustomerQuotes } from "@/components/customer/quotes";
import { CustomerContractsView } from "@/components/customer/contracts-view";
import { CustomerDisputesView } from "@/components/customer/disputes-view";
import { ReviewForm } from "@/components/reviews/review-form";
import { CustomerBookingWizard } from "@/components/customer/booking-wizard";
import { CustomerContractSign } from "@/components/customer/contract-sign";

export default function CustomerDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get("tab") || "overview";
  
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Sync URL with activeTab
  useEffect(() => {
    const currentTab = searchParams.get("tab") || "overview";
    if (currentTab !== activeTab) {
      setActiveTab(currentTab);
    }
  }, [searchParams, activeTab]);

  // Update URL when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    router.push(`/customer/dashboard?tab=${tab}`, { scroll: false });
  };

  // Mock wedding data
  const weddingDetails = {
    coupleName: "Marie & Jean",
    weddingDate: "2024-06-15",
    venue: "Kigali Serena Hotel",
    guestCount: 150,
    budget: 5000000, // RWF
    spent: 2800000,
  };

  const planningProgress = {
    completed: 8,
    total: 12,
    percentage: 67,
  };

  const checklist = [
    { id: 1, task: "Book venue", completed: true, category: "Venue" },
    { id: 2, task: "Hire traditional dancers", completed: true, category: "Entertainment" },
    { id: 3, task: "Select wedding MC", completed: true, category: "Entertainment" },
    { id: 4, task: "Choose decorations", completed: false, category: "Decor" },
    { id: 5, task: "Finalize catering menu", completed: false, category: "Food" },
    { id: 6, task: "Book photographer", completed: true, category: "Photography" },
    { id: 7, task: "Order wedding cake", completed: false, category: "Food" },
    { id: 8, task: "Send invitations", completed: true, category: "Planning" },
  ];

  const bookings = [
    {
      id: 1,
      provider: "Intore Cultural Group",
      service: "Traditional Dancers",
      date: "2024-06-15",
      status: "confirmed",
      amount: 120000,
      rating: 4.9,
    },
    {
      id: 2,
      provider: "Emmanuel MC Services",
      service: "Wedding MC",
      date: "2024-06-15",
      status: "confirmed",
      amount: 80000,
      rating: 4.8,
    },
    {
      id: 3,
      provider: "Kigali Serena Hotel",
      service: "Wedding Venue",
      date: "2024-06-15",
      status: "confirmed",
      amount: 800000,
      rating: 4.7,
    },
  ];

  const recommendedServices = [
    {
      id: 1,
      provider: "Rwandan Delights Catering",
      service: "Traditional Wedding Catering",
      price: "150,000 RWF",
      rating: 4.9,
      reviews: 45,
      category: "Food",
      icon: <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">🍽️</div>,
    },
    {
      id: 2,
      provider: "Heritage Decorations",
      service: "Traditional Wedding Decor",
      price: "200,000 RWF",
      rating: 4.8,
      reviews: 32,
      category: "Decor",
      icon: <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">🎨</div>,
    },
    {
      id: 3,
      provider: "Kinyarwanda Music Ensemble",
      service: "Traditional Wedding Music",
      price: "100,000 RWF",
      rating: 4.9,
      reviews: 28,
      category: "Music",
      icon: <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center">🎵</div>,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Overview
            weddingDetails={weddingDetails}
            planningProgress={planningProgress}
            checklist={checklist}
            recommendedServices={recommendedServices}
          />
        );

      case "vendors":
        return <VendorMarketplace />;

      case "planning":
        return <ComprehensivePlanning />;

      case "guests":
        return <GuestManagement />;

      case "bookings":
        return <Bookings bookings={bookings} />;

      case "budget":
        return <BudgetAnlyo />;

      case "messages":
        return <MessagesHub />;

      case "inspiration":
        return <WeddingInspiration />;

      case "quotes":
        return <CustomerQuotes />;

      case "contracts":
        return <CustomerContractsView />;

      case "contract-sign":
        return <CustomerContractSign />;

      case "disputes":
        return <CustomerDisputesView />;

      case "reviews":
        return <ReviewForm bookingId="BK-2024-001" serviceName="Traditional Dancers" providerName="Intore Cultural Group" />;

      case "booking":
        return <CustomerBookingWizard />;

      default:
        return null;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#f9fafc]">
      {/* Desktop Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        userRole="Customer"
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
                  <h2 className="text-lg font-bold text-foreground mb-1">Dashboard</h2>
                  <p className="text-xs text-muted-foreground">Customer Portal</p>
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
                    ]
                  },
                  {
                    title: "Planning",
                    items: [
                      { id: "planning", label: "Planning & Timeline", icon: <CheckCircle className="w-4 h-4" /> },
                      { id: "guests", label: "Guest Management", icon: <Users className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Services & Vendors",
                    items: [
                      { id: "vendors", label: "Find Vendors", icon: <Star className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Management",
                    items: [
                      { id: "bookings", label: "My Bookings", icon: <BookOpen className="w-4 h-4" /> },
                      { id: "budget", label: "Budget Anlyo", icon: <DollarSign className="w-4 h-4" /> },
                      { id: "messages", label: "Messages", icon: <MessageCircle className="w-4 h-4" /> },
                      { id: "quotes", label: "Quotes", icon: <FileText className="w-4 h-4" /> },
                      { id: "contracts", label: "Contracts", icon: <FileText className="w-4 h-4" /> },
                      { id: "disputes", label: "Disputes", icon: <ShieldAlert className="w-4 h-4" /> },
                      { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Inspiration",
                    items: [
                      { id: "inspiration", label: "Wedding Ideas", icon: <Heart className="w-4 h-4" /> },
                    ]
                  }
                ].map((group, groupIndex) => (
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
                            setIsMobileMenuOpen(false);
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

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ml-0 ${isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
        {/* Sticky Header */}
        <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
          <div className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-2 hover:bg-muted/50 md:hidden flex-shrink-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="p-2 hover:bg-muted/50 hidden md:block flex-shrink-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2 min-w-0">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <h1 className="text-base md:text-lg lg:text-xl font-semibold truncate">{weddingDetails.coupleName}</h1>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {new Date(weddingDetails.weddingDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
                <Button variant="outline" size="sm" className="hidden sm:flex text-xs md:text-sm">
                  <MessageCircle className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden lg:inline">Messages</span>
                </Button>
                <Button size="sm" className="text-xs md:text-sm">
                  <Search className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Find Services</span>
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}