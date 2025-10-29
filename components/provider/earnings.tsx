"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  // Mock time-series data; replace with API later
  const [period, setPeriod] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const series = useMemo(() => {
    if (period === "weekly") {
      return [
        { label: "Mon", amount: 80000 },
        { label: "Tue", amount: 120000 },
        { label: "Wed", amount: 60000 },
        { label: "Thu", amount: 160000 },
        { label: "Fri", amount: 200000 },
        { label: "Sat", amount: 90000 },
        { label: "Sun", amount: 50000 },
      ];
    }
    if (period === "monthly") {
      return [
        { label: "W1", amount: 320000 },
        { label: "W2", amount: 420000 },
        { label: "W3", amount: 380000 },
        { label: "W4", amount: 450000 },
      ];
    }
    return [
      { label: "Jan", amount: 1200000 },
      { label: "Feb", amount: 980000 },
      { label: "Mar", amount: 1450000 },
      { label: "Apr", amount: 1100000 },
      { label: "May", amount: 1680000 },
      { label: "Jun", amount: 1520000 },
    ];
  }, [period]);

  const totalInPeriod = series.reduce((s, p) => s + p.amount, 0);
  const avgPerPoint = Math.round(totalInPeriod / series.length);

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

      {/* Trends */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Earnings Trends
            </CardTitle>
            <div className="flex gap-2">
              <Button variant={period === "weekly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("weekly")}>Weekly</Button>
              <Button variant={period === "monthly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("monthly")}>Monthly</Button>
              <Button variant={period === "yearly" ? "default" : "outline"} size="sm" onClick={() => setPeriod("yearly")}>Yearly</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Simple bar visualization without external charts */}
          <div className="grid grid-cols-7 md:grid-cols-12 gap-3 items-end">
            {series.map((point, idx) => {
              const max = Math.max(...series.map(p => p.amount)) || 1;
              const height = Math.max(8, Math.round((point.amount / max) * 100));
              return (
                <div key={idx} className="flex flex-col items-center justify-end">
                  <div className="text-xs text-muted-foreground mb-1">{point.amount.toLocaleString()}</div>
                  <div className="w-6 md:w-8 bg-primary/20 hover:bg-primary/30 transition-all rounded" style={{ height: `${height}px` }} />
                  <div className="text-xs mt-1 text-muted-foreground">{point.label}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-muted-foreground">Total this {period}:</div>
            <div className="font-semibold">{totalInPeriod.toLocaleString()} RWF</div>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <div className="text-muted-foreground">Average per {period === 'weekly' ? 'day' : period === 'monthly' ? 'week' : 'month'}:</div>
            <div className="font-semibold">{avgPerPoint.toLocaleString()} RWF</div>
          </div>
        </CardContent>
      </Card>

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
