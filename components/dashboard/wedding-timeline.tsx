"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle, AlertCircle, Plus, Edit } from "lucide-react";

interface WeddingTimelineProps {
  weddingDate: string;
  coupleName: string;
}

export function WeddingTimeline({ weddingDate, coupleName }: WeddingTimelineProps) {
  // Calculate days until wedding
  const weddingDateObj = new Date(weddingDate);
  const today = new Date();
  const timeDiff = weddingDateObj.getTime() - today.getTime();
  const daysUntilWedding = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // Mock timeline data
  const timelineEvents = [
    {
      id: 1,
      title: "Book Venue",
      date: "2024-01-15",
      completed: true,
      category: "Venue",
      priority: "high",
      description: "Secure your wedding venue early",
    },
    {
      id: 2,
      title: "Hire Traditional Dancers",
      date: "2024-02-01",
      completed: true,
      category: "Entertainment",
      priority: "high",
      description: "Book Intore cultural dancers",
    },
    {
      id: 3,
      title: "Select Wedding MC",
      date: "2024-02-15",
      completed: true,
      category: "Entertainment",
      priority: "medium",
      description: "Choose bilingual MC for ceremony",
    },
    {
      id: 4,
      title: "Finalize Guest List",
      date: "2024-03-01",
      completed: false,
      category: "Planning",
      priority: "high",
      description: "Confirm final guest count",
    },
    {
      id: 5,
      title: "Order Wedding Cake",
      date: "2024-03-15",
      completed: false,
      category: "Food",
      priority: "medium",
      description: "Design and order traditional cake",
    },
    {
      id: 6,
      title: "Send Invitations",
      date: "2024-04-01",
      completed: false,
      category: "Planning",
      priority: "high",
      description: "Send out wedding invitations",
    },
    {
      id: 7,
      title: "Final Dress Fitting",
      date: "2024-05-15",
      completed: false,
      category: "Attire",
      priority: "medium",
      description: "Final fitting for wedding attire",
    },
    {
      id: 8,
      title: "Wedding Day",
      date: weddingDate,
      completed: false,
      category: "Wedding",
      priority: "high",
      description: "Your special day!",
    },
  ];

  const upcomingEvents = timelineEvents.filter(event => !event.completed);
  const completedEvents = timelineEvents.filter(event => event.completed);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Venue": return "🏛️";
      case "Entertainment": return "🎭";
      case "Planning": return "📋";
      case "Food": return "🍰";
      case "Attire": return "👗";
      case "Wedding": return "💒";
      default: return "📅";
    }
  };

  return (
    <div className="space-y-6">
      {/* Wedding Countdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Wedding Countdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {daysUntilWedding > 0 ? `${daysUntilWedding} Days` : "Today!"}
            </div>
            <p className="text-muted-foreground mb-4">
              Until {coupleName}'s wedding on {weddingDateObj.toLocaleDateString()}
            </p>
            <Progress 
              value={Math.max(0, Math.min(100, ((365 - daysUntilWedding) / 365) * 100))} 
              className="w-full"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Planning Progress: {Math.round(Math.max(0, Math.min(100, ((365 - daysUntilWedding) / 365) * 100)))}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Upcoming Tasks</h2>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getCategoryIcon(event.category)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant={getPriorityColor(event.priority)}>
                          {event.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{Math.ceil((new Date(event.date).getTime() - today.getTime()) / (1000 * 3600 * 24))} days left</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Completed Tasks</h2>
        <div className="space-y-2">
          {completedEvents.map((event) => (
            <Card key={event.id} className="opacity-75">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium line-through">{event.title}</span>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Completed on {new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Add Event</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Set Reminder</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Edit className="h-6 w-6" />
              <span className="text-sm">Edit Timeline</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span className="text-sm">Mark Complete</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
