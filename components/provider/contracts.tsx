"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, Clock, XCircle, Eye, Download, Send, Edit } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

export function ProviderContracts() {
  const contracts = [
    {
      id: "CT-2024-001",
      customerName: "Marie Uwimana",
      serviceName: "Traditional Dancers",
      bookingId: "BK-2024-001",
      status: "draft",
      createdAt: "2024-03-10",
      lastModified: "2024-03-10",
    },
    {
      id: "CT-2024-002",
      customerName: "Jean Baptiste",
      serviceName: "MC Services",
      bookingId: "BK-2024-002",
      status: "sent",
      createdAt: "2024-03-08",
      sentAt: "2024-03-09",
    },
    {
      id: "CT-2024-003",
      customerName: "Grace Mukamana",
      serviceName: "Traditional Dancers",
      bookingId: "BK-2024-003",
      status: "signed",
      createdAt: "2024-03-05",
      signedAt: "2024-03-07",
    },
  ]

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; label: string; icon: any }> = {
      draft: { variant: "outline", label: "Draft", icon: Edit },
      sent: { variant: "secondary", label: "Sent", icon: Send },
      signed: { variant: "default", label: "Signed", icon: CheckCircle },
      expired: { variant: "destructive", label: "Expired", icon: XCircle },
    }
    const c = config[status] || config.draft
    const Icon = c.icon
    return (
      <Badge variant={c.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {c.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contracts</h2>
          <p className="text-muted-foreground">Manage service contracts and agreements</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Create New Contract
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Contracts</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="sent">Pending Signature</TabsTrigger>
          <TabsTrigger value="signed">Signed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{contract.serviceName}</CardTitle>
                    <CardDescription>
                      Contract {contract.id} | Customer: {contract.customerName} | Booking: {contract.bookingId}
                    </CardDescription>
                  </div>
                  {getStatusBadge(contract.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div>Created: {new Date(contract.createdAt).toLocaleDateString()}</div>
                    {contract.signedAt && <div>Signed: {new Date(contract.signedAt).toLocaleDateString()}</div>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {contract.status === "draft" && (
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="draft">
          {contracts.filter((c) => c.status === "draft").length === 0 ? (
            <EmptyState
              title="No draft contracts"
              description="Create a new contract to get started."
              icon={<FileText className="h-12 w-12 mx-auto text-muted-foreground" />}
            />
          ) : (
            contracts
              .filter((c) => c.status === "draft")
              .map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <CardTitle>{contract.serviceName}</CardTitle>
                    <CardDescription>{contract.customerName}</CardDescription>
                  </CardHeader>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="sent">
          {contracts.filter((c) => c.status === "sent").length === 0 ? (
            <EmptyState
              title="No pending signature contracts"
              description="All sent contracts have been signed."
              icon={<Send className="h-12 w-12 mx-auto text-muted-foreground" />}
            />
          ) : (
            contracts
              .filter((c) => c.status === "sent")
              .map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{contract.serviceName}</CardTitle>
                        <CardDescription>
                          Contract {contract.id} | Customer: {contract.customerName}
                        </CardDescription>
                      </div>
                      {getStatusBadge(contract.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Sent: {contract.sentAt ? new Date(contract.sentAt).toLocaleDateString() : "N/A"}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="signed">
          {contracts.filter((c) => c.status === "signed").length === 0 ? (
            <EmptyState
              title="No signed contracts"
              description="Signed contracts will appear here."
              icon={<CheckCircle className="h-12 w-12 mx-auto text-muted-foreground" />}
            />
          ) : (
            contracts
              .filter((c) => c.status === "signed")
              .map((contract) => (
                <Card key={contract.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{contract.serviceName}</CardTitle>
                        <CardDescription>
                          Contract {contract.id} | Customer: {contract.customerName}
                        </CardDescription>
                      </div>
                      {getStatusBadge(contract.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Signed: {contract.signedAt ? new Date(contract.signedAt).toLocaleDateString() : "N/A"}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

