"use client";

import * as React from "react";
import { Calendar, CheckCircle, Star, BookOpen, DollarSign, Home } from "lucide-react";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole?: string;
}

export function DashboardSidebar({ activeTab, onTabChange, userRole = "Customer" }: DashboardSidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Home className="w-4 h-4" /> },
    { id: "planning", label: "Planning", icon: <CheckCircle className="w-4 h-4" /> },
    { id: "services", label: "Services", icon: <Star className="w-4 h-4" /> },
    { id: "bookings", label: "My Bookings", icon: <BookOpen className="w-4 h-4" /> },
    { id: "budget", label: "Budget", icon: <DollarSign className="w-4 h-4" /> },
  ];

  return (
    <div className="w-48 bg-card border-r min-h-screen p-4 left-0 fixed shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-sm text-muted-foreground">{userRole} Portal</p>
      </div>
      
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
            <button
            className={`w-full text-left bg-black text-white text-sm px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3`}
          >
            Logout
          </button>
        </div>
        <div className="text-xs text-muted-foreground text-center mt-5">
          Ubukwe Platform
        </div>
      </div>
    </div>
  );
}
