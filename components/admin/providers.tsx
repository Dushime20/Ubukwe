"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, XCircle, CheckCircle, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = pendingProviders.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Provider Approvals</h2>
          <p className="text-muted-foreground">Review and approve service provider applications</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[250px]"
          />
        </div>
      </div>

      {filteredProviders.length === 0 ? (
        <EmptyState
          title="No pending providers"
          description="All provider applications have been reviewed."
          icon={<FileText className="h-12 w-12 mx-auto text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-4">
          {filteredProviders.map((provider) => (
            <Card key={provider.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{provider.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Application ID: APP-{String(provider.id).padStart(3, "0")} • Applied: {provider.appliedDate}
                    </p>
                  </div>
                  <Badge variant={provider.documents === "Complete" ? "default" : "secondary"}>
                    {provider.documents}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <Badge variant="outline" className="mt-1">
                      {provider.service}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{provider.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">{provider.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Document Status</p>
                    <p
                      className={`font-medium ${
                        provider.documents === "Complete" ? "text-green-600" : "text-orange-600"
                      }`}
                    >
                      {provider.documents}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">Review required before approval</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/providers/approval/${provider.id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        Review Application
                      </Link>
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="w-4 h-4 mr-2" />
                      Quick Reject
                    </Button>
                    <Button size="sm" disabled={provider.documents !== "Complete"}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Quick Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
