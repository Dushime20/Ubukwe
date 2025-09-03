"use client";

import * as React from "react";
import { Home, Users, Briefcase, BookOpen, ShieldAlert, BarChart3 } from "lucide-react";

interface AdminTabsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminTabsSidebar({ activeTab, onTabChange }: AdminTabsSidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Home className="w-4 h-4" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { id: "providers", label: "Providers", icon: <Briefcase className="w-4 h-4" /> },
    { id: "bookings", label: "Bookings", icon: <BookOpen className="w-4 h-4" /> },
    { id: "disputes", label: "Disputes", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="w-48 bg-card border-r min-h-screen p-4 left-0 fixed shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h2>
        <p className="text-sm text-muted-foreground">Platform Management</p>
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

    <div className="mt-10 pt-6 border-t">
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
