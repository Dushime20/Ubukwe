"use client";

import * as React from "react";
import { Home, Package, BookOpen, DollarSign, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function ProviderTabsSidebar({
  activeTab,
  onTabChange,
  isCollapsed = false,
  onToggle,
}: ProviderSidebarProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Home className="w-4 h-4" /> },
    {
      id: "services",
      label: "My Services",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: "earnings",
      label: "Earnings",
      icon: <DollarSign className="w-4 h-4" />,
    },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-48'} bg-card border-r min-h-screen p-4 left-0 fixed shadow-sm transition-all duration-300 z-50 hidden md:block`}>
      {/* Toggle Button */}
      <div className="mb-8 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Provider Dashboard
            </h2>
            <p className="text-sm text-muted-foreground">Manage your services</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-muted/50"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full text-left text-sm px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            } ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
            }`}
            title={isCollapsed ? tab.label : undefined}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            {!isCollapsed && <span className="font-medium">{tab.label}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-16 pt-6 border-t">
        <div>
          <button
            className={`w-full text-left bg-black text-white text-sm px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            }`}
            title={isCollapsed ? "Logout" : undefined}
          >
            {isCollapsed ? "🚪" : "Logout"}
          </button>
        </div>
        {!isCollapsed && (
          <div className="text-xs text-muted-foreground text-center mt-5">
            Ubukwe Platform
          </div>
        )}
      </div>
    </div>
  );
}
