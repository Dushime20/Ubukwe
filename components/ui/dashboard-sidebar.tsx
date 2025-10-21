"use client";

import * as React from "react";
import { Calendar, CheckCircle, Star, BookOpen, DollarSign, Home, ChevronLeft, ChevronRight, Users, MessageCircle, Heart, Clock, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole?: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function DashboardSidebar({ activeTab, onTabChange, userRole = "Customer", isCollapsed = false, onToggle }: DashboardSidebarProps) {
  const navigationGroups = [
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
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-48'} bg-card border-r h-screen p-4 left-0 fixed shadow-sm transition-all duration-300 z-50 hidden md:flex flex-col`}>
      {/* Toggle Button */}
      <div className="mb-8 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Dashboard</h2>
            <p className="text-sm text-muted-foreground">{userRole} Portal</p>
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
      
      <nav className="flex-1 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-2">
            {/* Group Title */}
            {!isCollapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {group.title}
                </h3>
              </div>
            )}
            
            {/* Group Items */}
            <div className="space-y-1">
              {group.items.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full text-left text-sm px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center ${
                    isCollapsed ? 'justify-center' : 'space-x-3'
                  } ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:shadow-sm"
                  }`}
                  title={isCollapsed ? tab.label : undefined}
                >
                  <span className="w-4 h-4 flex-shrink-0">{tab.icon}</span>
                  {!isCollapsed && <span className="font-medium truncate">{tab.label}</span>}
                </button>
              ))}
            </div>
            
            {/* Separator (except for last group) */}
            {groupIndex < navigationGroups.length - 1 && !isCollapsed && (
              <div className="border-t border-border/50 mx-3"></div>
            )}
          </div>
        ))}
      </nav>

      <div className="flex-shrink-0 pt-6 border-t mt-6">
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
