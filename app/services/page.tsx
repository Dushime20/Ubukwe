"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Music, Utensils, MapPin, Palette, Mic, Star, Search } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const services = [
    {
      id: 1,
      category: "dancers",
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
      category: "music",
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

  const categories = [
    { value: "all", label: "All Services" },
    { value: "dancers", label: "Traditional Dancers" },
    { value: "mc", label: "Master of Ceremonies" },
    { value: "decoration", label: "Decorations" },
    { value: "catering", label: "Catering" },
    { value: "venue", label: "Venues" },
    { value: "music", label: "Music" },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#eff4fa] ">
      {/* Header */}
  <Navbar/>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Wedding Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Rwandan wedding service providers who understand and honor your cultural traditions.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search services or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
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

                <Link href={`/booking/${service.id}`}>
                  <Button className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}
