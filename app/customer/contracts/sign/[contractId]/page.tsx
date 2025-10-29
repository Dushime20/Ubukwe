"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ContractSignPage({ params }: { params: { contractId: string } }) {
  const contract = {
    id: params.contractId,
    provider: "Amahoro Dance Troupe",
    service: "Traditional Dancers",
    content: "This is a placeholder contract. Final content will be generated and provided by the provider.",
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Sign Contract {contract.id}</CardTitle>
            <p className="text-sm text-muted-foreground">Provider: {contract.provider} • Service: {contract.service}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white border rounded p-4 h-[300px] overflow-auto">
              <pre className="whitespace-pre-wrap text-sm">{contract.content}</pre>
            </div>
            <div className="space-y-2">
              <p className="text-sm">By clicking "Sign Contract", you agree to the terms outlined above.</p>
              <Button>Sign Contract</Button>
              <Button variant="outline">Download PDF</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


