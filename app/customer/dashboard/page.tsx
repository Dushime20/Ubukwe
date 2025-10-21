"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Search, Menu, Home, CheckCircle, Star, BookOpen, DollarSign, ChevronLeft, Users, Clock, MapPin, Camera } from "lucide-react";
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Planning } from "@/components/dashboard/planning";
import { Services } from "@/components/dashboard/services";
import { Bookings } from "@/components/dashboard/bookings";
import { Budget } from "@/components/dashboard/budget";
import { ComprehensivePlanning } from "@/components/dashboard/comprehensive-planning";
import { VendorMarketplace } from "@/components/dashboard/vendor-marketplace";
import { GuestManagement } from "@/components/dashboard/guest-management";
import { VenueManagement } from "@/components/dashboard/venue-management";
import { MessagesHub } from "@/components/dashboard/messages-hub";
import { WeddingInspiration } from "@/components/dashboard/wedding-inspiration";
import { PhotographyBooking } from "@/components/dashboard/photography-booking";
import { ComingSoon } from "@/components/ui/coming-soon";
import { useAuth } from "@/hooks/useAuth";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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

      case "venue":
        return <VenueManagement />;

      case "bookings":
        return <Bookings bookings={bookings} />;

      case "budget":
        return <Budget weddingDetails={weddingDetails} />;

      case "messages":
        return <MessagesHub />;

      case "inspiration":
        return <WeddingInspiration />;

      case "photography":
        return <PhotographyBooking />;

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
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
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
          <div className="fixed left-0 top-0 h-full w-64 bg-card border-r shadow-lg">
            <div className="p-4">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Dashboard</h2>
                  <p className="text-sm text-muted-foreground">Customer Portal</p>
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
              
              <nav className="space-y-4">
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
                      { id: "venue", label: "Venue & Location", icon: <MapPin className="w-4 h-4" /> },
                      { id: "photography", label: "Photography", icon: <Camera className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Management",
                    items: [
                      { id: "bookings", label: "My Bookings", icon: <BookOpen className="w-4 h-4" /> },
                      { id: "budget", label: "Budget & Payments", icon: <DollarSign className="w-4 h-4" /> },
                      { id: "messages", label: "Messages", icon: <MessageCircle className="w-4 h-4" /> },
                    ]
                  },
                  {
                    title: "Inspiration",
                    items: [
                      { id: "inspiration", label: "Wedding Ideas", icon: <Heart className="w-4 h-4" /> },
                    ]
                  }
                ].map((group, groupIndex) => (
                  <div key={group.title} className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full text-left text-sm px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
                          }`}
                        >
                          <span className="w-4 h-4">{tab.icon}</span>
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
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
                <Heart className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-lg md:text-xl font-semibold">{weddingDetails.coupleName}</h1>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Wedding: {new Date(weddingDetails.weddingDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button size="sm">
                <Search className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Find Services</span>
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}