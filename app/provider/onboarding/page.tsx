"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export default function ProviderOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    yearsExperience: "",
    serviceCategories: [] as string[],
    description: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  })

  const [documents, setDocuments] = useState({
    idDocument: null as File | null,
    businessLicense: null as File | null,
    taxDocument: null as File | null,
    portfolio: [] as File[],
  })

  const steps = [
    { id: 1, title: "Business Information", completed: currentStep > 1 },
    { id: 2, title: "Service Details", completed: currentStep > 2 },
    { id: 3, title: "Contact Information", completed: currentStep > 3 },
    { id: 4, title: "Documents Upload", completed: currentStep > 4 },
    { id: 5, title: "Review & Submit", completed: false },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (type: keyof typeof documents, files: FileList | null) => {
    if (!files) return
    if (type === "portfolio") {
      setDocuments((prev) => ({
        ...prev,
        portfolio: [...prev.portfolio, ...Array.from(files)],
      }))
    } else {
      setDocuments((prev) => ({
        ...prev,
        [type]: files[0],
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // 1. Upload Documents first
      await apiClient.provider.uploadDocuments(
        documents.businessLicense || undefined,
        documents.portfolio.length > 0 ? documents.portfolio : undefined
      )

      // 2. Register Team / Complete Onboarding
      const registrationData = {
        business_type: formData.businessType,
        years_experience: parseInt(formData.yearsExperience) || 0,
        business_description: formData.description,
        service_categories: formData.serviceCategories,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        phone_number: formData.phone,
        location: `${formData.city}, ${formData.country}`,
        // Backend required fields for register-team
        price_per_session: 0, // Default or placeholder
        currency: "RWF",
        team_size: 1,
      }

      await apiClient.provider.registerTeam(registrationData)

      toast.success("Onboarding completed successfully!")
      router.push("/provider/dashboard")
    } catch (error: any) {
      console.error("Onboarding failed:", error)
      toast.error(error.message || "Failed to complete onboarding. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = (currentStep / 5) * 100

  return (
    <div className="min-h-screen bg-[#f9fafc] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4">Provider Onboarding</h1>
          <p className="text-muted-foreground mt-2">Complete your profile to start offering services</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <Progress value={progress} className="mb-4" />
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <p className="text-xs mt-2 text-center">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Business Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business/Professional Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter your business name"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="individual">Individual/Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience *</Label>
                  <Select
                    value={formData.yearsExperience}
                    onValueChange={(value) => handleInputChange("yearsExperience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11+">11+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceCategories">Service Categories *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Photography", "Venue", "Catering", "Music", "Decoration", "Transportation", "MC Services", "Dance", "Other"].map(
                      (cat) => (
                        <Button
                          key={cat}
                          type="button"
                          variant={formData.serviceCategories.includes(cat) ? "default" : "outline"}
                          onClick={() => {
                            const categories = formData.serviceCategories.includes(cat)
                              ? formData.serviceCategories.filter((c) => c !== cat)
                              : [...formData.serviceCategories, cat]
                            handleInputChange("serviceCategories", categories)
                          }}
                        >
                          {cat}
                        </Button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your services, experience, and what makes you unique..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/500 characters</p>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your business address"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rwanda">Rwanda</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label>Government ID Document *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Upload a clear photo of your ID (National ID, Passport, or Driver's License)</p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="idDocument"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("idDocument", e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="idDocument" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                    </label>
                    {documents.idDocument && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        {documents.idDocument.name}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Business License / Registration *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Upload your business registration document</p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="businessLicense"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("businessLicense", e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="businessLicense" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                    </label>
                    {documents.businessLicense && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        {documents.businessLicense.name}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Tax Registration Document</Label>
                  <p className="text-sm text-muted-foreground mb-2">Upload your tax registration (optional but recommended)</p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="taxDocument"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload("taxDocument", e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="taxDocument" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 5MB</p>
                    </label>
                    {documents.taxDocument && (
                      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        {documents.taxDocument.name}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Portfolio / Work Samples *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Upload photos or documents showcasing your work (minimum 3)</p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="portfolio"
                      accept="image/*,.pdf"
                      multiple
                      onChange={(e) => handleFileUpload("portfolio", e.target.files)}
                      className="hidden"
                    />
                    <label htmlFor="portfolio" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">Multiple files accepted</p>
                    </label>
                    {documents.portfolio.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {documents.portfolio.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                            <FileText className="w-4 h-4" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span> <span className="ml-2">{formData.businessName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span> <span className="ml-2">{formData.businessType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experience:</span> <span className="ml-2">{formData.yearsExperience} years</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Service Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.serviceCategories.map((cat) => (
                      <span key={cat} className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Phone:</span> <span className="ml-2">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span> <span className="ml-2">{formData.email}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Address:</span>{" "}
                      <span className="ml-2">
                        {formData.address}, {formData.city}, {formData.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Documents</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {documents.idDocument ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      ID Document {documents.idDocument ? "Uploaded" : "Missing"}
                    </div>
                    <div className="flex items-center gap-2">
                      {documents.businessLicense ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      Business License {documents.businessLicense ? "Uploaded" : "Missing"}
                    </div>
                    <div className="flex items-center gap-2">
                      {documents.portfolio.length >= 3 ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      Portfolio ({documents.portfolio.length}/3+)
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Your application will be reviewed within 2-3 business days. You'll receive an email notification once your account has been approved or if additional information is needed.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
                Previous
              </Button>
              {currentStep < 5 ? (
                <Button onClick={handleNext}>
                  Next Step <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

