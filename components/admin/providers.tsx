"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, XCircle, CheckCircle } from "lucide-react";

interface PendingProvider {
  id: number;
  name: string;
  service: string;
  location: string;
  experience: string;
  documents: string;
  appliedDate: string;
}

export function AdminProviders({ pendingProviders }: { pendingProviders: PendingProvider[] }) {
  return (
    <div className="space-y-4">
      {pendingProviders.map((provider) => (
        <Card key={provider.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{provider.name}</h3>
                  <Badge variant="outline">{provider.service}</Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">{provider.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience:</span>
                    <p className="font-medium">{provider.experience}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Documents:</span>
                    <p className={`font-medium ${provider.documents === "Complete" ? "text-green-600" : "text-orange-600"}`}>
                      {provider.documents}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Applied:</span>
                    <p className="font-medium">{provider.appliedDate}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
                <Button variant="outline" size="sm">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
