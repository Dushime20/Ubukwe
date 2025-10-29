"use client";

import { AdminDisputeResolution } from "./dispute-resolution";

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
  // Use the comprehensive dispute resolution component
  return <AdminDisputeResolution />;
}
