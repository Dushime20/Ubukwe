"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, ArrowRight, Bell } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  features?: string[];
  estimatedLaunch?: string;
  notifyMe?: boolean;
}

export function ComingSoon({ 
  title, 
  description, 
  icon, 
  features = [], 
  estimatedLaunch,
  notifyMe = true 
}: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-6">
              {icon || <Sparkles className="w-10 h-10 text-primary" />}
            </div>
            
            {/* Badge */}
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              <Clock className="w-4 h-4 mr-2" />
              Coming Soon
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {/* Features Preview */}
          {features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                What to expect:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estimated Launch */}
          {estimatedLaunch && (
            <div className="mb-8 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Estimated Launch:</strong> {estimatedLaunch}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {notifyMe && (
              <Button className="px-8 py-3">
                <Bell className="w-4 h-4 mr-2" />
                Notify Me When Ready
              </Button>
            )}
            <Button variant="outline" className="px-8 py-3">
              <ArrowRight className="w-4 h-4 mr-2" />
              Explore Other Features
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="ml-2">In Development</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
