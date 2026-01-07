"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Music, Utensils, MapPin, Palette, Mic, Star, Search } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { ServiceSchema } from "@/components/schemas/service-schema"
import { EmptyState } from "@/components/ui/empty-state"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: 1,
      category: "traditional-troupe",
      icon: <Users className="h-6 w-6" />,
      title: "Intore Cultural Dancers",
      provider: "Amahoro Dance Troupe",
      location: "Kigali",
      rating: 4.9,
      reviews: 127,
      price: "From $200",
      image: "/rwandan-traditional-dancer.jpg",
      description: "Authentic Intore dancers with traditional costumes and choreography",
    },
    {
      id: 2,
      category: "mc",
      icon: <Mic className="h-6 w-6" />,
      title: "Bilingual Wedding MC",
      provider: "Jean-Claude Events",
      location: "Kigali",
      rating: 4.8,
      reviews: 89,
      price: "From $150",
      image: "/professional-mc-microphone.jpg",
      description: "Experienced MC fluent in Kinyarwanda, French, and English",
    },
    {
      id: 3,
      category: "decoration",
      icon: <Palette className="h-6 w-6" />,
      title: "Traditional Wedding Decor",
      provider: "Ubwiza Decorations",
      location: "Kigali",
      rating: 4.7,
      reviews: 156,
      price: "From $300",
      image: "/rwandan-wedding-decorations-traditional.jpg",
      description: "Beautiful traditional patterns and modern elegant designs",
    },
    {
      id: 4,
      category: "catering",
      icon: <Utensils className="h-6 w-6" />,
      title: "Authentic Rwandan Cuisine",
      provider: "Inyama n'Amaru Catering",
      location: "Kigali",
      rating: 4.9,
      reviews: 203,
      price: "From $25/person",
      image: "/rwandan-traditional-food-buffet.jpg",
      description: "Traditional dishes including ubugali, inyama, and fresh vegetables",
    },
    {
      id: 5,
      category: "venue",
      icon: <MapPin className="h-6 w-6" />,
      title: "Garden Wedding Venue",
      provider: "Serena Hotel Kigali",
      location: "Kigali",
      rating: 4.8,
      reviews: 94,
      price: "From $500",
      image: "/beautiful-garden-wedding-venue-rwanda.jpg",
      description: "Stunning outdoor venue with mountain views and traditional architecture",
    },
    {
      id: 6,
      category: "music-band",
      icon: <Music className="h-6 w-6" />,
      title: "Traditional Musicians",
      provider: "Inanga Heritage Group",
      location: "Kigali",
      rating: 4.6,
      reviews: 78,
      price: "From $180",
      image: "/rwandan-traditional-musicians-inanga.jpg",
      description: "Live traditional music with inanga, drums, and cultural songs",
    },
  ]

  const categoryGroups = [
    {
      value: "all",
      label: "All Services",
      icon: <Search className="h-4 w-4" />,
      description: "Browse all available wedding services"
    },
    {
      value: "traditional-troupe",
      label: "Traditional Troupe",
      icon: <Users className="h-4 w-4" />,
      description: "Authentic cultural dancers and performers"
    },
    {
      value: "music-band",
      label: "Music & Entertainment",
      icon: <Music className="h-4 w-4" />,
      description: "Live bands, musicians, and DJs"
    },
    {
      value: "catering",
      label: "Catering",
      icon: <Utensils className="h-4 w-4" />,
      description: "Traditional and modern cuisine services"
    },
    {
      value: "venue",
      label: "Venue",
      icon: <MapPin className="h-4 w-4" />,
      description: "Beautiful event spaces and locations"
    },
    {
      value: "mc",
      label: "Master of Ceremonies",
      icon: <Mic className="h-4 w-4" />,
      description: "Professional event hosts and MCs"
    },
    {
      value: "decoration",
      label: "Decoration",
      icon: <Palette className="h-4 w-4" />,
      description: "Event decoration and styling services"
    },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getServicesForCategory = (categoryValue: string) => {
    if (categoryValue === "all") return filteredServices
    return filteredServices.filter(service => service.category === categoryValue)
  }

  const ServiceCard = ({ service }: { service: typeof services[0] }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-secondary/20 rounded-t-lg overflow-hidden">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-primary">{service.icon}</div>
            <div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{service.provider}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {service.location}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="mb-3">{service.description}</CardDescription>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
            <span className="text-sm text-muted-foreground">({service.reviews})</span>
          </div>
          <span className="font-semibold text-primary">{service.price}</span>
        </div>

        <div className="flex gap-2">
          <Link href={`/services/${service.id}`} className="flex-1">
            <Button variant="outline" className="w-full">View Details</Button>
          </Link>
          <Link href={`/booking/${service.id}`} className="flex-1">
            <Button className="w-full">Book Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#eff4fa]">
      {/* Header */}
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Wedding Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Rwandan wedding service providers who understand and honor your cultural traditions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search services or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto justify-start gap-2 bg-transparent mb-8">
            {categoryGroups.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                {category.value !== "all" && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {getServicesForCategory(category.value).length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {categoryGroups.map((category) => (
            <TabsContent key={category.value} value={category.value} className="mt-0">
              {/* Category Header */}
              {category.value !== "all" && (
                <div className="mb-6 p-6 bg-white rounded-lg border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">{category.icon}</div>
                    <h2 className="text-2xl font-bold">{category.label}</h2>
                    <Badge variant="outline">
                      {getServicesForCategory(category.value).length} service{getServicesForCategory(category.value).length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground ml-10">{category.description}</p>
                </div>
              )}

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getServicesForCategory(category.value).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Empty State */}
              {getServicesForCategory(category.value).length === 0 && (
                <EmptyState
                  title="No services found"
                  description={searchTerm ? "Try adjusting your search or browse other categories." : "No services available in this category yet."}
                  icon={<Search className="h-12 w-12 mx-auto text-muted-foreground" />}
                  action={
                    searchTerm ? (
                      <Button
                        variant="outline"
                        onClick={() => setSearchTerm("")}
                      >
                        Clear Search
                      </Button>
                    ) : undefined
                  }
                />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Schema.org markup for services */}
      {filteredServices.map((service) => (
        <ServiceSchema
          key={service.id}
          service={{
            id: service.id,
            title: service.title,
            provider: service.provider,
            description: service.description,
            price: service.price,
            rating: service.rating,
            reviews: service.reviews,
            location: service.location,
            category: service.category,
            image: service.image,
          }}
        />
      ))}

      <Footer />
    </div>
  )
}
