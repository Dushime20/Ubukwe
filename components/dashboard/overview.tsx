"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Star } from "lucide-react";

interface OverviewProps {
  weddingDetails: {
    coupleName: string;
    weddingDate: string;
    guestCount: number;
    budget: number;
    spent: number;
  };
  planningProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
  checklist: Array<{
    id: number;
    task: string;
    category: string;
    completed: boolean;
  }>;
  recommendedServices: Array<{
    id: number;
    provider: string;
    service: string;
    price: string;
    rating: number;
    icon: React.ReactNode;
  }>;
}

export function Overview({ weddingDetails, planningProgress, checklist, recommendedServices }: OverviewProps) {
  return (
    <div className="space-y-6">
      {/* Wedding Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Wedding Planning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {planningProgress.completed} of {planningProgress.total} tasks completed
              </span>
              <span className="text-sm text-muted-foreground">{planningProgress.percentage}% complete</span>
            </div>
            <Progress value={planningProgress.percentage} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.ceil(
                    (new Date(weddingDetails.weddingDate).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Days to go</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{weddingDetails.guestCount}</div>
                <div className="text-xs text-muted-foreground">Guests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Services booked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {Math.round((weddingDetails.spent / weddingDetails.budget) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Budget used</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist
              .filter((item) => !item.completed)
              .slice(0, 4)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                    <span className="text-sm">{item.task}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedServices.slice(0, 3).map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">{service.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{service.provider}</p>
                    <p className="text-xs text-muted-foreground">{service.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{service.price}</p>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>{service.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
