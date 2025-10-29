"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function QuoteViewPage({ params }: { params: { quoteId: string } }) {
  const quote = {
    id: params.quoteId,
    provider: "Jean-Claude Events",
    service: "MC Services",
    status: "pending",
    validUntil: "2024-04-01",
    lineItems: [
      { description: "Ceremony MC (4 hours)", quantity: 1, unitPrice: 80000, total: 80000 },
      { description: "Reception MC (3 hours)", quantity: 1, unitPrice: 60000, total: 60000 },
    ],
    discount: 0,
    tax: 25200,
    subtotal: 140000,
    total: 165200,
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Quote {quote.id}</CardTitle>
                <p className="text-sm text-muted-foreground">Provider: {quote.provider} • Service: {quote.service}</p>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">Valid until: {new Date(quote.validUntil).toLocaleDateString()}</div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit (RWF)</TableHead>
                    <TableHead>Total (RWF)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.lineItems.map((li, i) => (
                    <TableRow key={i}>
                      <TableCell>{li.description}</TableCell>
                      <TableCell>{li.quantity}</TableCell>
                      <TableCell>{li.unitPrice.toLocaleString()}</TableCell>
                      <TableCell>{li.total.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right text-muted-foreground">Subtotal</TableCell>
                    <TableCell>{quote.subtotal.toLocaleString()}</TableCell>
                  </TableRow>
                  {quote.discount > 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-right text-green-700">Discount</TableCell>
                      <TableCell>-{quote.discount.toLocaleString()}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right">VAT</TableCell>
                    <TableCell>{quote.tax.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">Total</TableCell>
                    <TableCell className="font-bold">{quote.total.toLocaleString()} RWF</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button>Accept Quote</Button>
              <Button variant="outline">Request Changes</Button>
              <Button variant="destructive">Decline</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


