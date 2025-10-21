"use client";

import * as React from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "./button";

export function Navbar() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="border-b bg-[#eff4fa]   z-10 top-0 sticky">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 rounded-full">
            <img src="/logo.png" alt="Ubukwe Logo" className="h-full w-full object-cover rounded-full" />
          </div>
          <span className="text-xl font-bold text-foreground">Ubukwe</span>
          <Badge variant="secondary" className="text-xs">
            Rwanda
          </Badge>
        </div>
        {isMobile ? (
          <button onClick={toggleMenu} className="text-foreground focus:outline-none">
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        ) : (
          <NavigationMenu className="hidden md:flex items-center space-x-6">
            <NavigationMenuList className="flex space-x-4">
              <NavigationMenuItem>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                
                <a href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </a>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </NavigationMenuItem>
               <div className="flex items-center space-x-3">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
            </NavigationMenuList>
          </NavigationMenu>
        )}
      </div>
      {isMobile && menuOpen && (
        <nav className="flex flex-row items-center justify-start space-x-4 mt-2 px-4 py-2 overflow-x-auto">
          <a href="/" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            Home
          </a>
          <a href="/services" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            Services
          </a>
          <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            About
          </a>
          <Link href="/auth/signin" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            Sign In
          </Link>
          <Link href="/auth/signup" className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}
