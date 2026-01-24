"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, Users, Ticket, CreditCard, Minus, Plus } from "lucide-react";

export default function EventTicketingPage() {
  const params = useParams();
  const router = useRouter();
  const [tickets, setTickets] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  const event = {
    id: params.eventId,
    title: "Kigali Wedding Expo 2024",
    description: "The biggest wedding exhibition in Rwanda featuring top vendors, live demos, and exclusive deals.",
    date: "2024-03-15",
    time: "10:00 AM - 6:00 PM",
    venue: "Kigali Convention Centre",
    location: "Kigali, Rwanda",
    organizer: "Rwanda Wedding Association",
    ticketTypes: [
      {
        id: "early-bird",
        name: "Early Bird",
        price: 15000,
        available: 45,
        total: 100,
        description: "Limited early bird tickets with special perks",
        benefits: ["Priority entry", "Welcome drink", "Exclusive vendor discounts"]
      },
      {
        id: "regular",
        name: "Regular Admission",
        price: 25000,
        available: 180,
        total: 300,
        description: "Standard admission to the expo",
        benefits: ["Full event access", "Event program", "Vendor catalogs"]
      },
      {
        id: "vip",
        name: "VIP Experience",
        price: 50000,
        available: 15,
        total: 50,
        description: "Premium experience with exclusive benefits",
        benefits: ["VIP lounge access", "Complimentary refreshments", "Meet & greet with vendors", "Gift bag worth 100,000 RWF"]
      }
    ]
  };

  const updateTicketCount = (ticketId: string, change: number) => {
    setTickets(prev => {
      const current = prev[ticketId] || 0;
      const newCount = Math.max(0, Math.min(10, current + change));
      return { ...prev, [ticketId]: newCount };
    });
  };

  const totalAmount = event.ticketTypes.reduce((sum, type) => {
    return sum + (tickets[type.id] || 0) * type.price;
  }, 0);

  const totalTickets = Object.values(tickets).reduce((sum, count) => sum + count, 0);

  const handleCheckout = async () => {
    if (totalTickets === 0) return;
    setLoading(true);
    setTimeout(() => {
      router.push(`/events/${event.id}/checkout?tickets=${JSON.stringify(tickets)}`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-muted-foreground text-lg">{event.description}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-sm text-muted-foreground">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Tickets</h2>
            {event.ticketTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {type.name}
                        {type.available < 20 && (
                          <Badge variant="destructive">Only {type.available} left</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{type.price.toLocaleString()} RWF</p>
                      <p className="text-sm text-muted-foreground">{type.available}/{type.total} available</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-1">
                      {type.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4">
                      <Label>Quantity:</Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTicketCount(type.id, -1)}
                          disabled={!tickets[type.id]}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={tickets[type.id] || 0}
                          readOnly
                          className="w-20 text-center"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateTicketCount(type.id, 1)}
                          disabled={type.available === 0 || (tickets[type.id] || 0) >= 10}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {totalTickets === 0 ? (
                <p className="text-center text-muted-foreground py-8">No tickets selected</p>
              ) : (
                <>
                  <div className="space-y-2">
                    {event.ticketTypes.map((type) => {
                      const count = tickets[type.id] || 0;
                      if (count === 0) return null;
                      return (
                        <div key={type.id} className="flex justify-between text-sm">
                          <span>{type.name} x {count}</span>
                          <span className="font-medium">{(type.price * count).toLocaleString()} RWF</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">{totalAmount.toLocaleString()} RWF</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{totalTickets} ticket(s)</p>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {loading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
