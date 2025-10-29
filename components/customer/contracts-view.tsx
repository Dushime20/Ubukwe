"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function CustomerContractsView() {
  const router = useRouter()
  const contracts = [
    { id: "CT-2024-003", provider: "Amahoro Dance Troupe", service: "Traditional Dancers", status: "signed" },
    { id: "CT-2024-004", provider: "Jean-Claude Events", service: "MC Services", status: "pending" },
  ]

  const handleViewSign = (contractId: string) => {
    router.push(`/customer/dashboard?tab=contract-sign&contractId=${contractId}`, { scroll: false })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Contracts</h2>
          <p className="text-muted-foreground">View and sign your service contracts</p>
        </div>
      </div>
      
      <div className="space-y-4">
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
                <Button variant="outline" onClick={() => handleViewSign(c.id)}>
                  View / Sign
                </Button>
                <Button variant="outline">Download</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
