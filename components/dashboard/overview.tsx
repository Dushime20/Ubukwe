"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle, Star, Edit2, Save, X, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface OverviewProps {
  weddingDetails: {
    coupleName: string;
    weddingDate: string;
    guestCount: number;
    budget: number;
    spent: number;
  };
  planningProgress: {
    completed: number;
    total: number;
    percentage: number;
  };
  checklist: Array<{
    id: number;
    task: string;
    category: string;
    completed: boolean;
  }>;
  recommendedServices: Array<{
    id: number;
    provider: string;
    service: string;
    price: string;
    rating: number;
    icon: React.ReactNode;
  }>;
}

export function Overview({ weddingDetails, planningProgress, checklist, recommendedServices }: OverviewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [weddingDate, setWeddingDate] = useState("");

  // Parse existing couple name if available
  const parseCoupleName = (coupleName: string) => {
    const parts = coupleName.split(" & ");
    return {
      bride: parts[0]?.trim() || "",
      groom: parts[1]?.trim() || ""
    };
  };

  const handleEditClick = () => {
    const { bride, groom } = parseCoupleName(weddingDetails.coupleName);
    setBrideName(bride);
    setGroomName(groom);
    setWeddingDate(weddingDetails.weddingDate);
    setIsEditDialogOpen(true);
  };

  const handleSave = () => {
    // Here you would typically save to backend/state management
    console.log("Saving wedding details:", {
      brideName,
      groomName,
      weddingDate
    });
    // TODO: Implement actual save logic
    setIsEditDialogOpen(false);
  };

  // Check if wedding details are set
  const hasWeddingDetails = () => {
    const { bride, groom } = parseCoupleName(weddingDetails.coupleName);
    return bride && groom && bride !== "Marie" && groom !== "Jean"; // Assuming "Marie & Jean" is default/placeholder
  };

  const isDetailsSet = hasWeddingDetails();

  return (
    <div className="space-y-6">
      {/* Wedding Details Card with Edit */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Wedding Details
            </CardTitle>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant={isDetailsSet ? "outline" : "default"}
                  size="sm"
                  onClick={handleEditClick}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {isDetailsSet ? "Edit Details" : "Add Details"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{isDetailsSet ? "Edit Wedding Details" : "Add Wedding Details"}</DialogTitle>
                  <DialogDescription>
                    {isDetailsSet
                      ? "Update your wedding information including bride and groom names and wedding date."
                      : "Add your wedding information including bride and groom names and wedding date."
                    }
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bride-name">Bride's Name</Label>
                    <Input
                      id="bride-name"
                      placeholder="Enter bride's name"
                      value={brideName}
                      onChange={(e) => setBrideName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="groom-name">Groom's Name</Label>
                    <Input
                      id="groom-name"
                      placeholder="Enter groom's name"
                      value={groomName}
                      onChange={(e) => setGroomName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="wedding-date">Wedding Date</Label>
                    <Input
                      id="wedding-date"
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Bride</div>
              <div className={`text-lg font-semibold ${isDetailsSet ? 'text-primary' : 'text-muted-foreground'}`}>
                {parseCoupleName(weddingDetails.coupleName).bride || "Not set"}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Groom</div>
              <div className={`text-lg font-semibold ${isDetailsSet ? 'text-primary' : 'text-muted-foreground'}`}>
                {parseCoupleName(weddingDetails.coupleName).groom || "Not set"}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Wedding Date</div>
              <div className="text-lg font-semibold">
                {new Date(weddingDetails.weddingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wedding Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Wedding Planning Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {planningProgress.completed} of {planningProgress.total} tasks completed
              </span>
              <span className="text-sm text-muted-foreground">{planningProgress.percentage}% complete</span>
            </div>
            <Progress value={planningProgress.percentage} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.ceil(
                    (new Date(weddingDetails.weddingDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Days to go</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{weddingDetails.guestCount}</div>
                <div className="text-xs text-muted-foreground">Guests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Services booked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {Math.round((weddingDetails.spent / weddingDetails.budget) * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">Budget used</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist
              .filter((item) => !item.completed)
              .slice(0, 4)
              .map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded"></div>
                    <span className="text-sm">{item.task}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Recommended for You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedServices.slice(0, 3).map((service) => (
              <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">{service.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{service.provider}</p>
                    <p className="text-xs text-muted-foreground">{service.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{service.price}</p>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>{service.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
