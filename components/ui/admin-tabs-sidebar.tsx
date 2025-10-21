"use client";

import * as React from "react";
import { Home, Users, Briefcase, BookOpen, ShieldAlert, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminTabsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AdminTabsSidebar({ activeTab, onTabChange, isCollapsed = false, onToggle }: AdminTabsSidebarProps) {
  const navigationGroups = [
    {
      title: "Overview",
      items: [
        { id: "overview", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
      ]
    },
    {
      title: "User Management",
      items: [
        { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
        { id: "providers", label: "Providers", icon: <Briefcase className="w-4 h-4" /> },
      ]
    },
    {
      title: "Platform",
      items: [
        { id: "bookings", label: "Bookings", icon: <BookOpen className="w-4 h-4" /> },
        { id: "disputes", label: "Disputes", icon: <ShieldAlert className="w-4 h-4" /> },
        { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-48'} bg-card border-r h-screen p-4 left-0 fixed shadow-sm transition-all duration-300 z-50 hidden md:flex flex-col`}>
      {/* Toggle Button */}
      <div className="mb-8 flex items-center justify-between flex-shrink-0">
        {!isCollapsed && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">Platform Management</p>
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
