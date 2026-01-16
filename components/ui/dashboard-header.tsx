"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Globe,
  LogOut,
  Menu,
  Settings,
  User,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user: {
    full_name: string;
    role: string;
    profile_image_url?: string;
  };
  onLogout: () => void;
  onToggleSidebar?: () => void;
  onToggleMobileMenu?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function DashboardHeader({
  user,
  onLogout,
  onToggleSidebar,
  onToggleMobileMenu,
  title,
  subtitle
}: DashboardHeaderProps) {
  const initials = user.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 border-b bg-white shadow-sm w-full" role="banner">
      <div className="px-4 py-3 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Toggle buttons and Title */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {onToggleMobileMenu && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleMobileMenu}
              className="md:hidden flex-shrink-0"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="hidden md:flex flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div className="min-w-0 flex flex-col justify-center">
            {title && (
              <div className="text-base md:text-lg font-semibold truncate text-foreground leading-tight">
                {title}
              </div>
            )}
            {subtitle && (
              <div className="text-xs md:text-sm text-muted-foreground truncate leading-tight">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Language, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" title="Switch Language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English (EN)</DropdownMenuItem>
              <DropdownMenuItem>Français (FR)</DropdownMenuItem>
              <DropdownMenuItem>Kinyarwanda (RW)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-9 w-9 relative" title="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Button>

          <DropdownMenuSeparator className="h-4 w-[1px] bg-border hidden sm:block mx-1" />

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-auto p-1 pl-2 gap-2 hover:bg-accent/50 rounded-full sm:rounded-lg">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium leading-none">{user.full_name}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{user.role}</p>
                </div>
                <Avatar className="h-8 w-8 border border-border">
                  <AvatarImage src={user.profile_image_url} alt={user.full_name} />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
