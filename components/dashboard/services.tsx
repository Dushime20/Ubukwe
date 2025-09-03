"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, Star } from "lucide-react";

interface ServicesProps {
  recommendedServices: Array<{
    id: number;
    provider: string;
    service: string;
    category: string;
    rating: number;
    reviews: number;
    price: string;
    icon: React.ReactNode;
  }>;
}

export function Services({ recommendedServices }: ServicesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Discover Services</h2>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search services..." className="w-64" />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {recommendedServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{service.provider}</h3>
                    <p className="text-muted-foreground">{service.service}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm">{service.rating}</span>
                        <span className="text-xs text-muted-foreground ml-1">({service.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{service.price}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Book Now</Button>
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
