"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Plus, 
  Edit, 
  Trash2,
  Filter,
  Search,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Star,
  MapPin,
  Camera,
  Music,
  Heart,
  Gift,
  Car
} from "lucide-react";
import { useState } from "react";

interface PlanningTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  completedDate?: string;
  estimatedDuration: string;
  assignedTo?: string;
  notes?: string;
}

interface PlanningStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  completionRate: number;
  daysUntilWedding: number;
}

export function ComprehensivePlanning() {
  const [activeView, setActiveView] = useState("timeline");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Partial<PlanningTask>>({
    title: "",
    description: "",
    category: "Venue",
    priority: "medium",
    dueDate: "",
    estimatedDuration: "",
    assignedTo: "Both",
    notes: ""
  });

  const [weddingDate, setWeddingDate] = useState("2024-06-15");
  const [coupleName, setCoupleName] = useState("Jean & Marie");
  const [timelineSettings, setTimelineSettings] = useState({
    weddingDate: "2024-06-15",
    coupleName: "Jean & Marie",
    planningStartDate: "2024-01-01",
    reminderDays: 30
  });

  const [tasks, setTasks] = useState<PlanningTask[]>([
    {
      id: "1",
      title: "Book Wedding Venue",
      description: "Secure your wedding venue early to ensure availability",
      category: "Venue",
      priority: "high",
      dueDate: "2024-01-15",
      completed: true,
      completedDate: "2024-01-10",
      estimatedDuration: "2 weeks",
      assignedTo: "Both",
      notes: "Booked Kigali Serena Hotel"
    },
    {
      id: "2",
      title: "Hire Traditional Dancers",
      description: "Book Intore cultural dancers for ceremony",
      category: "Entertainment",
      priority: "high",
      dueDate: "2024-02-01",
      completed: true,
      completedDate: "2024-01-25",
      estimatedDuration: "1 week",
      assignedTo: "Groom",
      notes: "Intore Cultural Group - 150,000 RWF"
    },
    {
      id: "3",
      title: "Select Wedding MC",
      description: "Choose bilingual MC for ceremony",
      category: "Entertainment",
      priority: "medium",
      dueDate: "2024-02-15",
      completed: true,
      completedDate: "2024-02-10",
      estimatedDuration: "3 days",
      assignedTo: "Both",
      notes: "Emmanuel MC Services"
    },
    {
      id: "4",
      title: "Finalize Guest List",
      description: "Confirm final guest count and send invitations",
      category: "Guests",
      priority: "high",
      dueDate: "2024-03-01",
      completed: false,
      estimatedDuration: "1 week",
      assignedTo: "Both"
    },
    {
      id: "5",
      title: "Order Wedding Cake",
      description: "Design and order traditional wedding cake",
      category: "Food",
      priority: "medium",
      dueDate: "2024-03-15",
      completed: false,
      estimatedDuration: "2 weeks",
      assignedTo: "Bride"
    },
    {
      id: "6",
      title: "Send Invitations",
      description: "Send out wedding invitations to all guests",
      category: "Guests",
      priority: "high",
      dueDate: "2024-04-01",
      completed: false,
      estimatedDuration: "1 week",
      assignedTo: "Both"
    },
    {
      id: "7",
      title: "Final Dress Fitting",
      description: "Final fitting for wedding attire",
      category: "Attire",
      priority: "medium",
      dueDate: "2024-05-15",
      completed: false,
      estimatedDuration: "2 hours",
      assignedTo: "Bride"
    },
    {
      id: "8",
      title: "Book Photographer",
      description: "Hire professional wedding photographer",
      category: "Photography",
      priority: "high",
      dueDate: "2024-02-28",
      completed: false,
      estimatedDuration: "1 week",
      assignedTo: "Both"
    },
    {
      id: "9",
      title: "Arrange Transportation",
      description: "Book transportation for wedding day",
      category: "Transportation",
      priority: "medium",
      dueDate: "2024-05-01",
      completed: false,
      estimatedDuration: "3 days",
      assignedTo: "Groom"
    },
    {
      id: "10",
      title: "Wedding Day",
      description: "Your special day!",
      category: "Wedding",
      priority: "high",
      dueDate: weddingDate,
      completed: false,
      estimatedDuration: "All day",
      assignedTo: "Both"
    }
  ]);

  // Calculate days until wedding
  const weddingDateObj = new Date(weddingDate);
  const today = new Date();
  const timeDiff = weddingDateObj.getTime() - today.getTime();
  const daysUntilWedding = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const categories = [
    { id: "Venue", icon: <MapPin className="w-4 h-4" />, color: "bg-blue-500" },
    { id: "Entertainment", icon: <Music className="w-4 h-4" />, color: "bg-purple-500" },
    { id: "Guests", icon: <Users className="w-4 h-4" />, color: "bg-green-500" },
    { id: "Food", icon: <Gift className="w-4 h-4" />, color: "bg-orange-500" },
    { id: "Attire", icon: <Heart className="w-4 h-4" />, color: "bg-pink-500" },
    { id: "Photography", icon: <Camera className="w-4 h-4" />, color: "bg-indigo-500" },
    { id: "Transportation", icon: <Car className="w-4 h-4" />, color: "bg-gray-500" },
    { id: "Wedding", icon: <Star className="w-4 h-4" />, color: "bg-yellow-500" }
  ];

  const stats: PlanningStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    pendingTasks: tasks.filter(t => !t.completed).length,
    overdueTasks: tasks.filter(t => !t.completed && new Date(t.dueDate) < today).length,
    completionRate: Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100),
    daysUntilWedding: daysUntilWedding
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || task.category === filterCategory;
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed) ||
      (filterStatus === "overdue" && !task.completed && new Date(task.dueDate) < today);
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : <Target className="w-4 h-4" />;
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : "bg-gray-500";
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < today;
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const diff = due.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            completedDate: !task.completed ? new Date().toISOString().split('T')[0] : undefined
          }
        : task
    ));
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.dueDate) {
      if (editingTask) {
        // Update existing task
        setTasks(tasks.map(task => 
          task.id === editingTask
            ? {
                ...task,
                title: newTask.title!,
                description: newTask.description || "",
                category: newTask.category || "Venue",
                priority: newTask.priority as any || "medium",
                dueDate: newTask.dueDate!,
                estimatedDuration: newTask.estimatedDuration || "",
                assignedTo: newTask.assignedTo,
                notes: newTask.notes
              }
            : task
        ));
      } else {
        // Add new task
        const task: PlanningTask = {
          id: Date.now().toString(),
          title: newTask.title!,
          description: newTask.description || "",
          category: newTask.category || "Venue",
          priority: newTask.priority as any || "medium",
          dueDate: newTask.dueDate!,
          completed: false,
          estimatedDuration: newTask.estimatedDuration || "",
          assignedTo: newTask.assignedTo,
          notes: newTask.notes
        };
        setTasks([...tasks, task]);
      }
      setNewTask({
        title: "",
        description: "",
        category: "Venue",
        priority: "medium",
        dueDate: "",
        estimatedDuration: "",
        assignedTo: "Both",
        notes: ""
      });
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setNewTask({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        dueDate: task.dueDate,
        estimatedDuration: task.estimatedDuration,
        assignedTo: task.assignedTo,
        notes: task.notes
      });
      setIsModalOpen(true);
    }
  };

  const handleUpdateTimeline = () => {
    setWeddingDate(timelineSettings.weddingDate);
    setCoupleName(timelineSettings.coupleName);
    
    // Update the wedding day task with new date
    setTasks(tasks.map(task => 
      task.category === "Wedding" && task.title === "Wedding Day"
        ? { ...task, dueDate: timelineSettings.weddingDate }
        : task
    ));
    
    setIsTimelineModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Wedding Planning</h2>
          <p className="text-muted-foreground">Comprehensive planning and timeline management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => {
            setEditingTask(null);
            setNewTask({
              title: "",
              description: "",
              category: "Venue",
              priority: "medium",
              dueDate: "",
              estimatedDuration: "",
              assignedTo: "Both",
              notes: ""
            });
            setIsModalOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button variant="outline" onClick={() => setIsTimelineModalOpen(true)}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Timeline
          </Button>
        </div>
      </div>

      {/* Wedding Countdown */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Wedding Countdown</h3>
              <div className="text-3xl font-bold text-primary mb-2">
                {daysUntilWedding > 0 ? `${daysUntilWedding} Days` : "Today!"}
              </div>
              <p className="text-muted-foreground">
                Until {coupleName}'s wedding on {weddingDateObj.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-1">{stats.completionRate}%</div>
              <p className="text-sm text-muted-foreground">Planning Complete</p>
              <Progress value={stats.completionRate} className="w-32 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{stats.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdueTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Task Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Task Title *</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Due Date *</label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.id}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estimated Duration</label>
                <Input
                  value={newTask.estimatedDuration}
                  onChange={(e) => setNewTask({...newTask, estimatedDuration: e.target.value})}
                  placeholder="e.g., 2 weeks, 3 days, 2 hours"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Assigned To</label>
                <select
                  value={newTask.assignedTo}
                  onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="Both">Both</option>
                  <option value="Bride">Bride</option>
                  <option value="Groom">Groom</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Enter task description"
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Notes</label>
              <textarea
                value={newTask.notes}
                onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                placeholder="Additional notes (optional)"
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm min-h-[60px]"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => {
                setIsModalOpen(false);
                setEditingTask(null);
                setNewTask({
                  title: "",
                  description: "",
                  category: "Venue",
                  priority: "medium",
                  dueDate: "",
                  estimatedDuration: "",
                  assignedTo: "Both",
                  notes: ""
                });
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>
                {editingTask ? "Update Task" : "Add Task"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Timeline Modal */}
      <Dialog open={isTimelineModalOpen} onOpenChange={setIsTimelineModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Wedding Timeline</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Couple Names *</label>
              <Input
                value={timelineSettings.coupleName}
                onChange={(e) => setTimelineSettings({...timelineSettings, coupleName: e.target.value})}
                placeholder="e.g., Jean & Marie"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Wedding Date *</label>
              <Input
                type="date"
                value={timelineSettings.weddingDate}
                onChange={(e) => setTimelineSettings({...timelineSettings, weddingDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Planning Start Date</label>
              <Input
                type="date"
                value={timelineSettings.planningStartDate}
                onChange={(e) => setTimelineSettings({...timelineSettings, planningStartDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Reminder Days Before Due</label>
              <Input
                type="number"
                value={timelineSettings.reminderDays}
                onChange={(e) => setTimelineSettings({...timelineSettings, reminderDays: parseInt(e.target.value) || 30})}
                placeholder="30"
                min="1"
                max="365"
              />
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Timeline Preview</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Couple:</strong> {timelineSettings.coupleName}</p>
                <p><strong>Wedding Date:</strong> {new Date(timelineSettings.weddingDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p><strong>Days Until Wedding:</strong> {Math.ceil((new Date(timelineSettings.weddingDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days</p>
                <p><strong>Planning Started:</strong> {new Date(timelineSettings.planningStartDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsTimelineModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTimeline}>
                Update Timeline
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content Tabs */}
      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="checklist">Checklist View</TabsTrigger>
          <TabsTrigger value="progress">Progress View</TabsTrigger>
        </TabsList>

        {/* Timeline View */}
        <TabsContent value="timeline" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.id}</option>
                  ))}
                </select>

                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterCategory !== "all" || filterPriority !== "all" || filterStatus !== "all"
                    ? "Try adjusting your filters"
                    : "Start by adding your first planning task"}
                </p>
                {!searchTerm && filterCategory === "all" && filterPriority === "all" && filterStatus === "all" && (
                  <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Task
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Timeline Tasks */}
          {filteredTasks.length > 0 && (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card key={task.id} className={`hover:shadow-md transition-shadow ${
                task.completed ? 'opacity-75' : ''
              } ${isOverdue(task.dueDate) && !task.completed ? 'border-red-200 bg-red-50/50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`w-8 h-8 rounded-full ${getCategoryColor(task.category)} flex items-center justify-center text-white`}>
                        {getCategoryIcon(task.category)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <Badge variant={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">{task.category}</Badge>
                          {isOverdue(task.dueDate) && !task.completed && (
                            <Badge variant="destructive">Overdue</Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{task.estimatedDuration}</span>
                          </div>
                          {task.assignedTo && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{task.assignedTo}</span>
                            </div>
                          )}
                          {!task.completed && (
                            <div className="flex items-center space-x-1">
                              <AlertCircle className="w-4 h-4" />
                              <span>{getDaysUntilDue(task.dueDate)} days left</span>
                            </div>
                          )}
                        </div>

                        {task.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Notes:</strong> {task.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant={task.completed ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </TabsContent>

        {/* Checklist View */}
        <TabsContent value="checklist" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => {
              const categoryTasks = filteredTasks.filter(task => task.category === category.id);
              const completedCount = categoryTasks.filter(task => task.completed).length;
              const totalCount = categoryTasks.length;
              const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

              return (
                <Card key={category.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full ${category.color} flex items-center justify-center text-white`}>
                        {category.icon}
                      </div>
                      <CardTitle className="text-lg">{category.id}</CardTitle>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{completedCount}/{totalCount} completed</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categoryTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(task.id)}
                          className="rounded border-gray-300"
                        />
                        <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </span>
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Progress View */}
        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Category Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map((category) => {
                  const categoryTasks = tasks.filter(task => task.category === category.id);
                  const completedCount = categoryTasks.filter(task => task.completed).length;
                  const totalCount = categoryTasks.length;
                  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <span className="text-sm font-medium">{category.id}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{completedCount}/{totalCount}</span>
                      </div>
                      <Progress value={progress} className="w-full" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Planning Timeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stats.completionRate}%</div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <Progress value={stats.completionRate} className="w-full mt-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{stats.completedTasks}</div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</div>
                      <p className="text-sm text-muted-foreground">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
