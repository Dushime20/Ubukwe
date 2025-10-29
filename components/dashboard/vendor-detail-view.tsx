"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Mail, Calendar, X, Play, Image as ImageIcon, FileText, Check, DollarSign, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface VendorDetailViewProps {
  vendor: {
    id: number
    name: string
    category: string
    location: string
    rating: number
    reviews: number
    priceRange: string
    description: string
    image: string
    specialties: string[]
    availability: string
    verified: boolean
  }
  bookedDates: string[]
  onClose: () => void
}

export function VendorDetailView({ vendor, bookedDates, onClose }: VendorDetailViewProps) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock data
  const gallery = [
    { type: "image", url: vendor.image || "/placeholder.svg", thumbnail: vendor.image || "/placeholder.svg" },
    { type: "image", url: "/vendors/sample-1.jpg", thumbnail: "/vendors/sample-1.jpg" },
    { type: "image", url: "/vendors/sample-2.jpg", thumbnail: "/vendors/sample-2.jpg" },
    { type: "image", url: "/vendors/sample-3.jpg", thumbnail: "/vendors/sample-3.jpg" },
    { type: "video", url: "/vendors/video-1.mp4", thumbnail: "/vendors/video-thumb.jpg" },
  ]

  const reviews = [
    {
      id: 1,
      user: "Marie Uwimana",
      avatar: "",
      rating: 5,
      comment: "Amazing performance! Our guests loved it. The dancers were professional and on time.",
      date: "2024-02-15",
    },
    {
      id: 2,
      user: "Jean Baptiste",
      avatar: "",
      rating: 4,
      comment: "Very professional and on time. The cultural performance was authentic and beautiful.",
      date: "2024-02-10",
    },
    {
      id: 3,
      user: "Grace Mukamana",
      avatar: "",
      rating: 5,
      comment: "Outstanding service! Made our wedding day special with their amazing performance.",
      date: "2024-01-28",
    },
  ]

  const handleBookNow = () => {
    router.push(`/customer/dashboard?tab=booking&serviceId=${vendor.id}`, { scroll: false })
  }

  const handleContactVendor = () => {
    // In real app, this would create an inquiry and open messages tab
    // For now, navigate to messages tab with vendor ID
    router.push(`/customer/dashboard?tab=messages&vendorId=${vendor.id}`, { scroll: false })
    // Close modal so user sees messages
    onClose()
  }

  // Generate calendar dates for next 3 months
  const generateCalendarDays = () => {
    const days: Array<{ date: Date; isBooked: boolean; isPast: boolean }> = []
    const today = new Date()
    for (let i = 0; i < 90; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateStr = date.toISOString().split("T")[0]
      days.push({
        date,
        isBooked: bookedDates.includes(dateStr),
        isPast: date < today,
      })
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  // Mock packages data
  const packages = [
    {
      id: 1,
      name: "Basic Package",
      price: 120000,
      duration: "2 hours",
      description: "Perfect for intimate ceremonies",
      features: [
        "Traditional dance performance",
        "Up to 5 dancers",
        "Basic costumes",
        "2-hour performance",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Standard Package",
      price: 180000,
      duration: "3 hours",
      description: "Most popular choice for weddings",
      features: [
        "Extended traditional dance performance",
        "Up to 8 dancers",
        "Premium costumes",
        "Live drumming",
        "3-hour performance",
        "Cultural storytelling",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Premium Package",
      price: 250000,
      duration: "4 hours",
      description: "Ultimate cultural experience",
      features: [
        "Full traditional performance",
        "Up to 12 dancers",
        "Luxury traditional costumes",
        "Live drumming ensemble",
        "4-hour performance",
        "Cultural storytelling",
        "Photo opportunities",
        "Custom choreography consultation",
      ],
      popular: false,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={vendor.image || "/placeholder.svg"} />
                <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                  {vendor.verified && (
                    <Badge variant="default" className="text-xs">Verified</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  {vendor.location} • {vendor.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleContactVendor}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button onClick={handleBookNow}>Book Now</Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Main Image/Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden">
              {gallery[selectedImage]?.type === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Play className="h-16 w-16 text-white" />
                  <span className="ml-2 text-white font-medium">Video Preview</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                  <ImageIcon className="h-20 w-20 text-primary/50" />
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {gallery.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-video rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    {item.type === "video" ? (
                      <div className="w-full h-full bg-black/50 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-primary/50" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Rating and Price */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(vendor.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{vendor.rating}</span>
                <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Price Range</p>
              <p className="text-lg font-bold">{vendor.priceRange}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="packages" className="w-full">
            <TabsList>
              <TabsTrigger value="packages">Packages & Pricing</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
            </TabsList>

            <TabsContent value="packages" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Choose Your Package</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the package that best fits your wedding needs
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className={`relative ${
                        pkg.popular ? "border-primary border-2 shadow-lg" : ""
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge variant="default" className="text-xs">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{pkg.price.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground">RWF</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">Duration: {pkg.duration}</p>
                        </div>
                        <div className="border-t my-4"></div>
                        <ul className="space-y-2">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full mt-4"
                          variant={pkg.popular ? "default" : "outline"}
                          onClick={() => {
                            router.push(`/customer/dashboard?tab=booking&serviceId=${vendor.id}&packageId=${pkg.id}`, { scroll: false })
                          }}
                        >
                          Select Package
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> All packages include standard setup and breakdown. Additional services
                    such as extended hours, extra dancers, or custom requests can be discussed during booking.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{vendor.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+250 788 123 456</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>contact@{vendor.name.toLowerCase().replace(/\s+/g, "")}.rw</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4">
                {gallery.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(index)}
                  >
                    {item.type === "video" ? (
                      <div className="w-full h-full bg-black/50 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-primary/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4 mt-4">
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{review.user}</div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="availability" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Booking Calendar
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Booked dates are marked in red. Available dates can be selected during booking.
                </p>
                <div className="grid grid-cols-7 gap-2 text-xs">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="font-semibold text-center p-2">
                      {day}
                    </div>
                  ))}
                  {calendarDays.slice(0, 42).map((day, index) => (
                    <div
                      key={index}
                      className={`p-2 text-center rounded-md border ${
                        day.isBooked
                          ? "bg-red-100 border-red-300 text-red-700"
                          : day.isPast
                          ? "bg-muted text-muted-foreground"
                          : "bg-green-50 border-green-200 text-green-700"
                      }`}
                    >
                      {day.date.getDate()}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                    <span className="text-xs">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                    <span className="text-xs">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-muted rounded"></div>
                    <span className="text-xs">Past</span>
                  </div>
                </div>
                {bookedDates.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Upcoming Booked Dates:</p>
                    <div className="flex flex-wrap gap-2">
                      {bookedDates.map((date) => (
                        <Badge key={date} variant="destructive">
                          {new Date(date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleBookNow} className="flex-1">
              Book This Service
            </Button>
            <Button variant="outline">Contact Provider</Button>
            <Button variant="outline">Save to Favorites</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

