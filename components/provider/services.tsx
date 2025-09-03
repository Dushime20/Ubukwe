"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, Edit, Plus } from "lucide-react";

interface ProviderServicesProps {
  services: Array<{
    id: number;
    title: string;
    category: string;
    price: string;
    bookings: number;
    rating: number;
    status: string;
  }>;
}

export function ProviderServices({ services }: ProviderServicesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Services</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <Badge variant={service.status === "active" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{service.category}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="font-medium">{service.price}</span>
                    <span className="text-muted-foreground">{service.bookings} bookings</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
