"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Plus,
    Trash2,
    Edit2,
    CheckCircle,
    Circle,
    Loader2,
    AlertCircle,
    MoreVertical,
    X,
    Check
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS, WeddingTask } from "@/lib/api";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function WeddingTasks() {
    const queryClient = useQueryClient();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<WeddingTask | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");

    const { data: tasks, isLoading, error } = useQuery({
        queryKey: ["wedding-tasks"],
        queryFn: async () => {
            const response = await apiClient.get<WeddingTask[]>(API_ENDPOINTS.WEDDING.TASKS);
            return response.data;
        }
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => apiClient.post(API_ENDPOINTS.WEDDING.TASKS, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wedding-tasks"] });
            toast.success("Task added successfully");
            setIsAddDialogOpen(false);
            setTitle("");
            setCategory("");
        },
        onError: (err: any) => toast.error(err.message || "Failed to add task")
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) =>
            apiClient.put(`${API_ENDPOINTS.WEDDING.TASKS}/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wedding-tasks"] });
            setEditingTask(null);
        },
        onError: (err: any) => toast.error(err.message || "Failed to update task")
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => apiClient.delete(`${API_ENDPOINTS.WEDDING.TASKS}/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wedding-tasks"] });
            toast.success("Task removed");
        },
        onError: (err: any) => toast.error(err.message || "Failed to delete task")
    });

    const handleCreate = () => {
        if (!title.trim()) return;
        createMutation.mutate({ title, category });
    };

    const handleToggle = (task: WeddingTask) => {
        updateMutation.mutate({
            id: task.id,
            data: { is_completed: !task.is_completed }
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading your checklist...</span>
            </div>
        );
    }

    if (error) {
        return (
            <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="flex items-center justify-center p-6 text-destructive">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>Error loading tasks. Please make sure wedding details are set.</span>
                </CardContent>
            </Card>
        );
    }

    const completedCount = tasks?.filter(t => t.is_completed).length || 0;
    const totalCount = tasks?.length || 0;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Wedding Checklist</h2>
                    <p className="text-muted-foreground">Manage your path to the big day</p>
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">Planning Progress</CardTitle>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mt-2">
                        <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        {tasks && tasks.length > 0 ? (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group border-b last:border-0"
                                >
                                    <div className="flex items-center space-x-3 flex-1">
                                        <Checkbox
                                            checked={task.is_completed}
                                            onCheckedChange={() => handleToggle(task)}
                                        />
                                        <div className="flex flex-col min-w-0">
                                            <span className={`text-sm font-medium ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                                                {task.title}
                                            </span>
                                            {task.category && (
                                                <span className="text-xs text-muted-foreground">{task.category}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => deleteMutation.mutate(task.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                <p>No tasks yet. Start by adding your first task!</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Add Task Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Task Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Book the venue"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category (Optional)</Label>
                            <Input
                                id="category"
                                placeholder="e.g., Venue, Catering"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreate} disabled={createMutation.isPending}>
                            {createMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                            Create Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
