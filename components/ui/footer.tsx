"use client";

import * as React from "react";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-secondary/20 border-t">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-6 w-6 rounded-full bg-primary"></div>
              <span className="font-bold">Ubukwe</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting Rwandan couples with authentic wedding service providers to celebrate love and cultural
              heritage.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Traditional Dancers</li>
              <li>Master of Ceremonies</li>
              <li>Decorations</li>
              <li>Catering</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">For Providers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Join Platform</li>
              <li>Provider Dashboard</li>
              <li>Manage Bookings</li>
              <li>Payment System</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Cultural Guidelines</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Ubukwe. Celebrating Rwandan wedding traditions with pride.</p>
        </div>
      </div>
    </footer>
  );
}
