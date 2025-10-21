"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash2,
  Download,
  Upload
} from "lucide-react";
import { useState } from "react";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  dietaryRestrictions: string;
  plusOne: boolean;
  plusOneName?: string;
  tableNumber?: number;
  notes: string;
  invitationSent: boolean;
  lastContacted?: string;
}

export function GuestManagement() {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      name: "Jean Baptiste",
      email: "jean@example.com",
      phone: "+250 788 123 456",
      relationship: "Family",
      rsvpStatus: "confirmed",
      dietaryRestrictions: "Vegetarian",
      plusOne: true,
      plusOneName: "Marie Claire",
      tableNumber: 1,
      notes: "Prefers front table",
      invitationSent: true,
      lastContacted: "2024-01-15"
    },
    {
      id: "2",
      name: "Dr. Paul Nkurunziza",
      email: "paul.nkurunziza@example.com",
      phone: "+250 789 234 567",
      relationship: "Family",
      rsvpStatus: "pending",
      dietaryRestrictions: "None",
      plusOne: false,
      tableNumber: 2,
      notes: "Medical professional",
      invitationSent: true,
      lastContacted: "2024-01-10"
    },
    {
      id: "3",
      name: "Grace Uwimana",
      email: "grace.uwimana@example.com",
      phone: "+250 787 345 678",
      relationship: "Friend",
      rsvpStatus: "declined",
      dietaryRestrictions: "Halal",
      plusOne: false,
      notes: "Will attend reception only",
      invitationSent: true,
      lastContacted: "2024-01-12"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuest, setNewGuest] = useState<Partial<Guest>>({
    name: "",
    email: "",
    phone: "",
    relationship: "",
    rsvpStatus: "pending",
    dietaryRestrictions: "",
    plusOne: false,
    notes: ""
  });

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.relationship.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || guest.rsvpStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const rsvpStats = {
    total: guests.length,
    confirmed: guests.filter(g => g.rsvpStatus === "confirmed").length,
    pending: guests.filter(g => g.rsvpStatus === "pending").length,
    declined: guests.filter(g => g.rsvpStatus === "declined").length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "pending": return "secondary";
      case "declined": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "declined": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleAddGuest = () => {
    if (newGuest.name && newGuest.email) {
      const guest: Guest = {
        id: Date.now().toString(),
        name: newGuest.name!,
        email: newGuest.email!,
        phone: newGuest.phone || "",
        relationship: newGuest.relationship || "",
        rsvpStatus: newGuest.rsvpStatus as any || "pending",
        dietaryRestrictions: newGuest.dietaryRestrictions || "",
        plusOne: newGuest.plusOne || false,
        plusOneName: newGuest.plusOneName || "",
        tableNumber: newGuest.tableNumber,
        notes: newGuest.notes || "",
        invitationSent: false
      };
      setGuests([...guests, guest]);
      setNewGuest({
        name: "",
        email: "",
        phone: "",
        relationship: "",
        rsvpStatus: "pending",
        dietaryRestrictions: "",
        plusOne: false,
        notes: ""
      });
      setShowAddGuest(false);
    }
  };

  const handleUpdateRSVP = (guestId: string, status: string) => {
    setGuests(guests.map(guest => 
      guest.id === guestId 
        ? { ...guest, rsvpStatus: status as any, lastContacted: new Date().toISOString().split('T')[0] }
        : guest
    ));
  };

  const handleDeleteGuest = (guestId: string) => {
    setGuests(guests.filter(guest => guest.id !== guestId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Guest Management</h2>
          <p className="text-muted-foreground">Manage your wedding guest list and RSVPs</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowAddGuest(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* RSVP Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Guests</p>
                <p className="text-2xl font-bold">{rsvpStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{rsvpStats.confirmed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{rsvpStats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Declined</p>
                <p className="text-2xl font-bold text-red-600">{rsvpStats.declined}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guests by name, email, or relationship..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by RSVP" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All RSVPs</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add Guest Form */}
      {showAddGuest && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Guest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  placeholder="Enter guest name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={newGuest.relationship} onValueChange={(value) => setNewGuest({...newGuest, relationship: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Friend">Friend</SelectItem>
                    <SelectItem value="Colleague">Colleague</SelectItem>
                    <SelectItem value="Neighbor">Neighbor</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dietary">Dietary Restrictions</Label>
                <Input
                  id="dietary"
                  value={newGuest.dietaryRestrictions}
                  onChange={(e) => setNewGuest({...newGuest, dietaryRestrictions: e.target.value})}
                  placeholder="e.g., Vegetarian, Halal, Allergies"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="plusOne"
                  checked={newGuest.plusOne}
                  onChange={(e) => setNewGuest({...newGuest, plusOne: e.target.checked})}
                />
                <Label htmlFor="plusOne">Plus One</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newGuest.notes}
                onChange={(e) => setNewGuest({...newGuest, notes: e.target.value})}
                placeholder="Additional notes about this guest"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddGuest(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGuest}>
                Add Guest
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guest List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Guest List ({filteredGuests.length})</h3>
        <div className="grid gap-4">
          {filteredGuests.map((guest) => (
            <Card key={guest.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold">{guest.name}</h4>
                      <Badge variant={getStatusColor(guest.rsvpStatus)}>
                        {getStatusIcon(guest.rsvpStatus)}
                        <span className="ml-1 capitalize">{guest.rsvpStatus}</span>
                      </Badge>
                      {guest.plusOne && (
                        <Badge variant="outline">+1</Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{guest.email}</span>
                      </div>
                      {guest.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{guest.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{guest.relationship}</span>
                      </div>
                      {guest.tableNumber && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>Table {guest.tableNumber}</span>
                        </div>
                      )}
                    </div>

                    {guest.dietaryRestrictions && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Dietary:</strong> {guest.dietaryRestrictions}
                      </p>
                    )}
                    
                    {guest.plusOneName && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Plus One:</strong> {guest.plusOneName}
                      </p>
                    )}

                    {guest.notes && (
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Notes:</strong> {guest.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant={guest.rsvpStatus === "confirmed" ? "default" : "outline"}
                        onClick={() => handleUpdateRSVP(guest.id, "confirmed")}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={guest.rsvpStatus === "pending" ? "default" : "outline"}
                        onClick={() => handleUpdateRSVP(guest.id, "pending")}
                      >
                        <Clock className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={guest.rsvpStatus === "declined" ? "destructive" : "outline"}
                        onClick={() => handleUpdateRSVP(guest.id, "declined")}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteGuest(guest.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
