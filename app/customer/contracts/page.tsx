"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CustomerContractsPage() {
  const contracts = [
    { id: "CT-2024-003", provider: "Amahoro Dance Troupe", service: "Traditional Dancers", status: "signed" },
    { id: "CT-2024-004", provider: "Jean-Claude Events", service: "MC Services", status: "pending" },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold">My Contracts</h1>
        {contracts.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{c.service}</CardTitle>
                <Badge variant={c.status === 'signed' ? 'default' : 'secondary'}>{c.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Provider: {c.provider} • Contract {c.id}</div>
              <div className="flex gap-2">
                <Button variant="outline" asChild><Link href={`/customer/contracts/sign/${c.id}`}>View / Sign</Link></Button>
                <Button variant="outline">Download</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


