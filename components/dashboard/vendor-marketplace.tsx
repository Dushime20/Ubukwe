"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Search, Filter, MapPin, Phone, MessageCircle, Heart, Calendar, Users } from "lucide-react";
import { useState } from "react";

interface Vendor {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  description: string;
  image: string;
  specialties: string[];
  availability: string;
  verified: boolean;
}

export function VendorMarketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const vendors: Vendor[] = [
    {
      id: 1,
      name: "Intore Cultural Group",
      category: "Entertainment",
      location: "Kigali",
      rating: 4.9,
      reviews: 127,
      priceRange: "120,000 - 200,000 RWF",
      description: "Professional traditional Rwandan dancers specializing in Intore and cultural performances for weddings.",
      image: "/vendors/intore-group.jpg",
      specialties: ["Intore Dance", "Cultural Music", "Traditional Costumes"],
      availability: "Available",
      verified: true,
    },
    {
      id: 2,
      name: "Kigali Serena Hotel",
      category: "Venue",
      location: "Kigali",
      rating: 4.8,
      reviews: 89,
      priceRange: "800,000 - 1,500,000 RWF",
      description: "Luxury hotel venue with traditional Rwandan architecture and modern amenities.",
      image: "/vendors/serena-hotel.jpg",
      specialties: ["Indoor Venues", "Outdoor Gardens", "Catering"],
      availability: "Available",
      verified: true,
    },
    {
      id: 3,
      name: "Rwandan Delights Catering",
      category: "Food",
      location: "Kigali",
      rating: 4.7,
      reviews: 156,
      priceRange: "150,000 - 300,000 RWF",
      description: "Authentic Rwandan cuisine with traditional recipes and modern presentation.",
      image: "/vendors/rwandan-delights.jpg",
      specialties: ["Traditional Cuisine", "Wedding Cakes", "Dietary Options"],
      availability: "Available",
      verified: true,
    },
    {
      id: 4,
      name: "Heritage Decorations",
      category: "Decor",
      location: "Butare",
      rating: 4.6,
      reviews: 78,
      priceRange: "200,000 - 400,000 RWF",
      description: "Traditional Rwandan decorations with cultural patterns and modern floral arrangements.",
      image: "/vendors/heritage-decor.jpg",
      specialties: ["Traditional Patterns", "Floral Arrangements", "Venue Transformation"],
      availability: "Limited",
      verified: true,
    },
    {
      id: 5,
      name: "Emmanuel MC Services",
      category: "Entertainment",
      location: "Kigali",
      rating: 4.8,
      reviews: 94,
      priceRange: "80,000 - 120,000 RWF",
      description: "Bilingual MC specializing in Rwandan wedding ceremonies and cultural traditions.",
      image: "/vendors/emmanuel-mc.jpg",
      specialties: ["Bilingual Hosting", "Cultural Expertise", "Event Coordination"],
      availability: "Available",
      verified: true,
    },
    {
      id: 6,
      name: "Kinyarwanda Music Ensemble",
      category: "Entertainment",
      location: "Gisenyi",
      rating: 4.9,
      reviews: 67,
      priceRange: "100,000 - 180,000 RWF",
      description: "Traditional Rwandan musicians playing authentic instruments for wedding ceremonies.",
      image: "/vendors/kinyarwanda-music.jpg",
      specialties: ["Traditional Instruments", "Live Performances", "Cultural Music"],
      availability: "Available",
      verified: true,
    },
  ];

  const categories = [
    "all", "Entertainment", "Venue", "Food", "Decor", "Photography", "Transportation", "Beauty"
  ];

  const locations = [
    "all", "Kigali", "Butare", "Gisenyi", "Musanze", "Huye", "Rwamagana"
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || vendor.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || vendor.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return parseInt(a.priceRange.split(" - ")[0].replace(/,/g, "")) - parseInt(b.priceRange.split(" - ")[0].replace(/,/g, ""));
      case "price-high":
        return parseInt(b.priceRange.split(" - ")[0].replace(/,/g, "")) - parseInt(a.priceRange.split(" - ")[0].replace(/,/g, ""));
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "default";
      case "Limited": return "secondary";
      case "Unavailable": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Find Wedding Vendors</h2>
          <p className="text-muted-foreground">Discover trusted Rwandan wedding service providers</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {sortedVendors.length} vendors found
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedVendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    {vendor.verified && (
                      <Badge variant="default" className="text-xs">Verified</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                </div>
                <Badge variant={getAvailabilityColor(vendor.availability)}>
                  {vendor.availability}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(vendor.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{vendor.rating}</span>
                <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {vendor.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price Range:</span>
                  <span className="font-medium">{vendor.priceRange}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{vendor.category}</Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {vendor.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {vendor.specialties.length > 2 && (
                  <Badge variant="secondary" className="text-xs">
                    +{vendor.specialties.length - 2} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedVendors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No vendors found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedLocation("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
