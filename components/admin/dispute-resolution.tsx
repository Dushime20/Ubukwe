"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, AlertCircle, Clock, CheckCircle, XCircle, Search, Filter, MessageSquare, DollarSign } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import Link from "next/link"

interface Dispute {
  id: string
  customer: string
  provider: string
  serviceName: string
  bookingId: string
  issue: string
  priority: "high" | "medium" | "low"
  status: "pending" | "investigating" | "resolved" | "rejected"
  createdAt: string
  deadline: string
  requestedResolution: string
  bookingAmount: number
}

export function AdminDisputeResolution() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const disputes: Dispute[] = [
    {
      id: "DSP-001",
      customer: "Grace Mukamana",
      provider: "Intore Cultural Group",
      serviceName: "Traditional Dancers",
      bookingId: "BK-2024-001",
      issue: "Dancers arrived 2 hours late",
      priority: "high",
      status: "investigating",
      createdAt: "2024-03-10",
      deadline: "2024-03-17",
      requestedResolution: "partial-refund",
      bookingAmount: 120000,
    },
    {
      id: "DSP-002",
      customer: "Jean Baptiste",
      provider: "Kigali Catering Co.",
      serviceName: "Catering Services",
      bookingId: "BK-2024-002",
      issue: "Food quality concerns",
      priority: "medium",
      status: "pending",
      createdAt: "2024-03-12",
      deadline: "2024-03-19",
      requestedResolution: "full-refund",
      bookingAmount: 500000,
    },
    {
      id: "DSP-003",
      customer: "Marie Uwimana",
      provider: "Heritage Decorations",
      serviceName: "Wedding Decorations",
      bookingId: "BK-2024-003",
      issue: "Late delivery",
      priority: "low",
      status: "resolved",
      createdAt: "2024-03-05",
      deadline: "2024-03-12",
      requestedResolution: "re-service",
      bookingAmount: 200000,
    },
  ]

  const filteredDisputes = disputes.filter((d) => {
    const matchesSearch =
      d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.issue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || d.status === statusFilter
    const matchesPriority = priorityFilter === "all" || d.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityBadge = (priority: string) => {
    const config: Record<string, { variant: any; label: string }> = {
      high: { variant: "destructive", label: "High" },
      medium: { variant: "secondary", label: "Medium" },
      low: { variant: "outline", label: "Low" },
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

  const stats = {
    total: disputes.length,
    pending: disputes.filter((d) => d.status === "pending").length,
    investigating: disputes.filter((d) => d.status === "investigating").length,
    resolved: disputes.filter((d) => d.status === "resolved").length,
    highPriority: disputes.filter((d) => d.priority === "high" && d.status !== "resolved").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Dispute Resolution</h2>
          <p className="text-muted-foreground">Review and resolve customer-provider disputes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search disputes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Disputes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.investigating}</div>
            <p className="text-xs text-muted-foreground">Under Investigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
            <p className="text-xs text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Disputes List */}
      {filteredDisputes.length === 0 ? (
        <EmptyState
          title="No disputes found"
          description="Try adjusting your filters or check back later."
          icon={<AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-4">
          {filteredDisputes.map((dispute) => (
            <Card key={dispute.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-lg">{dispute.issue}</CardTitle>
                      {getPriorityBadge(dispute.priority)}
                      {getStatusBadge(dispute.status)}
                    </div>
                    <CardDescription>
                      Dispute ID: {dispute.id} | Booking: {dispute.bookingId} | Service: {dispute.serviceName}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">{dispute.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-medium">{dispute.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Amount</p>
                    <p className="font-medium">{dispute.bookingAmount.toLocaleString()} RWF</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Requested Resolution</p>
                    <Badge variant="outline" className="mt-1">
                      {dispute.requestedResolution === "partial-refund" && "Partial Refund"}
                      {dispute.requestedResolution === "full-refund" && "Full Refund"}
                      {dispute.requestedResolution === "re-service" && "Re-service"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Filed: {new Date(dispute.createdAt).toLocaleDateString()} • Deadline:{" "}
                    {new Date(dispute.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/disputes/resolve/${dispute.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View & Resolve
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Parties
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

