"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, Calendar, DollarSign, CheckCircle, XCircle, Clock, ArrowLeft, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CustomerQuoteDetail } from "./quote-detail"
import { useRouter, useSearchParams } from "next/navigation"

interface Quote {
  id: string
  provider: string
  providerId?: string
  service: string
  status: "pending" | "accepted" | "declined" | "expired" | "requested_changes"
  total: number
  currency?: string
  createdAt: string
  validUntil: string
  inquiryId?: string
  lineItems?: Array<{
    description: string
    quantity: number
    unitPrice: number
    total: number
  }>
  subtotal?: number
  discount?: number
  tax?: number
  taxRate?: number
  notes?: string
  terms?: string
}

export function CustomerQuotes() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quoteId = searchParams.get('quoteId')
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const quotes: Quote[] = [
    {
      id: "Q-001",
      provider: "Jean-Claude Events",
      providerId: "provider-1",
      service: "MC Services",
      status: "pending",
      total: 165200,
      currency: "RWF",
      createdAt: "2024-03-10",
      validUntil: "2024-04-01",
      inquiryId: "inq-1",
      lineItems: [
        { description: "Ceremony MC (4 hours)", quantity: 1, unitPrice: 80000, total: 80000 },
        { description: "Reception MC (3 hours)", quantity: 1, unitPrice: 60000, total: 60000 },
      ],
      subtotal: 140000,
      discount: 0,
      tax: 25200,
      taxRate: 18,
      notes: "Includes bilingual MC services for both ceremony and reception.",
      terms: "50% deposit required to secure booking. Balance due 7 days before event."
    },
    {
      id: "Q-002",
      provider: "Intore Cultural Group",
      providerId: "provider-2",
      service: "Traditional Dancers",
      status: "pending",
      total: 220000,
      currency: "RWF",
      createdAt: "2024-03-12",
      validUntil: "2024-04-12",
      inquiryId: "inq-2",
      lineItems: [
        { description: "8 Dancers Performance", quantity: 1, unitPrice: 150000, total: 150000 },
        { description: "Traditional Costumes", quantity: 8, unitPrice: 5000, total: 40000 },
        { description: "Cultural Music Setup", quantity: 1, unitPrice: 30000, total: 30000 },
      ],
      subtotal: 220000,
      discount: 0,
      tax: 39600,
      taxRate: 18,
      notes: "Performance includes traditional Intore dance with live drumming.",
      terms: "Full payment required 2 weeks before event date."
    },
    {
      id: "Q-003",
      provider: "Kigali Serena Hotel",
      providerId: "provider-3",
      service: "Venue Rental",
      status: "accepted",
      total: 2500000,
      currency: "RWF",
      createdAt: "2024-02-15",
      validUntil: "2024-03-15",
      inquiryId: "inq-3",
    }
  ]

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === "pending").length,
    accepted: quotes.filter(q => q.status === "accepted").length,
    declined: quotes.filter(q => q.status === "declined").length,
    expired: quotes.filter(q => q.status === "expired").length,
  }

  const getStatusBadge = (status: Quote["status"]) => {
    const configs = {
      pending: { variant: "secondary" as const, label: "Pending", icon: Clock },
      accepted: { variant: "default" as const, label: "Accepted", icon: CheckCircle },
      declined: { variant: "destructive" as const, label: "Declined", icon: XCircle },
      expired: { variant: "outline" as const, label: "Expired", icon: Calendar },
      requested_changes: { variant: "outline" as const, label: "Changes Requested", icon: MessageSquare },
    }
    const config = configs[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const handleViewQuote = (quoteId: string) => {
    router.push(`/customer/dashboard?tab=quotes&quoteId=${quoteId}`, { scroll: false })
  }

  // If quoteId is in URL, show detail view
  if (quoteId) {
    const quote = quotes.find(q => q.id === quoteId)
    if (quote) {
      return (
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={() => router.push('/customer/dashboard?tab=quotes', { scroll: false })}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quotes
          </Button>
          <CustomerQuoteDetail quote={quote} />
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Quotes</h2>
        <p className="text-muted-foreground">Review and manage quotes from service providers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Quotes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
            <p className="text-xs text-muted-foreground">Declined</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-muted-foreground">{stats.expired}</div>
            <p className="text-xs text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotes by provider, service, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="requested_changes">Changes Requested</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quotes List */}
      <div className="space-y-4">
        {filteredQuotes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No quotes found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Quotes from providers will appear here"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredQuotes.map((quote) => {
            const isExpired = new Date(quote.validUntil) < new Date() && quote.status === "pending"
            return (
              <Card key={quote.id} className={isExpired ? "border-red-200 bg-red-50/50" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {quote.service}
                        {isExpired && <Badge variant="destructive">Expired</Badge>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {quote.provider} • Quote {quote.id}
                      </p>
                    </div>
                    {getStatusBadge(quote.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold text-foreground">
                            {quote.total.toLocaleString()} {quote.currency || "RWF"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Valid until {new Date(quote.validUntil).toLocaleDateString()}</span>
                        </div>
                        {quote.inquiryId && (
                          <Badge variant="outline" className="text-xs">
                            Inquiry {quote.inquiryId}
                          </Badge>
                        )}
                      </div>
                      {quote.lineItems && quote.lineItems.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {quote.lineItems.length} line item{quote.lineItems.length > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <Button onClick={() => handleViewQuote(quote.id)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
