"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Ban, CheckCircle } from "lucide-react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  type: string;
  joinDate: string;
  status: "Active" | "Suspended";
  bookings: number;
}

export function AdminUsers({ users }: { users: AdminUser[] }) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="outline">{user.type}</Badge>
                    <span className="text-sm text-muted-foreground">Joined: {user.joinDate}</span>
                    <span className="text-sm text-muted-foreground">{user.bookings} bookings</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {user.status === "Active" ? (
                  <Button variant="outline" size="sm">
                    <Ban className="h-4 w-4 mr-2" />
                    Suspend
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Activate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
