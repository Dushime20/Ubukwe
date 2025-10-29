"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Upload, AlertCircle, CheckCircle, XCircle, MessageSquare, FileText, DollarSign, User, Building, Clock } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDisputeResolutionPage({ params }: { params: { disputeId: string } }) {
  const [resolution, setResolution] = useState({
    type: "",
    amount: "",
    notes: "",
    status: "investigating",
  })

  // Mock dispute data
  const dispute = {
    id: params.disputeId,
    customer: {
      name: "Grace Mukamana",
      email: "grace@example.com",
      phone: "+250788123456",
      avatar: "",
    },
    provider: {
      name: "Intore Cultural Group",
      email: "contact@intore.rw",
      phone: "+250788654321",
    },
    bookingId: "BK-2024-001",
    serviceName: "Traditional Dancers",
    issue: "Dancers arrived 2 hours late and missed key moments of the ceremony",
    disputeType: "late-arrival",
    priority: "high",
    status: "investigating",
    createdAt: "2024-03-10T10:30:00",
    deadline: "2024-03-17T23:59:59",
    requestedResolution: "partial-refund",
    evidence: [
      { type: "photo", url: "/evidence1.jpg", description: "Photo showing scheduled time" },
      { type: "message", content: "Provider confirmed 6 PM arrival", timestamp: "2024-03-10T08:00:00" },
    ],
    bookingAmount: 120000,
    escrowAmount: 120000,
    conversationHistory: [
      { from: "customer", message: "The dancers were supposed to arrive at 6 PM but came at 8 PM", timestamp: "2024-03-10T20:30:00" },
      { from: "provider", message: "We apologize for the delay due to traffic", timestamp: "2024-03-10T21:00:00" },
      { from: "customer", message: "We missed important ceremony moments. We want a refund.", timestamp: "2024-03-10T21:15:00" },
    ],
  }

  const handleResolve = (action: "full-refund" | "partial-refund" | "credit" | "re-service" | "reject") => {
    const resolutionMap = {
      "full-refund": { type: "Full Refund", amount: dispute.bookingAmount },
      "partial-refund": { type: "Partial Refund", amount: Math.floor(dispute.bookingAmount * 0.3) },
      credit: { type: "Service Credit", amount: dispute.bookingAmount },
      "re-service": { type: "Re-service", amount: 0 },
      reject: { type: "Dispute Rejected", amount: 0 },
    }

    const res = resolutionMap[action]
    setResolution({
      type: res.type,
      amount: res.amount.toString(),
      notes: "",
      status: action === "reject" ? "rejected" : "resolved",
    })

    alert(`Dispute ${action === "reject" ? "rejected" : "resolved"}! ${res.type}: ${res.amount.toLocaleString()} RWF`)
  }

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { variant: any; label: string }> = {
      high: { variant: "destructive", label: "High Priority" },
      medium: { variant: "secondary", label: "Medium Priority" },
      low: { variant: "outline", label: "Low Priority" },
    }
    const c = config[priority] || config.medium
    return <Badge variant={c.variant}>{c.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; label: string; icon: any }> = {
      pending: { variant: "outline", label: "Pending", icon: Clock },
      investigating: { variant: "secondary", label: "Investigating", icon: AlertCircle },
      resolved: { variant: "default", label: "Resolved", icon: CheckCircle },
      rejected: { variant: "destructive", label: "Rejected", icon: XCircle },
    }
    const c = config[status] || config.pending
    const Icon = c.icon
    return (
      <Badge variant={c.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {c.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard?tab=disputes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Disputes
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Dispute Resolution</h1>
              <p className="text-muted-foreground">Dispute ID: {dispute.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getPriorityBadge(dispute.priority)}
            {getStatusBadge(dispute.status)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dispute Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Dispute Details</CardTitle>
                <CardDescription>Service: {dispute.serviceName} | Booking: {dispute.bookingId}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-semibold">Issue Description</Label>
                  <p className="text-sm mt-1 bg-muted/50 p-3 rounded-lg">{dispute.issue}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Requested Resolution</Label>
                  <Badge variant="outline" className="mt-1">
                    {dispute.requestedResolution === "partial-refund" && "Partial Refund"}
                    {dispute.requestedResolution === "full-refund" && "Full Refund"}
                    {dispute.requestedResolution === "re-service" && "Re-service"}
                    {dispute.requestedResolution === "credit" && "Service Credit"}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <span className="text-sm text-muted-foreground">Booking Amount</span>
                    <p className="text-lg font-semibold">{dispute.bookingAmount.toLocaleString()} RWF</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Escrow Amount</span>
                    <p className="text-lg font-semibold text-green-600">{dispute.escrowAmount.toLocaleString()} RWF</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
                <CardDescription>Evidence provided by customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dispute.evidence.map((ev, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">{ev.type === "photo" ? "Photo Evidence" : "Message Screenshot"}</p>
                        {ev.description && <p className="text-sm text-muted-foreground">{ev.description}</p>}
                        {ev.content && <p className="text-sm mt-1">{ev.content}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Conversation History */}
            <Card>
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
                <CardDescription>Messages between customer and provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {dispute.conversationHistory.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.from === "customer" ? "justify-start" : "justify-end"}`}>
                    {msg.from === "customer" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{dispute.customer.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg p-3 max-w-[70%] ${msg.from === "customer" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.from === "customer" ? "text-muted-foreground" : "text-primary-foreground/80"}`}>
                        {new Date(msg.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {msg.from === "provider" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{dispute.provider.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Parties Information */}
            <Card>
              <CardHeader>
                <CardTitle>Parties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-sm font-semibold">Customer</Label>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="font-medium">{dispute.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{dispute.customer.email}</p>
                    <p className="text-sm text-muted-foreground">{dispute.customer.phone}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-sm font-semibold">Provider</Label>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="font-medium">{dispute.provider.name}</p>
                    <p className="text-sm text-muted-foreground">{dispute.provider.email}</p>
                    <p className="text-sm text-muted-foreground">{dispute.provider.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Resolution Actions</CardTitle>
                <CardDescription>Select a resolution for this dispute</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve("full-refund")}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Full Refund ({dispute.bookingAmount.toLocaleString()} RWF)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve("partial-refund")}
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Partial Refund (30% - {Math.floor(dispute.bookingAmount * 0.3).toLocaleString()} RWF)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve("credit")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Service Credit
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleResolve("re-service")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Re-service / Replacement
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full justify-start"
                    onClick={() => handleResolve("reject")}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Dispute
                  </Button>
                </div>

                {resolution.type && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div>
                      <Label htmlFor="resolutionNotes">Resolution Notes</Label>
                      <Textarea
                        id="resolutionNotes"
                        value={resolution.notes}
                        onChange={(e) => setResolution({ ...resolution, notes: e.target.value })}
                        placeholder="Add notes about the resolution decision..."
                        rows={4}
                      />
                    </div>
                    <Button className="w-full" onClick={() => alert("Resolution finalized! (Integration pending)")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Finalize Resolution
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Dispute Filed</p>
                  <p className="font-medium">{new Date(dispute.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Resolution Deadline</p>
                  <p className="font-medium text-red-600">{new Date(dispute.deadline).toLocaleString()}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-muted-foreground">Time Remaining</p>
                  <p className="font-medium">3 days</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

