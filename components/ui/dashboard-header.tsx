"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Plus, Search, Settings, Bell } from "lucide-react";

interface DashboardHeaderProps {
  user: {
    name: string;
    role: string;
    avatar?: string;
    initials: string;
  };
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    variant?: "default" | "outline" | "ghost";
    onClick?: () => void;
  }>;
  showSearch?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
}

export function DashboardHeader({ 
  user, 
  actions = [], 
  showSearch = false, 
  showNotifications = false, 
  showSettings = false 
}: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.role}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {showSearch && (
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          )}
          
          {showSettings && (
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          )}
          
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant || "default"} 
              size="sm"
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
