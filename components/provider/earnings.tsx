"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface ProviderEarningsProps {
  recentCompleted: Array<{
    id: number;
    client: string;
    service: string;
    date: string;
    amount: number;
  }>;
}

export function ProviderEarnings({ recentCompleted }: ProviderEarningsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Earnings & Payments</h2>
        <Button variant="outline">
          <DollarSign className="h-4 w-4 mr-2" />
          Request Payout
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">850,000 RWF</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320,000 RWF</div>
            <p className="text-xs text-muted-foreground">Ready for payout</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450,000 RWF</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCompleted.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{booking.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {booking.service} - {booking.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">+{booking.amount.toLocaleString()} RWF</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
