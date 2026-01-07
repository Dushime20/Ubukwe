"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    MapPin, Star, Phone, Mail, Share2, Heart, ArrowLeft,
    CheckCircle, Users, Clock, Award, Calendar, Tag,
    Play, Image as ImageIcon, Video, Sparkles
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

export default function ServiceDetailsPage({ params }: { params: { serviceId: string } }) {
    const [activeTab, setActiveTab] = useState("home")
    const [isFavorite, setIsFavorite] = useState(false)

    // Mock service data - in real app this would be fetched based on serviceId
    const service = {
        id: params.serviceId,
        title: "Intore Cultural Dancers",
        provider: "Amahoro Dance Troupe",
        category: "Traditional Troupe",
        location: "Kigali, Rwanda",
        rating: 4.9,
        reviews: 127,
        verified: true,
        experience: "8+ years",
        image: "/rwandan-traditional-dancer.jpg",
        coverImage: "/rwandan-traditional-dancer.jpg",
        description: "Experience the authentic beauty of Rwandan culture with our professional Intore dance troupe. We bring centuries-old traditions to life through captivating performances that honor your heritage and create unforgettable memories for your special day.",
        longDescription: "Our Intore Cultural Dancers are renowned for their authentic performances that showcase the rich heritage of Rwanda. With over 8 years of experience, our troupe has performed at hundreds of weddings, cultural events, and celebrations across Rwanda and internationally. Each performance is carefully choreographed to blend traditional movements with contemporary flair, ensuring your guests are thoroughly entertained while respecting cultural traditions.",
        specialties: [
            "Traditional Intore Dance",
            "Cultural Storytelling",
            "Custom Choreography",
            "Traditional Costumes",
            "Live Drumming"
        ],
        features: [
            "Professional choreography tailored to your event",
            "Authentic traditional costumes and accessories",
            "Live drumming accompaniment",
            "Cultural storytelling and narration",
            "Photo opportunities with performers",
            "Flexible performance duration"
        ],
        packages: [
            {
                id: "basic",
                name: "Basic Performance",
                price: 150000,
                duration: "30 minutes",
                description: "Perfect for intimate celebrations",
                features: [
                    "4-6 dancers",
                    "Traditional costumes",
                    "30-minute performance",
                    "Basic choreography"
                ],
                popular: false
            },
            {
                id: "standard",
                name: "Standard Performance",
                price: 250000,
                duration: "1 hour",
                description: "Most popular choice for weddings",
                features: [
                    "8-10 dancers",
                    "Premium traditional costumes",
                    "1-hour performance",
                    "Custom choreography",
                    "Live drumming",
                    "Photo session"
                ],
                popular: true
            },
            {
                id: "premium",
                name: "Premium Experience",
                price: 400000,
                duration: "2 hours",
                description: "Complete cultural experience",
                features: [
                    "12-15 dancers",
                    "Luxury traditional costumes",
                    "2-hour performance",
                    "Fully customized choreography",
                    "Live drumming ensemble",
                    "Cultural storytelling",
                    "Extended photo session",
                    "Guest participation segment"
                ],
                popular: false
            }
        ],
        gallery: {
            photos: [
                { id: 1, url: "/rwandan-traditional-dancer.jpg", caption: "Traditional Intore performance" },
                { id: 2, url: "/rwandan-wedding-decorations-traditional.jpg", caption: "Wedding ceremony" },
                { id: 3, url: "/beautiful-garden-wedding-venue-rwanda.jpg", caption: "Outdoor performance" },
                { id: 4, url: "/rwandan-traditional-food-buffet.jpg", caption: "Cultural celebration" },
                { id: 5, url: "/rwandan-traditional-dancer.jpg", caption: "Costume details" },
                { id: 6, url: "/rwandan-traditional-musicians-inanga.jpg", caption: "Drumming ensemble" }
            ],
            videos: [
                { id: 1, url: "/sample-video.mp4", thumbnail: "/rwandan-traditional-dancer.jpg", title: "Full Wedding Performance", duration: "5:30" },
                { id: 2, url: "/sample-video.mp4", thumbnail: "/rwandan-traditional-musicians-inanga.jpg", title: "Behind the Scenes", duration: "3:15" }
            ],
            reels: [
                { id: 1, url: "/sample-reel.mp4", thumbnail: "/rwandan-traditional-dancer.jpg", title: "Quick Highlight", views: "12.5K" },
                { id: 2, url: "/sample-reel.mp4", thumbnail: "/beautiful-garden-wedding-venue-rwanda.jpg", title: "Dance Moves", views: "8.3K" }
            ]
        },
        events: [
            {
                id: 1,
                type: "promotion",
                title: "Spring Wedding Special",
                description: "Book now and get 15% off on our Standard Performance package for weddings in March-May 2024",
                validUntil: "2024-05-31",
                discount: "15% OFF",
                badge: "Limited Time"
            },
            {
                id: 2,
                type: "event",
                title: "Cultural Festival Performance",
                description: "Join us at the Kigali Cultural Festival where we'll be showcasing our latest choreography",
                date: "2024-04-15",
                location: "Kigali Convention Centre"
            },
            {
                id: 3,
                type: "new-service",
                title: "Interactive Dance Workshops",
                description: "New! We now offer pre-wedding dance workshops for couples who want to learn traditional moves",
                badge: "New Service"
            },
            {
                id: 4,
                type: "promotion",
                title: "Group Booking Discount",
                description: "Book multiple services together and save up to 20% on your total booking",
                discount: "Up to 20% OFF"
            }
        ],
        contact: {
            phone: "+250 788 123 456",
            email: "info@amahorodance.rw",
            website: "www.amahorodance.rw"
        },
        stats: {
            eventsCompleted: 250,
            yearsExperience: 8,
            teamSize: 15,
            satisfactionRate: 98
        }
    }

    return (
        <div className="min-h-screen bg-[#eff4fa]">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[400px] bg-gradient-to-r from-primary/20 to-primary/5">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${service.coverImage})` }}
                />
                <div className="relative container mx-auto px-4 h-full flex items-end pb-8">
                    <div className="flex items-end justify-between w-full max-w-7xl mx-auto">
                        <div className="flex items-end gap-6">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                <AvatarImage src={service.image} />
                                <AvatarFallback>{service.provider[0]}</AvatarFallback>
                            </Avatar>
                            <div className="mb-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <h1 className="text-4xl font-bold text-gray-900">{service.title}</h1>
                                    {service.verified && (
                                        <Badge variant="default" className="bg-blue-600">
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xl text-gray-700 mb-2">{service.provider}</p>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{service.rating}</span>
                                        <span className="text-gray-600">({service.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        {service.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Award className="h-4 w-4" />
                                        {service.experience}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white"
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button variant="outline" size="icon" className="bg-white">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Tabs Content */}
                    <div className="lg:col-span-2">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="w-full justify-start mb-6 bg-white">
                                <TabsTrigger value="home" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Home
                                </TabsTrigger>
                                <TabsTrigger value="gallery" className="flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4" />
                                    Gallery
                                </TabsTrigger>
                                <TabsTrigger value="events" className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    Events & Offers
                                </TabsTrigger>
                            </TabsList>

                            {/* Home Tab */}
                            <TabsContent value="home" className="space-y-6">
                                {/* About */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About This Service</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-gray-700 leading-relaxed">{service.description}</p>
                                        <p className="text-gray-600 leading-relaxed">{service.longDescription}</p>

                                        <div>
                                            <h4 className="font-semibold mb-3">Our Specialties</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.specialties.map((specialty, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {specialty}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-3">What's Included</h4>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Packages */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Available Packages</CardTitle>
                                        <CardDescription>Choose the perfect package for your event</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {service.packages.map((pkg) => (
                                                <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-primary border-2' : ''}`}>
                                                    {pkg.popular && (
                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                            <Badge className="bg-primary">Most Popular</Badge>
                                                        </div>
                                                    )}
                                                    <CardHeader>
                                                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                                                        <CardDescription>{pkg.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <div>
                                                            <div className="text-3xl font-bold text-primary">
                                                                {pkg.price.toLocaleString()} RWF
                                                            </div>
                                                            <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                                                <Clock className="h-3 w-3" />
                                                                {pkg.duration}
                                                            </div>
                                                        </div>
                                                        <Separator />
                                                        <ul className="space-y-2">
                                                            {pkg.features.map((feature, index) => (
                                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                                    <span>{feature}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <Link href={`/booking/${service.id}`}>
                                                            <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                                                                Select Package
                                                            </Button>
                                                        </Link>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Stats */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Our Track Record</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-primary">{service.stats.eventsCompleted}+</div>
                                                <div className="text-sm text-gray-600 mt-1">Events Completed</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-primary">{service.stats.yearsExperience}+</div>
                                                <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-primary">{service.stats.teamSize}</div>
                                                <div className="text-sm text-gray-600 mt-1">Team Members</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-primary">{service.stats.satisfactionRate}%</div>
                                                <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Gallery Tab */}
                            <TabsContent value="gallery" className="space-y-6">
                                {/* Photos */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ImageIcon className="h-5 w-5" />
                                            Photos
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {service.gallery.photos.map((photo) => (
                                                <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                                                    <img
                                                        src={photo.url}
                                                        alt={photo.caption}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                                        <p className="text-white text-sm">{photo.caption}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Videos */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Video className="h-5 w-5" />
                                            Videos
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {service.gallery.videos.map((video) => (
                                                <div key={video.id} className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer bg-black">
                                                    <img
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover opacity-70"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Play className="h-8 w-8 text-primary ml-1" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                        <p className="text-white font-medium">{video.title}</p>
                                                        <p className="text-white/80 text-sm">{video.duration}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Reels */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            Reels & Highlights
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {service.gallery.reels.map((reel) => (
                                                <div key={reel.id} className="relative aspect-[9/16] rounded-lg overflow-hidden group cursor-pointer bg-black">
                                                    <img
                                                        src={reel.thumbnail}
                                                        alt={reel.title}
                                                        className="w-full h-full object-cover opacity-70"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <Play className="h-6 w-6 text-primary ml-0.5" />
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                                        <p className="text-white text-sm font-medium">{reel.title}</p>
                                                        <p className="text-white/80 text-xs">{reel.views} views</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Events & Promotions Tab */}
                            <TabsContent value="events" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Current Promotions & Events</CardTitle>
                                        <CardDescription>Don't miss out on our special offers and upcoming events</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {service.events.map((event) => (
                                                <Card key={event.id} className="border-l-4 border-l-primary">
                                                    <CardContent className="pt-6">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-semibold text-lg">{event.title}</h4>
                                                                    {event.badge && (
                                                                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                                                                            {event.badge}
                                                                        </Badge>
                                                                    )}
                                                                    {event.discount && (
                                                                        <Badge variant="default" className="bg-green-600">
                                                                            {event.discount}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-600 mb-3">{event.description}</p>
                                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                    {event.validUntil && (
                                                                        <div className="flex items-center gap-1">
                                                                            <Calendar className="h-4 w-4" />
                                                                            Valid until {new Date(event.validUntil).toLocaleDateString()}
                                                                        </div>
                                                                    )}
                                                                    {event.date && (
                                                                        <div className="flex items-center gap-1">
                                                                            <Calendar className="h-4 w-4" />
                                                                            {new Date(event.date).toLocaleDateString()}
                                                                        </div>
                                                                    )}
                                                                    {event.location && (
                                                                        <div className="flex items-center gap-1">
                                                                            <MapPin className="h-4 w-4" />
                                                                            {event.location}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {event.type === "promotion" && (
                                                                <Link href={`/booking/${service.id}`}>
                                                                    <Button>
                                                                        <Tag className="h-4 w-4 mr-2" />
                                                                        Claim Offer
                                                                    </Button>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 space-y-6">
                            {/* Quick Booking */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ready to Book?</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-center py-4">
                                        <div className="text-sm text-gray-600 mb-1">Starting from</div>
                                        <div className="text-3xl font-bold text-primary">
                                            {service.packages[0].price.toLocaleString()} RWF
                                        </div>
                                    </div>
                                    <Link href={`/booking/${service.id}`}>
                                        <Button className="w-full" size="lg">
                                            Book Now
                                        </Button>
                                    </Link>
                                    <Button variant="outline" className="w-full">
                                        Request Quote
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Contact */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Provider</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span>{service.contact.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="truncate">{service.contact.email}</span>
                                    </div>
                                    <Separator />
                                    <Button variant="outline" className="w-full">
                                        Send Message
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Category */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Service Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge variant="secondary" className="text-sm">
                                        {service.category}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
