"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Music, Utensils, MapPin, Palette, Mic } from "lucide-react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { Nav } from "react-day-picker";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroCarousel } from "@/components/ui/hero-carousel";

export default function HomePage() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Traditional Dancers",
      description: "Authentic Rwandan wedding dancers performing Intore and other cultural dances",
      features: ["Professional choreography", "Traditional costumes", "Cultural storytelling"],
    },
    {
      icon: <Mic className="h-8 w-8" />,
      title: "Master of Ceremonies",
      description: "Experienced MCs who understand Rwandan wedding traditions and customs",
      features: ["Bilingual hosting", "Cultural expertise", "Event coordination"],
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Decoration Services",
      description: "Beautiful traditional and modern decorations for your special day",
      features: ["Traditional patterns", "Floral arrangements", "Venue transformation"],
    },
    {
      icon: <Utensils className="h-8 w-8" />,
      title: "Catering & Food",
      description: "Authentic Rwandan cuisine and international dishes for your celebration",
      features: ["Traditional recipes", "Modern presentation", "Dietary accommodations"],
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Venue Booking",
      description: "Perfect venues for traditional and modern Rwandan wedding celebrations",
      features: ["Indoor & outdoor options", "Cultural significance", "Full amenities"],
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Cultural Music",
      description: "Traditional Rwandan musicians and modern entertainment options",
      features: ["Live performances", "Traditional instruments", "Modern sound systems"],
    },
  ]

  return (
    <div className="min-h-screen bg-[#eff4fa] ">
      {/* Header */}
  <Navbar/>
      {/* Hero Section */}
      <section className="py-20 px-4 flex items-center justify-between">
  <div className="text-content w-1/2">
    <div className="container mx-auto text-center max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
        Celebrate <span className="text-primary">Your  Wedding</span> with Authentic Cultural Services
      </h1>
      <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
        Connect with trusted service providers who understand and honor Rwandan wedding traditions. From traditional
        dancers to authentic cuisine, plan your perfect celebration.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/services">
          <Button size="lg" className="text-lg px-8 bg-[#111828]">
            Find Services
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
            Become a Provider
          </Button>
        </Link>
      </div>
    </div>
  </div>
  {/* image section */}
  <HeroCarousel />
</section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How Ubukwe Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Services</h3>
              <p className="text-muted-foreground">
                Explore our curated selection of authentic Rwandan wedding service providers, each verified for quality
                and cultural authenticity.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Plan</h3>
              <p className="text-muted-foreground">
                Contact providers directly, discuss your vision, and coordinate all aspects of your traditional wedding
                celebration.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Celebrate</h3>
              <p className="text-muted-foreground">
                Enjoy your perfect Rwandan wedding celebration with trusted providers who honor your cultural traditions
                and create lasting memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Traditional Wedding Services</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Discover authentic Rwandan wedding services that honor your cultural heritage and create unforgettable
            celebrations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/services">
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View Providers
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <Footer />
    </div>
  )
}
