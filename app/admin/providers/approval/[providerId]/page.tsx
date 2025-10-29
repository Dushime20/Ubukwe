"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, XCircle, FileText, Eye, User, Building, Mail, Phone, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { EmptyState } from "@/components/ui/empty-state"

export default function ProviderApprovalDetailPage({ params }: { params: { providerId: string } }) {
  const [approvalDecision, setApprovalDecision] = useState<string>("")

  // Mock provider application data
  const application = {
    id: params.providerId,
    businessName: "Amahoro Dance Troupe",
    businessType: "sole-proprietor",
    firstName: "Marie",
    lastName: "Uwimana",
    email: "contact@amahoro.rw",
    phone: "+250788123456",
    address: "KG 123 St, Kigali",
    city: "Kigali",
    country: "Rwanda",
    yearsExperience: "6-10",
    serviceCategories: ["Dance", "Music", "Entertainment"],
    description:
      "We are a professional traditional dance troupe with 8 years of experience performing at weddings and cultural events across Rwanda.",
    submittedAt: "2024-03-12T10:30:00",
    documents: {
      idDocument: { name: "national_id.pdf", uploaded: true, verified: true },
      businessLicense: { name: "business_license.pdf", uploaded: true, verified: true },
      taxDocument: { name: "tax_registration.pdf", uploaded: true, verified: false },
      portfolio: [
        { name: "performance_1.jpg", uploaded: true },
        { name: "performance_2.jpg", uploaded: true },
        { name: "performance_3.jpg", uploaded: true },
        { name: "certificate.pdf", uploaded: true },
      ],
    },
    references: [
      { name: "Jean Baptiste", phone: "+250788111222", relationship: "Previous Client" },
      { name: "Grace Mukamana", phone: "+250788333444", relationship: "Previous Client" },
    ],
  }

  const handleApprove = () => {
    setApprovalDecision("approved")
    alert("Provider approved! They will receive an email notification. (Integration pending)")
  }

  const handleReject = (reason: string) => {
    setApprovalDecision("rejected")
    alert(`Provider rejected. Reason: ${reason} (Integration pending)`)
  }

  const allDocumentsVerified = Object.values(application.documents)
    .flat()
    .every((doc: any) => doc.verified !== false)

  return (
    <div className="min-h-screen bg-[#f9fafc] p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard?tab=providers">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Providers
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Provider Application Review</h1>
              <p className="text-muted-foreground">Application ID: {application.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={allDocumentsVerified ? "default" : "secondary"}>
              {allDocumentsVerified ? "Documents Complete" : "Pending Documents"}
            </Badge>
            <Badge variant="outline">
              Submitted: {new Date(application.submittedAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Business Name</p>
                    <p className="font-semibold">{application.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Business Type</p>
                    <p className="font-semibold capitalize">{application.businessType.replace("-", " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Years of Experience</p>
                    <p className="font-semibold">{application.yearsExperience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Service Categories</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {application.serviceCategories.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Business Description</p>
                  <p className="bg-muted/50 p-3 rounded-lg">{application.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-semibold">
                        {application.firstName} {application.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{application.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-semibold">{application.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-semibold">
                        {application.address}, {application.city}, {application.country}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Documents & Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="documents" className="w-full">
                  <TabsList>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="references">References</TabsTrigger>
                  </TabsList>

                  <TabsContent value="documents" className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">ID Document</p>
                          <p className="text-sm text-muted-foreground">{application.documents.idDocument.name}</p>
                        </div>
                      </div>
                      {application.documents.idDocument.verified ? (
                        <Badge variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Business License</p>
                          <p className="text-sm text-muted-foreground">
                            {application.documents.businessLicense.name}
                          </p>
                        </div>
                      </div>
                      {application.documents.businessLicense.verified ? (
                        <Badge variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Tax Registration</p>
                          <p className="text-sm text-muted-foreground">
                            {application.documents.taxDocument.name}
                          </p>
                        </div>
                      </div>
                      {application.documents.taxDocument.verified ? (
                        <Badge variant="default">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Pending Verification</Badge>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-2 mt-4">
                    {application.documents.portfolio.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <p className="flex-1 font-medium">{item.name}</p>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="references" className="space-y-3 mt-4">
                    {application.references.map((ref, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <p className="font-medium">{ref.name}</p>
                        <p className="text-sm text-muted-foreground">{ref.relationship}</p>
                        <p className="text-sm text-muted-foreground">{ref.phone}</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Approval Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Decision</CardTitle>
                <CardDescription>Review all documents before making a decision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleApprove} disabled={!allDocumentsVerified}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Provider
                  </Button>
                  <Button variant="destructive" className="w-full" onClick={() => handleReject("Documents incomplete")}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </Button>
                </div>

                {!allDocumentsVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-900">
                      <strong>Note:</strong> Some documents are pending verification. Review before approving.
                    </p>
                  </div>
                )}

                {approvalDecision && (
                  <div
                    className={`p-3 rounded-lg ${
                      approvalDecision === "approved"
                        ? "bg-green-50 border border-green-200 text-green-900"
                        : "bg-red-50 border border-red-200 text-red-900"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      Decision: {approvalDecision === "approved" ? "Approved" : "Rejected"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">{new Date(application.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days Pending</p>
                  <p className="font-medium">
                    {Math.floor(
                      (new Date().getTime() - new Date(application.submittedAt).getTime()) / (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-muted-foreground">Document Status</p>
                  <p className="font-medium">
                    {application.documents.portfolio.length} portfolio items
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Object.values(application.documents)
                      .filter((doc: any) => doc.verified === true).length} of{" "}
                    {Object.keys(application.documents).filter(
                      (k) => k !== "portfolio"
                    ).length} required documents verified
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

