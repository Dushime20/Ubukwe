"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MapPin, Users, Camera, Utensils } from "lucide-react";

interface BudgetProps {
  weddingDetails: {
    budget: number;
    spent: number;
  };
}

export function Budget({ weddingDetails }: BudgetProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wedding Budget</h2>
        <Button variant="outline">
          <DollarSign className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weddingDetails.budget.toLocaleString()} RWF</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Amount Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{weddingDetails.spent.toLocaleString()} RWF</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((weddingDetails.spent / weddingDetails.budget) * 100)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(weddingDetails.budget - weddingDetails.spent).toLocaleString()} RWF
            </div>
            <p className="text-xs text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>Venue</span>
              </div>
              <div className="text-right">
                <p className="font-medium">800,000 RWF</p>
                <p className="text-xs text-muted-foreground">32% of budget</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Entertainment</span>
              </div>
              <div className="text-right">
                <p className="font-medium">200,000 RWF</p>
                <p className="text-xs text-muted-foreground">8% of budget</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span>Photography</span>
              </div>
              <div className="text-right">
                <p className="font-medium">300,000 RWF</p>
                <p className="text-xs text-muted-foreground">12% of budget</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <Utensils className="h-5 w-5 text-muted-foreground" />
                <span>Catering (Planned)</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-muted-foreground">500,000 RWF</p>
                <p className="text-xs text-muted-foreground">20% of budget</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
