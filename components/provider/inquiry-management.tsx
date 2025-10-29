"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Clock, CheckCircle, XCircle, Star, Mail, Phone, Calendar, DollarSign, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmptyState } from "@/components/ui/empty-state"

interface Inquiry {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceRequested: string
  weddingDate: string
  location: string
  budget?: string
  message: string
  status: "new" | "responded" | "quoted" | "booked" | "declined"
  receivedAt: string
  responseTime?: number
  matchScore?: number
}

interface InquiryManagementProps {
  onSendQuote?: (inquiryId: string, customerId: string) => void
}

export function InquiryManagement({ onSendQuote }: InquiryManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  // Mock data
  const inquiries: Inquiry[] = [
    {
      id: "1",
      customerName: "Marie Uwimana",
      customerEmail: "marie@example.com",
      customerPhone: "+250788123456",
      serviceRequested: "Traditional Dancers",
      weddingDate: "2024-06-15",
      location: "Kigali",
      budget: "150,000 RWF",
      message: "Looking for traditional dancers for our wedding in June. Need 8-10 dancers.",
      status: "new",
      receivedAt: "2024-03-10T08:30:00",
      matchScore: 95,
    },
    {
      id: "2",
      customerName: "Jean Baptiste",
      customerEmail: "jean@example.com",
      customerPhone: "+250788654321",
      serviceRequested: "MC Services",
      weddingDate: "2024-05-20",
      location: "Butare",
      budget: "100,000 RWF",
      message: "Need a bilingual MC for our wedding ceremony.",
      status: "responded",
      receivedAt: "2024-03-08T14:20:00",
      responseTime: 45,
      matchScore: 88,
    },
    {
      id: "3",
      customerName: "Grace Mukamana",
      customerEmail: "grace@example.com",
      customerPhone: "+250788987654",
      serviceRequested: "Traditional Dancers",
      weddingDate: "2024-04-10",
      location: "Kigali",
      message: "Short notice booking for traditional performance.",
      status: "quoted",
      receivedAt: "2024-03-05T10:15:00",
      matchScore: 92,
    },
  ]

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || inq.serviceRequested.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Inquiry["status"]) => {
    const variants: Record<string, { variant: any; label: string; icon: any }> = {
      new: { variant: "default", label: "New", icon: Clock },
      responded: { variant: "secondary", label: "Responded", icon: MessageSquare },
      quoted: { variant: "outline", label: "Quoted", icon: DollarSign },
      booked: { variant: "default", label: "Booked", icon: CheckCircle },
      declined: { variant: "destructive", label: "Declined", icon: XCircle },
    }
    const config = variants[status]
    const Icon = config.icon
    return (
      <Badge variant={config.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const hours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Inquiries</h2>
          <p className="text-muted-foreground">Manage customer inquiries and leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="responded">Responded</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{inquiries.filter((i) => i.status === "new").length}</div>
            <p className="text-xs text-muted-foreground">New Inquiries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">2h</div>
            <p className="text-xs text-muted-foreground">Avg. Response Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{inquiries.length}</div>
            <p className="text-xs text-muted-foreground">Total This Month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {filteredInquiries.length === 0 ? (
            <EmptyState
              title="No inquiries found"
              description="Try adjusting your filters or check back later."
              icon={<MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />}
            />
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredInquiries.map((inquiry) => (
                <Card
                  key={inquiry.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${
                    selectedInquiry?.id === inquiry.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{inquiry.customerName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{inquiry.customerName}</p>
                          <p className="text-xs text-muted-foreground">{formatTimeAgo(inquiry.receivedAt)}</p>
                        </div>
                      </div>
                      {getStatusBadge(inquiry.status)}
                    </div>
                    <p className="text-sm font-medium mb-1">{inquiry.serviceRequested}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{inquiry.message}</p>
                    {inquiry.matchScore && (
                      <div className="mt-2 flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span>{inquiry.matchScore}% Match</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Inquiry Details */}
        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedInquiry.serviceRequested}</CardTitle>
                    <CardDescription className="mt-1">Inquiry from {selectedInquiry.customerName}</CardDescription>
                  </div>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback>{selectedInquiry.customerName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedInquiry.customerName}</p>
                        <p className="text-sm text-muted-foreground">Customer</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {selectedInquiry.customerEmail}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {selectedInquiry.customerPhone}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="font-semibold mb-3">Event Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Wedding Date</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedInquiry.weddingDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">{selectedInquiry.budget || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="font-semibold mb-2">Message</h3>
                  <p className="text-sm bg-muted/50 p-4 rounded-lg">{selectedInquiry.message}</p>
                </div>

                {/* Messages Thread */}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-3">Conversation</h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4">
                    {/* Initial Inquiry Message */}
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{selectedInquiry.customerName[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{selectedInquiry.customerName}</span>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-sm">{selectedInquiry.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(selectedInquiry.receivedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mock reply messages - In real app, these would come from API */}
                    {selectedInquiry.status !== "new" && (
                      <div className="flex justify-end">
                        <div className="max-w-[80%]">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                            <p className="text-sm">Thank you for your inquiry! We're excited to work with you on your special day.</p>
                            <p className="text-xs opacity-80 mt-1">
                              {new Date(new Date(selectedInquiry.receivedAt).getTime() + 2 * 60 * 60 * 1000).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedInquiry.status === "quoted" && (
                      <div className="flex justify-end">
                        <div className="max-w-[80%]">
                          <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                            <p className="text-sm">We've sent you a detailed quote. Please review and let us know if you have any questions!</p>
                            <p className="text-xs opacity-80 mt-1">Quote sent - {new Date().toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Reply Input */}
                  <div className="space-y-2">
                    <textarea
                      placeholder="Type your reply..."
                      className="w-full min-h-[80px] p-3 border rounded-md resize-none text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          // In real app, send message and update inquiry status
                          alert("Message sent! This would update the inquiry and notify the customer.");
                        }}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      if (selectedInquiry) {
                        // In real app, this would navigate to quote builder with inquiry details
                        // or trigger a callback to parent component
                        if (onSendQuote) {
                          onSendQuote(selectedInquiry.id, selectedInquiry.customerEmail) // Using email as customerId for now
                        } else {
                          // Fallback: navigate to quotes tab
                          window.location.href = "/provider/dashboard?tab=quotes&inquiryId=" + selectedInquiry.id
                        }
                      }
                    }}
                  >
                    Send Quote
                  </Button>
                  {selectedInquiry.status === "new" && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        // In real app, this would mark inquiry as responded and notify customer
                        alert("Marking as responded...");
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Mark as Responded
                    </Button>
                  )}
                  {selectedInquiry.status === "new" && (
                    <Button variant="destructive" onClick={() => alert("Marking as declined...")}>
                      Decline
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12">
                <EmptyState
                  title="Select an inquiry"
                  description="Choose an inquiry from the list to view details and respond."
                  icon={<MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

