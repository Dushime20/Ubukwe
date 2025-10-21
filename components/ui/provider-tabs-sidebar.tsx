"use client";

import * as React from "react";
import { Home, Package, BookOpen, DollarSign, User, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProviderSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export function ProviderTabsSidebar({
  activeTab,
  onTabChange,
  isCollapsed = false,
  onToggle,
  user,
  onLogout,
}: ProviderSidebarProps) {
  const navigationGroups = [
    {
      title: "Overview",
      items: [
        { id: "overview", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
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
      title: "Business",
      items: [
        { id: "earnings", label: "Earnings", icon: <DollarSign className="w-4 h-4" /> },
        { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
      ]
    }
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-card border-r h-screen p-3 left-0 fixed shadow-sm transition-all duration-300 z-50 hidden md:flex flex-col overflow-x-hidden`}>
      {/* Toggle Button */}
      <div className="mb-8 flex items-center justify-between flex-shrink-0">
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

      <nav className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
        {navigationGroups.map((group, groupIndex) => (
          <div key={group.title} className="space-y-1">
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
                      ? "bg-primary text-primary-foreground shadow-md"
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

      <div className="flex-shrink-0 pt-4 border-t border-border/50">
        {/* User Profile Section */}
        {user && (
          <div className={`mb-4 ${isCollapsed ? 'px-2' : 'px-3'}`}>
            {!isCollapsed ? (
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
                  onClick={onLogout}
                  className="ml-2 p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200 flex-shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
