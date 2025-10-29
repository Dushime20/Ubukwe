"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Eye, Edit, Plus, Search, Filter, Trash2 } from "lucide-react";
import { ServiceForm, ServiceFormData } from "./service-form";
import { useRouter } from "next/navigation";

interface Service {
  id: number;
  title: string;
  category: string;
  location: string;
  priceRange: string;
  bookings: number;
  rating: number;
  status: "draft" | "active";
  // Extended fields matching vendor detail view
  description?: string;
  specialties?: string[];
  image?: string;
  verified?: boolean;
  priceRangeMin?: number;
  priceRangeMax?: number;
  packages?: Array<{
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    features: string[];
    popular: boolean;
  }>;
  gallery?: Array<{
    id: string;
    type: "image" | "video";
    url: string;
  }>;
  phone?: string;
  email?: string;
}

interface ProviderServicesProps {
  services: Service[];
}

export function ProviderServices({ services: initialServices }: ProviderServicesProps) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateService = () => {
    setEditingService(null);
    setShowCreateForm(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowCreateForm(true);
  };

  const handleSaveService = (formData: ServiceFormData) => {
    const serviceData: Service = {
      id: editingService?.id || Date.now(),
      title: formData.name,
      category: formData.category,
      location: formData.location,
      priceRange: formData.priceRangeMin && formData.priceRangeMax
        ? `${Number(formData.priceRangeMin).toLocaleString()} - ${Number(formData.priceRangeMax).toLocaleString()} RWF`
        : "Price on request",
      priceRangeMin: Number(formData.priceRangeMin) || undefined,
      priceRangeMax: Number(formData.priceRangeMax) || undefined,
      bookings: editingService?.bookings || 0,
      rating: editingService?.rating || 0,
      status: formData.status,
      description: formData.description,
      specialties: formData.specialties,
      verified: formData.verified,
      packages: formData.packages,
      gallery: formData.gallery,
      phone: formData.phone,
      email: formData.email,
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? serviceData : s));
    } else {
      setServices([...services, serviceData]);
    }

    setShowCreateForm(false);
    setEditingService(null);
    alert(editingService ? "Service updated successfully!" : "Service created successfully!");
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== serviceId));
      alert("Service deleted successfully!");
    }
  };

  const handleViewService = (service: Service) => {
    // In real app, this could show a preview or navigate to customer view
    // For now, just show an alert with service details
    const preview = {
      name: service.title,
      category: service.category,
      location: service.location,
      priceRange: service.priceRange,
      status: service.status,
      packages: service.packages?.length || 0,
      galleryItems: service.gallery?.length || 0,
    };
    console.log("Service Preview:", preview);
    alert(`Service: ${service.title}\nCategory: ${service.category}\nLocation: ${service.location}\nStatus: ${service.status}\nPackages: ${service.packages?.length || 0}\nGallery Items: ${service.gallery?.length || 0}`);
  };

  const handleCancelForm = () => {
    setShowCreateForm(false);
    setEditingService(null);
  };

  const categories = Array.from(new Set(services.map(s => s.category)));

  if (showCreateForm) {
    return (
      <ServiceForm
        initialData={editingService ? {
          name: editingService.title,
          category: editingService.category,
          location: editingService.location,
          description: editingService.description,
          specialties: editingService.specialties,
          priceRangeMin: editingService.priceRangeMin?.toString(),
          priceRangeMax: editingService.priceRangeMax?.toString(),
          gallery: editingService.gallery,
          packages: editingService.packages,
          phone: editingService.phone,
          email: editingService.email,
          status: editingService.status,
          verified: editingService.verified,
        } : undefined}
        onSave={handleSaveService}
        onCancel={handleCancelForm}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Services</h2>
          <p className="text-muted-foreground">Manage your services that customers can browse and book</p>
        </div>
        <Button onClick={handleCreateService}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Service
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <div className="grid gap-4">
        {filteredServices.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "No services match your filters"
                  : "You haven't created any services yet"}
              </p>
              {!searchTerm && statusFilter === "all" && categoryFilter === "all" && (
                <Button onClick={handleCreateService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Service
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredServices.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{service.title}</h3>
                      <Badge variant={service.status === "active" ? "default" : "secondary"}>
                        {service.status}
                      </Badge>
                      {service.verified && (
                        <Badge variant="outline" className="text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">
                      {service.category} • {service.location}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="font-medium">{service.priceRange}</span>
                      <span className="text-muted-foreground">{service.bookings} bookings</span>
                      {service.rating > 0 && (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                          <span>{service.rating}</span>
                        </div>
                      )}
                      {service.packages && service.packages.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {service.packages.length} package{service.packages.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {service.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewService(service)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteService(service.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
