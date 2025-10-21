"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Filter, 
  Calendar,
  Users,
  DollarSign,
  Star,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Heart,
  Share2,
  Navigation
} from "lucide-react";
import { useState } from "react";

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  priceRange: string;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  description: string;
  contact: {
    phone: string;
    email: string;
  };
  availability: string[];
  features: string[];
  distance?: string;
}

export function VenueManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedCapacity, setSelectedCapacity] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const venues: Venue[] = [
    {
      id: "1",
      name: "Kigali Serena Hotel",
      location: "Kigali City Center",
      capacity: 300,
      priceRange: "800,000 - 1,500,000 RWF",
      rating: 4.8,
      reviews: 89,
      images: ["/venues/serena-1.jpg", "/venues/serena-2.jpg"],
      amenities: ["Parking", "Catering", "Sound System", "Lighting", "Air Conditioning"],
      description: "Luxury hotel venue with traditional Rwandan architecture and modern amenities. Perfect for elegant weddings.",
      contact: {
        phone: "+250 788 123 456",
        email: "events@serena.rw"
      },
      availability: ["2024-03-15", "2024-03-22", "2024-04-05"],
      features: ["Indoor", "Outdoor Garden", "Traditional Architecture"],
      distance: "2.5 km"
    },
    {
      id: "2",
      name: "Hotel des Mille Collines",
      location: "Kigali",
      capacity: 200,
      priceRange: "600,000 - 1,200,000 RWF",
      rating: 4.6,
      reviews: 67,
      images: ["/venues/mille-collines-1.jpg"],
      amenities: ["Parking", "Catering", "Sound System", "Swimming Pool"],
      description: "Historic hotel with beautiful gardens and poolside ceremony options.",
      contact: {
        phone: "+250 788 234 567",
        email: "events@millecollines.rw"
      },
      availability: ["2024-03-20", "2024-04-10", "2024-04-15"],
      features: ["Indoor", "Poolside", "Garden"],
      distance: "3.2 km"
    },
    {
      id: "3",
      name: "Rwanda Cultural Center",
      location: "Butare",
      capacity: 150,
      priceRange: "400,000 - 800,000 RWF",
      rating: 4.7,
      reviews: 45,
      images: ["/venues/cultural-center-1.jpg"],
      amenities: ["Parking", "Traditional Music", "Cultural Performances"],
      description: "Authentic Rwandan cultural venue perfect for traditional weddings.",
      contact: {
        phone: "+250 788 345 678",
        email: "events@culturalcenter.rw"
      },
      availability: ["2024-03-25", "2024-04-12", "2024-04-20"],
      features: ["Traditional", "Cultural", "Outdoor"],
      distance: "85 km"
    },
    {
      id: "4",
      name: "Lake Kivu Resort",
      location: "Gisenyi",
      capacity: 250,
      priceRange: "500,000 - 1,000,000 RWF",
      rating: 4.9,
      reviews: 78,
      images: ["/venues/lake-kivu-1.jpg"],
      amenities: ["Parking", "Catering", "Lake View", "Accommodation"],
      description: "Stunning lakeside venue with breathtaking views of Lake Kivu.",
      contact: {
        phone: "+250 788 456 789",
        email: "events@lakekivu.rw"
      },
      availability: ["2024-03-18", "2024-04-08", "2024-04-18"],
      features: ["Lakeside", "Scenic", "Accommodation"],
      distance: "120 km"
    }
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === "all" || venue.location.includes(selectedLocation);
    
    const matchesCapacity = selectedCapacity === "all" || 
      (selectedCapacity === "small" && venue.capacity <= 100) ||
      (selectedCapacity === "medium" && venue.capacity > 100 && venue.capacity <= 200) ||
      (selectedCapacity === "large" && venue.capacity > 200);
    
    const matchesPrice = selectedPriceRange === "all" || 
      (selectedPriceRange === "budget" && venue.priceRange.includes("400,000")) ||
      (selectedPriceRange === "mid" && venue.priceRange.includes("500,000")) ||
      (selectedPriceRange === "luxury" && venue.priceRange.includes("800,000"));
    
    return matchesSearch && matchesLocation && matchesCapacity && matchesPrice;
  });

  const toggleFavorite = (venueId: string) => {
    setFavorites(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const getStarRating = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Venue & Location</h2>
          <p className="text-muted-foreground">Find and book the perfect wedding venue</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            View Map
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            My Bookings
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Kigali">Kigali</SelectItem>
                <SelectItem value="Butare">Butare</SelectItem>
                <SelectItem value="Gisenyi">Gisenyi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCapacity} onValueChange={setSelectedCapacity}>
              <SelectTrigger>
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Capacities</SelectItem>
                <SelectItem value="small">Small (≤100)</SelectItem>
                <SelectItem value="medium">Medium (101-200)</SelectItem>
                <SelectItem value="large">Large (200+)</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (≤500k)</SelectItem>
                <SelectItem value="mid">Mid-range (500k-800k)</SelectItem>
                <SelectItem value="luxury">Luxury (800k+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVenues.map((venue) => (
          <Card key={venue.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <Badge variant="secondary">{venue.location}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{venue.capacity} guests</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.distance}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(venue.id)}
                >
                  <Heart className={`w-5 h-5 ${
                    favorites.includes(venue.id) ? "text-red-500 fill-current" : "text-muted-foreground"
                  }`} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {getStarRating(venue.rating)}
                </div>
                <span className="text-sm font-medium">{venue.rating}</span>
                <span className="text-sm text-muted-foreground">({venue.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {venue.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{venue.priceRange}</span>
                </div>
                <Badge variant="outline">Available</Badge>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1">
                {venue.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {venue.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{venue.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {venue.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredVenues.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No venues found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedLocation("all");
              setSelectedCapacity("all");
              setSelectedPriceRange("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
