"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, FileText, Eye } from "lucide-react"

export default function ProviderApprovalPage() {
  const applications = [
    {
      id: "APP-001",
      name: "Amahoro Dance Troupe",
      contact: "contact@amahoro.rw",
      submittedAt: "2024-03-12",
      docs: ["ID", "Business License", "Portfolio (12)"],
      status: "pending",
    },
    {
      id: "APP-002",
      name: "Jean-Claude Events",
      contact: "jc@events.rw",
      submittedAt: "2024-03-11",
      docs: ["ID", "Business License", "Tax Document"],
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Provider Approvals</h1>
          <Badge variant="secondary">Pending: {applications.length}</Badge>
        </div>

        {applications.map((app) => (
          <Card key={app.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{app.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Application {app.id} • {new Date(app.submittedAt).toLocaleDateString()}</p>
                </div>
                <Badge>Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1"><FileText className="w-4 h-4" /> Docs: {app.docs.join(", ")}</div>
                <div className="text-muted-foreground">Contact: {app.contact}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />Review</Button>
                <Button variant="outline" size="sm" className="text-green-700 border-green-700"><CheckCircle className="w-4 h-4 mr-2" />Approve</Button>
                <Button variant="destructive" size="sm"><XCircle className="w-4 h-4 mr-2" />Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


