"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Star } from "lucide-react";

interface BookingsProps {
  bookings: Array<{
    id: number;
    provider: string;
    service: string;
    date: string;
    amount: number;
    status: string;
    rating: number;
  }>;
}

export function Bookings({ bookings }: BookingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{bookings.length} Active</Badge>
        </div>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{booking.provider}</h3>
                    <Badge variant="secondary">{booking.status}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-1">{booking.service}</p>
                  <p className="text-sm text-muted-foreground">Date: {booking.date}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{booking.rating} rating</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{booking.amount.toLocaleString()} RWF</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
