"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, AlertCircle, Clock, CheckCircle, MessageSquare, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function DisputesPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [disputeForm, setDisputeForm] = useState({
    bookingId: "",
    disputeType: "",
    description: "",
    resolutionRequest: "",
    evidence: [] as File[],
  })

  const disputes = [
    {
      id: "1",
      bookingId: "BK-2024-001",
      serviceName: "Traditional Dancers",
      provider: "Intore Cultural Group",
      status: "investigating",
      createdAt: "2024-03-10",
      resolutionDeadline: "2024-03-17",
      description: "Dancers arrived 2 hours late and missed key moments",
    },
    {
      id: "2",
      bookingId: "BK-2024-002",
      serviceName: "MC Services",
      provider: "Emmanuel MC Services",
      status: "resolved",
      createdAt: "2024-03-05",
      resolvedAt: "2024-03-08",
      resolution: "Partial refund of 30%",
    },
  ]

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return
    setDisputeForm({ ...disputeForm, evidence: [...disputeForm.evidence, ...Array.from(files)] })
  }

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; label: string }> = {
      pending: { variant: "outline", label: "Pending" },
      investigating: { variant: "secondary", label: "Investigating" },
      resolved: { variant: "default", label: "Resolved" },
      appeal: { variant: "destructive", label: "Under Appeal" },
    }
    const c = config[status] || config.pending
    return <Badge variant={c.variant}>{c.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dispute Resolution</h1>
            <p className="text-muted-foreground">File and track disputes with service providers</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>File New Dispute</Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Disputes</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="new">File Dispute</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {disputes
              .filter((d) => d.status !== "resolved")
              .map((dispute) => (
                <Card key={dispute.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{dispute.serviceName}</CardTitle>
                        <CardDescription>Booking: {dispute.bookingId} | Provider: {dispute.provider}</CardDescription>
                      </div>
                      {getStatusBadge(dispute.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm">{dispute.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Filed:</span>
                        <span>{new Date(dispute.createdAt).toLocaleDateString()}</span>
                      </div>
                      {dispute.resolutionDeadline && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Resolution Deadline:</span>
                          <span>{new Date(dispute.resolutionDeadline).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    {dispute.status === "investigating" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Investigation Progress</span>
                          <span>60%</span>
                        </div>
                        <Progress value={60} />
                      </div>
                    )}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline">View Details</Button>
                      <Button variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Add Evidence
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {disputes
              .filter((d) => d.status === "resolved")
              .map((dispute) => (
                <Card key={dispute.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{dispute.serviceName}</CardTitle>
                        <CardDescription>Booking: {dispute.bookingId}</CardDescription>
                      </div>
                      {getStatusBadge(dispute.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Resolution:</span>
                        <span>{dispute.resolution}</span>
                      </div>
                      {dispute.resolvedAt && (
                        <p className="text-sm text-muted-foreground">
                          Resolved on {new Date(dispute.resolvedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="new">
            <Card>
              <CardHeader>
                <CardTitle>File a Dispute</CardTitle>
                <CardDescription>Provide details about the issue with your booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="bookingId">Booking Reference *</Label>
                  <Input
                    id="bookingId"
                    value={disputeForm.bookingId}
                    onChange={(e) => setDisputeForm({ ...disputeForm, bookingId: e.target.value })}
                    placeholder="BK-2024-XXX"
                  />
                </div>
                <div>
                  <Label htmlFor="disputeType">Dispute Type *</Label>
                  <Select
                    value={disputeForm.disputeType}
                    onValueChange={(value) => setDisputeForm({ ...disputeForm, disputeType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dispute type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service-not-received">Service Not Received</SelectItem>
                      <SelectItem value="poor-quality">Poor Service Quality</SelectItem>
                      <SelectItem value="late-arrival">Late Arrival/No-Show</SelectItem>
                      <SelectItem value="billing-issue">Billing/Payment Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={disputeForm.description}
                    onChange={(e) => setDisputeForm({ ...disputeForm, description: e.target.value })}
                    placeholder="Describe the issue in detail..."
                    rows={6}
                  />
                </div>
                <div>
                  <Label htmlFor="resolutionRequest">Desired Resolution *</Label>
                  <Select
                    value={disputeForm.resolutionRequest}
                    onValueChange={(value) => setDisputeForm({ ...disputeForm, resolutionRequest: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What resolution do you want?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-refund">Full Refund</SelectItem>
                      <SelectItem value="partial-refund">Partial Refund</SelectItem>
                      <SelectItem value="re-service">Re-service/Replacement</SelectItem>
                      <SelectItem value="credit">Service Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Evidence (Photos, Screenshots, Receipts) *</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload evidence to support your dispute. Multiple files accepted.
                  </p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="evidence"
                      accept="image/*,.pdf"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="evidence" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB each</p>
                    </label>
                    {disputeForm.evidence.length > 0 && (
                      <div className="mt-4 space-y-1">
                        {disputeForm.evidence.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                            <FileText className="w-4 h-4" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>What happens next:</strong> Your dispute will be reviewed within 24 hours. We'll investigate and
                    work with both parties to reach a fair resolution within 7 days.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => alert("Dispute filed! (Integration pending)")}>Submit Dispute</Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

