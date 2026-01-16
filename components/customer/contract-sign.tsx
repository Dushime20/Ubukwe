"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function CustomerContractSign() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contractId = searchParams.get("contractId") || ""

  // Mock contract data
  const contract = contractId ? {
    id: contractId,
    provider: "Amahoro Dance Troupe",
    service: "Traditional Dancers",
    content: "This is a placeholder contract. Final content will be generated and provided by the provider.\n\nBy signing this contract, you agree to:\n- Terms and conditions as outlined\n- Payment schedule as agreed\n- Service delivery timeline\n- Cancellation policy",
  } : null

  const handleBackToContracts = () => {
    router.push("/customer/dashboard?tab=contracts", { scroll: false })
  }

  if (!contract) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Contract Selected</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Please select a contract from the Contracts tab to view and sign it.</p>
          <Button onClick={handleBackToContracts}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contracts
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={handleBackToContracts}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Contracts
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Sign Contract</h2>
          <p className="text-muted-foreground">Contract ID: {contract.id}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contract {contract.id}</CardTitle>
          <p className="text-sm text-muted-foreground">Provider: {contract.provider} • Service: {contract.service}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white border rounded p-4 h-[400px] overflow-auto">
            <pre className="whitespace-pre-wrap text-sm">{contract.content}</pre>
          </div>
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm">By clicking "Sign Contract", you agree to the terms outlined above.</p>
            <div className="flex gap-2">
              <Button onClick={() => alert("Contract signed! (Integration pending)")}>
                Sign Contract
              </Button>
              <Button variant="outline">Download PDF</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
