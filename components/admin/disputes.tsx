"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye, CheckCircle } from "lucide-react";

interface DisputeItem {
  id: number;
  customer: string;
  provider: string;
  issue: string;
  date: string;
  status: "resolved" | "investigating" | "pending";
  priority: "high" | "medium" | "low";
}

export function AdminDisputes({ disputes }: { disputes: DisputeItem[] }) {
  return (
    <div className="space-y-4">
      {disputes.map((dispute) => (
        <Card key={dispute.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{dispute.issue}</h3>
                  <Badge
                    variant={
                      dispute.priority === "high"
                        ? "destructive"
                        : dispute.priority === "medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {dispute.priority} priority
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Customer:</span>
                    <p className="font-medium">{dispute.customer}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Provider:</span>
                    <p className="font-medium">{dispute.provider}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date:</span>
                    <p className="font-medium">{dispute.date}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={
                        dispute.status === "resolved"
                          ? "default"
                          : dispute.status === "investigating"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {dispute.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Details
                </Button>
                {dispute.status !== "resolved" && (
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve
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
