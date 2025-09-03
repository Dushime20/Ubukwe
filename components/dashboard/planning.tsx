"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus } from "lucide-react";

interface PlanningProps {
  checklist: Array<{
    id: number;
    task: string;
    category: string;
    completed: boolean;
  }>;
}

export function Planning({ checklist }: PlanningProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Wedding Planning Checklist</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-4">
        {checklist.map((item) => (
          <Card key={item.id} className={item.completed ? "bg-muted/30" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      item.completed
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {item.completed && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span className={`${item.completed ? "line-through text-muted-foreground" : ""}`}>
                    {item.task}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={item.completed ? "default" : "outline"}>{item.category}</Badge>
                  {item.completed && (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
