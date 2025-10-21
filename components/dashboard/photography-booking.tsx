"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  DollarSign,
  Clock,
  Heart,
  Share2,
  BookOpen,
  Award,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

interface Photographer {
  id: string;
  name: string;
  businessName: string;
  location: string;
  rating: number;
  reviews: number;
  priceRange: string;
  specialties: string[];
  portfolio: string[];
  description: string;
  experience: string;
  languages: string[];
  awards: string[];
  contact: {
    phone: string;
    email: string;
  };
  availability: string[];
  packages: {
    name: string;
    price: string;
    duration: string;
    includes: string[];
  }[];
}

export function PhotographyBooking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const photographers: Photographer[] = [
    {
      id: "1",
      name: "Jean Baptiste",
      businessName: "Rwandan Heritage Photography",
      location: "Kigali",
      rating: 4.9,
      reviews: 127,
      priceRange: "200,000 - 500,000 RWF",
      specialties: ["Traditional Weddings", "Cultural Photography", "Portrait"],
      portfolio: ["/photography/jb-1.jpg", "/photography/jb-2.jpg"],
      description: "Specializing in traditional Rwandan wedding photography with deep cultural understanding and modern techniques.",
      experience: "8 years",
      languages: ["Kinyarwanda", "English", "French"],
      awards: ["Best Cultural Photographer 2023", "Wedding Photographer of the Year"],
      contact: {
        phone: "+250 788 123 456",
        email: "jean@rwandanheritage.rw"
      },
      availability: ["2024-03-15", "2024-03-22", "2024-04-05"],
      packages: [
        {
          name: "Essential Package",
          price: "200,000 RWF",
          duration: "6 hours",
          includes: ["Ceremony & Reception", "200+ edited photos", "Online gallery", "USB drive"]
        },
        {
          name: "Premium Package",
          price: "350,000 RWF",
          duration: "10 hours",
          includes: ["Full day coverage", "500+ edited photos", "Engagement session", "Photo album", "Online gallery"]
        },
        {
          name: "Luxury Package",
          price: "500,000 RWF",
          duration: "12 hours",
          includes: ["Full day coverage", "800+ edited photos", "Engagement session", "Premium album", "Video highlights", "Drone footage"]
        }
      ]
    },
    {
      id: "2",
      name: "Grace Uwimana",
      businessName: "Modern Love Studio",
      location: "Kigali",
      rating: 4.8,
      reviews: 89,
      priceRange: "150,000 - 400,000 RWF",
      specialties: ["Modern Weddings", "Lifestyle", "Candid Photography"],
      portfolio: ["/photography/grace-1.jpg", "/photography/grace-2.jpg"],
      description: "Contemporary wedding photographer capturing authentic moments with artistic flair and modern editing techniques.",
      experience: "5 years",
      languages: ["Kinyarwanda", "English"],
      awards: ["Rising Star Photographer 2022"],
      contact: {
        phone: "+250 788 234 567",
        email: "grace@modernlove.rw"
      },
      availability: ["2024-03-18", "2024-04-08", "2024-04-15"],
      packages: [
        {
          name: "Basic Package",
          price: "150,000 RWF",
          duration: "4 hours",
          includes: ["Ceremony only", "100+ edited photos", "Online gallery"]
        },
        {
          name: "Complete Package",
          price: "280,000 RWF",
          duration: "8 hours",
          includes: ["Ceremony & Reception", "300+ edited photos", "Engagement session", "Online gallery"]
        },
        {
          name: "Deluxe Package",
          price: "400,000 RWF",
          duration: "10 hours",
          includes: ["Full day coverage", "500+ edited photos", "Engagement session", "Photo album", "Video slideshow"]
        }
      ]
    },
    {
      id: "3",
      name: "Paul Nkurunziza",
      businessName: "Mountain View Photography",
      location: "Musanze",
      rating: 4.7,
      reviews: 67,
      priceRange: "180,000 - 450,000 RWF",
      specialties: ["Scenic Weddings", "Nature Photography", "Adventure"],
      portfolio: ["/photography/paul-1.jpg", "/photography/paul-2.jpg"],
      description: "Specializing in scenic mountain weddings with breathtaking natural backdrops and adventure photography.",
      experience: "6 years",
      languages: ["Kinyarwanda", "English", "Swahili"],
      awards: ["Best Scenic Photography 2023"],
      contact: {
        phone: "+250 788 345 678",
        email: "paul@mountainview.rw"
      },
      availability: ["2024-03-20", "2024-04-10", "2024-04-18"],
      packages: [
        {
          name: "Scenic Package",
          price: "180,000 RWF",
          duration: "6 hours",
          includes: ["Ceremony & Reception", "250+ edited photos", "Scenic locations", "Online gallery"]
        },
        {
          name: "Adventure Package",
          price: "320,000 RWF",
          duration: "8 hours",
          includes: ["Full day coverage", "400+ edited photos", "Multiple locations", "Adventure shots", "Online gallery"]
        },
        {
          name: "Premium Scenic",
          price: "450,000 RWF",
          duration: "10 hours",
          includes: ["Full day coverage", "600+ edited photos", "Drone footage", "Premium locations", "Photo album"]
        }
      ]
    }
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = selectedLocation === "all" || photographer.location === selectedLocation;
    
    const matchesStyle = selectedStyle === "all" || 
      photographer.specialties.some(specialty => specialty.toLowerCase().includes(selectedStyle));
    
    const matchesPrice = selectedPriceRange === "all" || 
      (selectedPriceRange === "budget" && photographer.priceRange.includes("150,000")) ||
      (selectedPriceRange === "mid" && photographer.priceRange.includes("200,000")) ||
      (selectedPriceRange === "premium" && photographer.priceRange.includes("350,000"));
    
    return matchesSearch && matchesLocation && matchesStyle && matchesPrice;
  });

  const toggleFavorite = (photographerId: string) => {
    setFavorites(prev => 
      prev.includes(photographerId) 
        ? prev.filter(id => id !== photographerId)
        : [...prev, photographerId]
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
          <h2 className="text-2xl font-bold">Photography</h2>
          <p className="text-muted-foreground">Find professional photographers for your wedding</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Heart className="w-4 h-4 mr-2" />
            My Favorites ({favorites.length})
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
                placeholder="Search photographers..."
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
                <SelectItem value="Musanze">Musanze</SelectItem>
                <SelectItem value="Butare">Butare</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Styles</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="scenic">Scenic</SelectItem>
                <SelectItem value="candid">Candid</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (≤200k)</SelectItem>
                <SelectItem value="mid">Mid-range (200k-350k)</SelectItem>
                <SelectItem value="premium">Premium (350k+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Photographer Cards */}
      <div className="space-y-6">
        {filteredPhotographers.map((photographer) => (
          <Card key={photographer.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold">{photographer.name}</h3>
                      <Badge variant="secondary">{photographer.businessName}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{photographer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{photographer.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{photographer.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {getStarRating(photographer.rating)}
                      </div>
                      <span className="text-sm font-medium">{photographer.rating}</span>
                      <span className="text-sm text-muted-foreground">({photographer.reviews} reviews)</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{photographer.description}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {photographer.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Awards */}
                    {photographer.awards.length > 0 && (
                      <div className="flex items-center space-x-1 mb-3">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">
                          {photographer.awards.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(photographer.id)}
                  >
                    <Heart className={`w-5 h-5 ${
                      favorites.includes(photographer.id) ? "text-red-500 fill-current" : "text-muted-foreground"
                    }`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Packages */}
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Packages & Pricing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photographer.packages.map((pkg, index) => (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{pkg.name}</CardTitle>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{pkg.price}</span>
                          <Badge variant="outline">{pkg.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {pkg.includes.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Portfolio
                  </Button>
                </div>
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredPhotographers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No photographers found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedLocation("all");
              setSelectedStyle("all");
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
