"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Eye, MessageCircle } from "lucide-react";

interface ProviderBooking {
  id: number;
  client: string;
  service: string;
  date: string;
  status: "pending" | "confirmed" | "completed";
  amount: number;
}

export function ProviderBookings({ bookings }: { bookings: ProviderBooking[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Booking Requests</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">3 Pending</Badge>
          <Badge variant="secondary">5 Confirmed</Badge>
          <Badge variant="default">16 Completed</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{booking.client}</h3>
                    <Badge
                      variant={
                        booking.status === "completed"
                          ? "default"
                          : booking.status === "confirmed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{booking.service}</p>
                  <p className="text-sm text-muted-foreground">Wedding Date: {booking.date}</p>
                  <p className="text-lg font-medium mt-2">{booking.amount.toLocaleString()} RWF</p>
                </div>
                <div className="flex items-center space-x-2">
                  {booking.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Decline
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Client
                    </Button>
                  )}
                  {booking.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
