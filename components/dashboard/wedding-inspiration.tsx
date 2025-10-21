"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Search, 
  Filter, 
  Star, 
  Share2, 
  Download, 
  Bookmark,
  Palette,
  Camera,
  Flower2,
  Crown,
  Sparkles,
  Eye,
  ThumbsUp
} from "lucide-react";
import { useState } from "react";

interface InspirationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
  isBookmarked: boolean;
  photographer?: string;
  venue?: string;
  colorPalette?: string[];
}

export function WeddingInspiration() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);

  const inspirationItems: InspirationItem[] = [
    {
      id: "1",
      title: "Traditional Rwandan Ceremony",
      category: "Ceremony",
      image: "/inspiration/traditional-ceremony.jpg",
      description: "Beautiful traditional Rwandan wedding ceremony with Intore dancers and cultural elements.",
      tags: ["Traditional", "Cultural", "Intore", "Rwandan"],
      likes: 124,
      views: 2340,
      isBookmarked: false,
      photographer: "Jean Baptiste Photography",
      venue: "Kigali Cultural Center",
      colorPalette: ["#8B4513", "#DAA520", "#228B22", "#FFFFFF"]
    },
    {
      id: "2",
      title: "Modern Garden Wedding",
      category: "Reception",
      image: "/inspiration/garden-wedding.jpg",
      description: "Elegant garden wedding with modern touches and beautiful floral arrangements.",
      tags: ["Modern", "Garden", "Floral", "Outdoor"],
      likes: 89,
      views: 1890,
      isBookmarked: true,
      photographer: "Grace Photography",
      venue: "Lake Kivu Resort",
      colorPalette: ["#90EE90", "#FFB6C1", "#87CEEB", "#F0E68C"]
    },
    {
      id: "3",
      title: "Luxury Hotel Reception",
      category: "Reception",
      image: "/inspiration/luxury-hotel.jpg",
      description: "Sophisticated luxury hotel wedding with elegant decor and premium amenities.",
      tags: ["Luxury", "Hotel", "Elegant", "Indoor"],
      likes: 156,
      views: 3120,
      isBookmarked: false,
      photographer: "Paul Studio",
      venue: "Kigali Serena Hotel",
      colorPalette: ["#000000", "#FFFFFF", "#FFD700", "#C0C0C0"]
    },
    {
      id: "4",
      title: "Cultural Dance Performance",
      category: "Entertainment",
      image: "/inspiration/cultural-dance.jpg",
      description: "Stunning Intore cultural dance performance during wedding celebration.",
      tags: ["Cultural", "Dance", "Performance", "Traditional"],
      likes: 203,
      views: 4560,
      isBookmarked: true,
      photographer: "Rwandan Arts Photography",
      colorPalette: ["#8B0000", "#FFD700", "#000000", "#FFFFFF"]
    },
    {
      id: "5",
      title: "Mountain View Ceremony",
      category: "Ceremony",
      image: "/inspiration/mountain-view.jpg",
      description: "Breathtaking mountain view ceremony with natural beauty as backdrop.",
      tags: ["Mountain", "Scenic", "Outdoor", "Natural"],
      likes: 178,
      views: 2890,
      isBookmarked: false,
      photographer: "Mountain View Studio",
      venue: "Musanze Resort",
      colorPalette: ["#228B22", "#8B4513", "#87CEEB", "#FFFFFF"]
    },
    {
      id: "6",
      title: "Traditional Attire Showcase",
      category: "Fashion",
      image: "/inspiration/traditional-attire.jpg",
      description: "Beautiful traditional Rwandan wedding attire and cultural costumes.",
      tags: ["Traditional", "Attire", "Cultural", "Fashion"],
      likes: 145,
      views: 2230,
      isBookmarked: false,
      photographer: "Cultural Fashion Studio",
      colorPalette: ["#8B4513", "#DAA520", "#8B0000", "#FFFFFF"]
    }
  ];

  const filteredItems = inspirationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    const matchesStyle = selectedStyle === "all" || 
      (selectedStyle === "traditional" && item.tags.includes("Traditional")) ||
      (selectedStyle === "modern" && item.tags.includes("Modern")) ||
      (selectedStyle === "luxury" && item.tags.includes("Luxury"));
    
    return matchesSearch && matchesCategory && matchesStyle;
  });

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const categories = ["all", "Ceremony", "Reception", "Entertainment", "Fashion", "Decor"];
  const styles = ["all", "traditional", "modern", "luxury"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Wedding Inspiration</h2>
          <p className="text-muted-foreground">Discover beautiful Rwandan wedding ideas and trends</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Bookmark className="w-4 h-4 mr-2" />
            My Bookmarks ({bookmarkedItems.length})
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Collection
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
                placeholder="Search inspiration..."
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

            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                {styles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style === "all" ? "All Styles" : style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Categories */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm">
          <Crown className="w-4 h-4 mr-2" />
          Traditional
        </Button>
        <Button variant="outline" size="sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Modern
        </Button>
        <Button variant="outline" size="sm">
          <Flower2 className="w-4 h-4 mr-2" />
          Floral
        </Button>
        <Button variant="outline" size="sm">
          <Palette className="w-4 h-4 mr-2" />
          Color Palettes
        </Button>
        <Button variant="outline" size="sm">
          <Camera className="w-4 h-4 mr-2" />
          Photography
        </Button>
      </div>

      {/* Inspiration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow group">
            <div className="relative">
              <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-primary/50" />
                </div>
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleBookmark(item.id)}
                  >
                    <Bookmark className={`w-4 h-4 ${
                      bookmarkedItems.includes(item.id) ? "fill-current" : ""
                    }`} />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary">{item.category}</Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Color Palette */}
              {item.colorPalette && (
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Color Palette:</p>
                  <div className="flex space-x-1">
                    {item.colorPalette.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-background"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>4.8</span>
                </div>
              </div>

              {/* Photographer/Venue Info */}
              {(item.photographer || item.venue) && (
                <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                  {item.photographer && (
                    <p><strong>Photographer:</strong> {item.photographer}</p>
                  )}
                  {item.venue && (
                    <p><strong>Venue:</strong> {item.venue}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No inspiration found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedStyle("all");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Inspiration
        </Button>
      </div>
    </div>
  );
}
