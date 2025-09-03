"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProviderProfile() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Provider Profile</h2>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/rwandan-traditional-dancer.jpg" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Jean Mukamana</h3>
                <p className="text-muted-foreground">Traditional Dance Provider</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">4.8 (24 reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium">Location</label>
                <p className="text-muted-foreground">Kigali, Rwanda</p>
              </div>
              <div>
                <label className="text-sm font-medium">Experience</label>
                <p className="text-muted-foreground">8 years in traditional dance</p>
              </div>
              <div>
                <label className="text-sm font-medium">Languages</label>
                <p className="text-muted-foreground">Kinyarwanda, English, French</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Traditional Dance</span>
                <Badge>Primary</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Cultural Music</span>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>MC Services</span>
                <Badge variant="outline">Additional</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
