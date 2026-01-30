"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Plus,
    Trash2,
    CheckCircle,
    Loader2,
    AlertCircle,
    User,
    Users
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
import { Textarea } from "@/components/ui/textarea";

const TASK_CATEGORIES = [
    "Venue", "Catering", "Photography", "Entertainment", "Decorations", 
    "Flowers", "Music", "Transportation", "Invitations", "Attire", "Other"
];

const ASSIGNMENT_OPTIONS = [
    { value: "groom", label: "Groom", icon: User },
    { value: "bride", label: "Bride", icon: User },
    { value: "other", label: "Both/Other", icon: Users }
];

const STATUS_OPTIONS = [
    { value: "pending", label: "Pending", color: "bg-gray-100 text-gray-800" },
    { value: "in_progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" }
];

export function WeddingTasks() {
    const queryClient = useQueryClient();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [assignedTo, setAssignedTo] = useState<string>("");
    const [activeTab, setActiveTab] = useState("all");

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
            resetForm();
        },
        onError: (err: any) => toast.error(err.message || "Failed to add task")
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) =>
            apiClient.put(`${API_ENDPOINTS.WEDDING.TASKS}/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wedding-tasks"] });
            toast.success("Task updated successfully");
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

    const resetForm = () => {
        setIsAddDialogOpen(false);
        setTitle("");
        setDescription("");
        setCategory("");
        setAssignedTo("");
    };

    const handleCreate = () => {
        if (!title.trim()) return;
        createMutation.mutate({ 
            title, 
            description: description || null,
            category: category || null,
            assigned_to: assignedTo || null
        });
    };

    const handleToggle = (task: WeddingTask) => {
        const newStatus = task.is_completed ? "pending" : "completed";
        updateMutation.mutate({
            id: task.id,
            data: { 
                is_completed: !task.is_completed,
                status: newStatus
            }
        });
    };

    const handleStatusChange = (task: WeddingTask, newStatus: string) => {
        updateMutation.mutate({
            id: task.id,
            data: { 
                status: newStatus,
                is_completed: newStatus === "completed"
            }
        });
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];
        return (
            <Badge className={`${statusConfig.color} border-0`}>
                {statusConfig.label}
            </Badge>
        );
    };

    const getAssignmentIcon = (assignedTo?: string) => {
        const assignment = ASSIGNMENT_OPTIONS.find(a => a.value === assignedTo);
        if (!assignment) return null;
        const Icon = assignment.icon;
        return (
            <div className="flex items-center text-xs text-muted-foreground">
                <Icon className="h-3 w-3 mr-1" />
                {assignment.label}
            </div>
        );
    };

    const filterTasks = (tasks: WeddingTask[]) => {
        if (activeTab === "all") return tasks;
        if (activeTab === "completed") return tasks.filter(t => t.is_completed);
        if (activeTab === "pending") return tasks.filter(t => !t.is_completed);
        return tasks.filter(t => t.assigned_to === activeTab);
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
        const errorMessage = (error as any)?.message || "";
        const isWeddingNotFound = errorMessage.includes("Wedding details not found") || errorMessage.includes("404");
        
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    {isWeddingNotFound ? (
                        <>
                            <CheckCircle className="h-16 w-16 text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No Tasks Yet</h3>
                            <p className="text-muted-foreground mb-6">Start planning your wedding by adding your first task</p>
                            <Button onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Task
                            </Button>
                        </>
                    ) : (
                        <>
                            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                            <p className="text-destructive">Error loading tasks. Please try again.</p>
                        </>
                    )}
                </CardContent>
            </Card>
        );
    }

    const completedCount = tasks?.filter(t => t.is_completed).length || 0;
    const totalCount = tasks?.length || 0;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const filteredTasks = tasks ? filterTasks(tasks) : [];

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
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">All ({totalCount})</TabsTrigger>
                    <TabsTrigger value="pending">Pending ({tasks?.filter(t => !t.is_completed).length || 0})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
                    <TabsTrigger value="groom">Groom ({tasks?.filter(t => t.assigned_to === 'groom').length || 0})</TabsTrigger>
                    <TabsTrigger value="bride">Bride ({tasks?.filter(t => t.assigned_to === 'bride').length || 0})</TabsTrigger>
                    <TabsTrigger value="other">Both/Other ({tasks?.filter(t => t.assigned_to === 'other').length || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="mt-6">
                    <Card>
                        <CardContent className="p-0">
                            <div className="space-y-1">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group border-b last:border-0"
                                        >
                                            <div className="flex items-center space-x-3 flex-1">
                                                <Checkbox
                                                className="border-2 border-gray-950"
                                                    checked={task.is_completed}
                                                    onCheckedChange={() => handleToggle(task)}
                                                />
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-sm font-medium ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>
                                                            {task.title}
                                                        </span>
                                                        {getStatusBadge(task.status)}
                                                    </div>
                                                    {task.description && (
                                                        <p className="text-xs text-muted-foreground mb-1">{task.description}</p>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                        {task.category && (
                                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                                {task.category}
                                                            </span>
                                                        )}
                                                        {getAssignmentIcon(task.assigned_to)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Select
                                                    value={task.status}
                                                    onValueChange={(value) => handleStatusChange(task, value)}
                                                >
                                                    <SelectTrigger className="w-32 h-8 text-xs">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {STATUS_OPTIONS.map((status) => (
                                                            <SelectItem key={status.value} value={status.value}>
                                                                {status.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
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
                                        <p>No tasks in this category yet.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Task Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Book the venue"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Additional details about this task..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TASK_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2 flex-1">
                                <Label htmlFor="assigned">Assign To</Label>
                                <Select value={assignedTo} onValueChange={setAssignedTo}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select assignment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ASSIGNMENT_OPTIONS.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <SelectItem key={option.value} value={option.value}>
                                                    <div className="flex items-center">
                                                        <Icon className="h-4 w-4 mr-2" />
                                                        {option.label}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={resetForm}>Cancel</Button>
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
