"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Search } from "lucide-react";
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Planning } from "@/components/dashboard/planning";
import { Services } from "@/components/dashboard/services";
import { Bookings } from "@/components/dashboard/bookings";
import { Budget } from "@/components/dashboard/budget";

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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

      case "planning":
        return <Planning checklist={checklist} />;

      case "services":
        return <Services recommendedServices={recommendedServices} />;

      case "bookings":
        return <Bookings bookings={bookings} />;

      case "budget":
        return <Budget weddingDetails={weddingDetails} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole="Customer"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-48">
        {/* Header */}
        <header className="border-b bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">{weddingDetails.coupleName}</h1>
                  <p className="text-sm text-muted-foreground">
                    Wedding: {new Date(weddingDetails.weddingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button size="sm">
                <Search className="h-4 w-4 mr-2" />
                Find Services
              </Button>
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
