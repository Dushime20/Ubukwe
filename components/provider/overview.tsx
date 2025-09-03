"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, Star, Clock, TrendingUp } from "lucide-react";

interface ProviderOverviewProps {
  providerStats: {
    totalBookings: number;
    monthlyEarnings: number;
    averageRating: number;
    activeServices: number;
  };
  recentBookings: Array<{
    id: number;
    client: string;
    service: string;
    date: string;
    status: string;
    amount: number;
  }>;
}

export function ProviderOverview({ providerStats, recentBookings }: ProviderOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.monthlyEarnings.toLocaleString()} RWF</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.averageRating}</div>
            <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStats.activeServices}</div>
            <p className="text-xs text-muted-foreground">1 draft service</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-muted-foreground">{booking.service}</p>
                  <p className="text-xs text-muted-foreground">{booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.amount.toLocaleString()} RWF</p>
                  <Badge
                    variant={
                      booking.status === "completed"
                        ? "default"
                        : booking.status === "confirmed"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profile Views</span>
              <span className="font-medium">156 this week</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Booking Conversion</span>
              <span className="font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Response Time</span>
              <span className="font-medium">2.3 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Customer Satisfaction</span>
              <span className="font-medium">4.8/5.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
