"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle, ArrowRight, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  ValidationError,
} from "@/lib/validation/onboarding-schema"

export default function ProviderOnboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stepErrors, setStepErrors] = useState<ValidationError[]>([])
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
    selfiePhoto: null as File | null,
    businessLicense: null as File | null,
    taxCertificate: null as File | null,
    insuranceCertificate: null as File | null,
    portfolio: [] as File[],
  })

  const steps = [
    { id: 1, title: "Business Information", completed: currentStep > 1 },
    { id: 2, title: "Service Details", completed: currentStep > 2 },
    { id: 3, title: "Contact Information", completed: currentStep > 3 },
    { id: 4, title: "Identity Verification", completed: currentStep > 4 },
    { id: 5, title: "Business Documents", completed: currentStep > 5 },
    { id: 6, title: "Review & Submit", completed: false },
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

  const validateCurrentStep = (): boolean => {
    setStepErrors([])
    let validation

    switch (currentStep) {
      case 1:
        validation = validateStep1({
          businessName: formData.businessName,
          businessType: formData.businessType,
          yearsExperience: formData.yearsExperience,
        })
        break
      case 2:
        validation = validateStep2({
          serviceCategories: formData.serviceCategories,
          description: formData.description,
        })
        break
      case 3:
        validation = validateStep3({
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        })
        break
      case 4:
        validation = validateStep4({
          idDocument: documents.idDocument,
          selfiePhoto: documents.selfiePhoto,
        })
        break
      case 5:
        validation = validateStep5({
          businessLicense: documents.businessLicense,
          portfolio: documents.portfolio,
        })
        break
      default:
        return true
    }

    if (!validation.isValid) {
      setStepErrors(validation.errors)
      return false
    }
    return true
  }

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    setStepErrors([])
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return
    }
    setIsSubmitting(true)
    try {
      // 1. Upload Documents first
      await apiClient.provider.uploadDocuments(
        documents.businessLicense || undefined,
        documents.portfolio.length > 0 ? documents.portfolio : undefined,
        documents.idDocument || undefined,
        documents.selfiePhoto || undefined
      )

      // 2. Register Team / Complete Onboarding
      const registrationData = {
        business_name: formData.businessName,
        business_type: formData.businessType,
        years_experience: parseInt(formData.yearsExperience) || 0,
        business_description: formData.description,
        service_categories: formData.serviceCategories,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        phone_number: formData.phone,
        email: formData.email,
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

  const progress = (currentStep / 6) * 100

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
            {stepErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Please fix the following errors:</h3>
                    <ul className="space-y-1">
                      {stepErrors.map((error, idx) => (
                        <li key={idx} className="text-sm text-red-800">
                          • {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

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
                    className={stepErrors.some(e => e.field === "businessName") ? "border-red-500" : ""}
                  />
                  {stepErrors.some(e => e.field === "businessName") && (
                    <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "businessName")?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger className={stepErrors.some(e => e.field === "businessType") ? "border-red-500" : ""}>
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
                  {stepErrors.some(e => e.field === "businessType") && (
                    <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "businessType")?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="yearsExperience">Years of Experience *</Label>
                  <Select
                    value={formData.yearsExperience}
                    onValueChange={(value) => handleInputChange("yearsExperience", value)}
                  >
                    <SelectTrigger className={stepErrors.some(e => e.field === "yearsExperience") ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-5">2-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11+">11+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {stepErrors.some(e => e.field === "yearsExperience") && (
                    <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "yearsExperience")?.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceCategories">Service Categories *</Label>
                  <p className="text-sm text-muted-foreground mb-2">Select at least one category</p>
                  {stepErrors.some(e => e.field === "serviceCategories") && (
                    <p className="text-sm text-red-600 mb-2">{stepErrors.find(e => e.field === "serviceCategories")?.message}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Photography", "Venue", "Catering", "Music", "Decoration", "Transportation", "MC Services", "Dance", "Other", ...formData.serviceCategories.filter(cat => !["Photography", "Venue", "Catering", "Music", "Decoration", "Transportation", "MC Services", "Dance", "Other"].includes(cat))].map(
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
                  <div className="mt-3">
                    <Label htmlFor="customCategory">Custom Category</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="customCategory"
                        placeholder="Enter custom category"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = e.currentTarget.value.trim()
                            if (value && !formData.serviceCategories.includes(value)) {
                              handleInputChange("serviceCategories", [...formData.serviceCategories, value])
                              e.currentTarget.value = ''
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          const value = input.value.trim()
                          if (value && !formData.serviceCategories.includes(value)) {
                            handleInputChange("serviceCategories", [...formData.serviceCategories, value])
                            input.value = ''
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
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
                    className={stepErrors.some(e => e.field === "description") ? "border-red-500" : ""}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">{formData.description.length}/500 characters</p>
                    {stepErrors.some(e => e.field === "description") && (
                      <p className="text-sm text-red-600">{stepErrors.find(e => e.field === "description")?.message}</p>
                    )}
                  </div>
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
                      className={stepErrors.some(e => e.field === "phone") ? "border-red-500" : ""}
                    />
                    {stepErrors.some(e => e.field === "phone") && (
                      <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "phone")?.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={stepErrors.some(e => e.field === "email") ? "border-red-500" : ""}
                    />
                    {stepErrors.some(e => e.field === "email") && (
                      <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "email")?.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter your business address"
                    className={stepErrors.some(e => e.field === "address") ? "border-red-500" : ""}
                  />
                  {stepErrors.some(e => e.field === "address") && (
                    <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "address")?.message}</p>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      className={stepErrors.some(e => e.field === "city") ? "border-red-500" : ""}
                    />
                    {stepErrors.some(e => e.field === "city") && (
                      <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "city")?.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger className={stepErrors.some(e => e.field === "country") ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rwanda">Rwanda</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                      </SelectContent>
                    </Select>
                    {stepErrors.some(e => e.field === "country") && (
                      <p className="text-sm text-red-600 mt-1">{stepErrors.find(e => e.field === "country")?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Identity Verification */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>Identity Verification:</strong> Please upload both your National ID and a clear selfie photo. These will be used to verify your identity.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>National ID Document *</Label>
                    <p className="text-sm text-muted-foreground mb-2">Upload a clear photo of your National ID</p>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="idDocument"
                        accept="image/*"
                        onChange={(e) => handleFileUpload("idDocument", e.target.files)}
                        className="hidden"
                      />
                      <label htmlFor="idDocument" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Click to upload National ID</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
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
                    <Label>Selfie Photo *</Label>
                    <p className="text-sm text-muted-foreground mb-2">Take a clear selfie for identity verification</p>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="selfiePhoto"
                        accept="image/*"
                        capture="user"
                        onChange={(e) => handleFileUpload("selfiePhoto", e.target.files)}
                        className="hidden"
                      />
                      <label htmlFor="selfiePhoto" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium">Click to take selfie</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                      </label>
                      {documents.selfiePhoto && (
                        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          {documents.selfiePhoto.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Business Documents */}
            {currentStep === 5 && (
              <div className="space-y-6">
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

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
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
                      National ID {documents.idDocument ? "Uploaded" : "Missing"}
                    </div>
                    <div className="flex items-center gap-2">
                      {documents.selfiePhoto ? <CheckCircle className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                      Selfie Photo {documents.selfiePhoto ? "Uploaded" : "Missing"}
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
              {currentStep < 6 ? (
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

