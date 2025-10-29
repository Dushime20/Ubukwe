"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Plus, Trash2, Edit, Calendar, DollarSign, CreditCard, Receipt } from "lucide-react";

type Currency = "RWF" | "USD";

interface BudgetCategory {
  id: string;
  name: string;
  allocation: number; // planned amount
}

interface ExpenseItem {
  id: string;
  categoryId: string;
  description: string;
  amount: number;
  date: string; // ISO date
  notes?: string;
}

interface PaymentMilestone {
  id: string;
  title: string;
  dueDate: string; // ISO date
  amount: number;
  status: "unpaid" | "paid";
  notes?: string;
}

export function BudgetAnlyo() {
  const [currency, setCurrency] = useState<Currency>("RWF");
  const [totalBudget, setTotalBudget] = useState<number>(5_000_000);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: "venue", name: "Venue", allocation: 1_600_000 },
    { id: "catering", name: "Catering", allocation: 1_000_000 },
    { id: "photo", name: "Photography", allocation: 600_000 },
    { id: "decor", name: "Decor", allocation: 1_000_000 },
    { id: "transport", name: "Transport", allocation: 300_000 },
  ]);

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "e1", categoryId: "venue", description: "Deposit - Venue", amount: 600_000, date: "2024-01-10" },
    { id: "e2", categoryId: "photo", description: "Photographer deposit", amount: 200_000, date: "2024-01-12" },
    { id: "e3", categoryId: "catering", description: "Menu tasting", amount: 150_000, date: "2024-01-20" },
  ]);

  const [milestones, setMilestones] = useState<PaymentMilestone[]>([
    { id: "m1", title: "Venue final payment", dueDate: "2024-05-20", amount: 1_000_000, status: "unpaid" },
    { id: "m2", title: "Photographer final", dueDate: "2024-06-10", amount: 400_000, status: "unpaid" },
    { id: "m3", title: "Catering 50%", dueDate: "2024-05-25", amount: 500_000, status: "paid" },
  ]);

  // Add/Edit dialogs state
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<{ name: string; allocation: string }>({ name: "", allocation: "" });
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<{ categoryId: string; description: string; amount: string; date: string; notes?: string }>({ categoryId: "venue", description: "", amount: "", date: new Date().toISOString().slice(0,10) });
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState<{ title: string; dueDate: string; amount: string; notes?: string }>({ title: "", dueDate: new Date().toISOString().slice(0,10), amount: "" });

  const totalAllocated = useMemo(() => categories.reduce((sum, c) => sum + c.allocation, 0), [categories]);
  const totalSpent = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const remaining = Math.max(totalBudget - totalSpent, 0);

  const perCategorySpent = useMemo(() => {
    const map: Record<string, number> = {};
    for (const c of categories) map[c.id] = 0;
    for (const e of expenses) map[e.categoryId] = (map[e.categoryId] || 0) + e.amount;
    return map;
  }, [categories, expenses]);

  const handleAddCategory = () => {
    const allocation = Number(newCategory.allocation || 0);
    if (!newCategory.name || allocation < 0) return;
    setCategories([...categories, { id: `${Date.now()}`, name: newCategory.name, allocation }]);
    setNewCategory({ name: "", allocation: "" });
    setIsCatOpen(false);
  };

  const handleAddExpense = () => {
    const amount = Number(newExpense.amount || 0);
    if (!newExpense.description || amount <= 0) return;
    setExpenses([
      ...expenses,
      {
        id: `${Date.now()}`,
        categoryId: newExpense.categoryId,
        description: newExpense.description,
        amount,
        date: newExpense.date,
        notes: newExpense.notes,
      },
    ]);
    setIsExpenseOpen(false);
    setNewExpense({ categoryId: "venue", description: "", amount: "", date: new Date().toISOString().slice(0,10) });
  };

  const handleAddMilestone = () => {
    const amount = Number(newMilestone.amount || 0);
    if (!newMilestone.title || amount <= 0) return;
    setMilestones([...milestones, { id: `${Date.now()}`, title: newMilestone.title, dueDate: newMilestone.dueDate, amount, status: "unpaid", notes: newMilestone.notes }]);
    setIsMilestoneOpen(false);
    setNewMilestone({ title: "", dueDate: new Date().toISOString().slice(0,10), amount: "" });
  };

  const toggleMilestonePaid = (id: string) => {
    setMilestones(milestones.map(m => m.id === id ? { ...m, status: m.status === "paid" ? "unpaid" : "paid" } : m));
  };

  const deleteExpense = (id: string) => setExpenses(expenses.filter(e => e.id !== id));
  const deleteCategory = (id: string) => setCategories(categories.filter(c => c.id !== id));
  const deleteMilestone = (id: string) => setMilestones(milestones.filter(m => m.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budget Anlyo</h2>
          <p className="text-muted-foreground">Create your budget, track expenses, and manage payment milestones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
            <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="RWF">RWF</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            className="w-[180px]"
            value={totalBudget}
            onChange={(e) => setTotalBudget(Number(e.target.value || 0))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Budget</div>
            <div className="text-2xl font-bold">{totalBudget.toLocaleString()} {currency}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Allocated</div>
            <div className="text-2xl font-bold">{totalAllocated.toLocaleString()} {currency}</div>
            <div className="text-xs text-muted-foreground">{Math.round((totalAllocated/Math.max(totalBudget,1))*100)}% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Spent</div>
            <div className="text-2xl font-bold text-primary">{totalSpent.toLocaleString()} {currency}</div>
            <Progress className="mt-2" value={Math.min(100, (totalSpent/Math.max(totalBudget,1))*100)} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Remaining</div>
            <div className="text-2xl font-bold text-green-600">{remaining.toLocaleString()} {currency}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="milestones">Payment Milestones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Budget Categories</h3>
            <Button onClick={() => setIsCatOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Category</Button>
          </div>
          <div className="grid gap-3">
            {categories.map(cat => {
              const spent = perCategorySpent[cat.id] || 0;
              const percent = cat.allocation > 0 ? Math.min(100, (spent / cat.allocation) * 100) : 0;
              const overBudget = spent > cat.allocation;
              return (
                <Card key={cat.id} className={overBudget ? "border-red-200 bg-red-50/50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{cat.name}</h4>
                          {overBudget && <Badge variant="destructive">Over</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">Allocation: {cat.allocation.toLocaleString()} {currency} · Spent: {spent.toLocaleString()} {currency}</div>
                        <Progress className="mt-2" value={percent} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setCategories(categories.map(c => c.id===cat.id?{...c, allocation: Math.max(0, c.allocation - 50_000)}:c))}>-50k</Button>
                        <Button size="sm" variant="outline" onClick={() => setCategories(categories.map(c => c.id===cat.id?{...c, allocation: c.allocation + 50_000}:c))}>+50k</Button>
                        <Button size="sm" variant="outline" onClick={() => deleteCategory(cat.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Expenses</h3>
            <Button onClick={() => setIsExpenseOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Expense</Button>
          </div>
          <div className="grid gap-3">
            {expenses.map(ex => (
              <Card key={ex.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{ex.description}</h4>
                        <Badge variant="outline">{categories.find(c => c.id === ex.categoryId)?.name || "Other"}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-4">
                        <span className="text-primary font-medium">{ex.amount.toLocaleString()} {currency}</span>
                        <span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{new Date(ex.date).toLocaleDateString()}</span></span>
                      </div>
                      {ex.notes && <div className="text-sm text-muted-foreground mt-1">{ex.notes}</div>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => deleteExpense(ex.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Payment Milestones</h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline"><Download className="w-4 h-4 mr-2" />Export</Button>
              <Button onClick={() => setIsMilestoneOpen(true)}><Plus className="w-4 h-4 mr-2" />Add Milestone</Button>
            </div>
          </div>
          <div className="grid gap-3">
            {milestones.map(m => (
              <Card key={m.id} className={m.status === "unpaid" ? "" : "bg-emerald-50/50 border-emerald-200"}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{m.title}</h4>
                        <Badge variant={m.status === "paid" ? "default" : "secondary"}>
                          {m.status === "paid" ? "Paid" : "Unpaid"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-4">
                        <span className="text-primary font-medium">{m.amount.toLocaleString()} {currency}</span>
                        <span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>Due {new Date(m.dueDate).toLocaleDateString()}</span></span>
                      </div>
                      {m.notes && <div className="text-sm text-muted-foreground mt-1">{m.notes}</div>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant={m.status === "paid" ? "outline" : "default"} onClick={() => toggleMilestonePaid(m.id)}>
                        {m.status === "paid" ? <Receipt className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteMilestone(m.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Budget used</div>
                  <div className="text-2xl font-bold">{Math.round((totalSpent/Math.max(totalBudget,1))*100)}%</div>
                  <Progress className="mt-2" value={Math.min(100, (totalSpent/Math.max(totalBudget,1))*100)} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Unpaid milestones</div>
                  <div className="text-2xl font-bold">{milestones.filter(m => m.status === "unpaid").length}</div>
                  <div className="text-sm text-muted-foreground">Total due: {milestones.filter(m=>m.status==="unpaid").reduce((s,m)=>s+m.amount,0).toLocaleString()} {currency}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Category Modal */}
      <Dialog open={isCatOpen} onOpenChange={setIsCatOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add Category</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input value={newCategory.name} onChange={(e)=>setNewCategory({...newCategory, name: e.target.value})} placeholder="e.g., Venue" />
            </div>
            <div>
              <Label>Allocation ({currency})</Label>
              <Input type="number" value={newCategory.allocation} onChange={(e)=>setNewCategory({...newCategory, allocation: e.target.value})} placeholder="e.g., 1000000" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={()=>setIsCatOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCategory}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Expense Modal */}
      <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Expense</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Category</Label>
              <Select value={newExpense.categoryId} onValueChange={(v)=>setNewExpense({...newExpense, categoryId: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Input value={newExpense.description} onChange={(e)=>setNewExpense({...newExpense, description: e.target.value})} placeholder="e.g., Deposit payment" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Amount ({currency})</Label>
                <Input type="number" value={newExpense.amount} onChange={(e)=>setNewExpense({...newExpense, amount: e.target.value})} />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value={newExpense.date} onChange={(e)=>setNewExpense({...newExpense, date: e.target.value})} />
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={newExpense.notes || ""} onChange={(e)=>setNewExpense({...newExpense, notes: e.target.value})} rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={()=>setIsExpenseOpen(false)}>Cancel</Button>
              <Button onClick={handleAddExpense}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Milestone Modal */}
      <Dialog open={isMilestoneOpen} onOpenChange={setIsMilestoneOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Payment Milestone</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input value={newMilestone.title} onChange={(e)=>setNewMilestone({...newMilestone, title: e.target.value})} placeholder="e.g., Venue final payment" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Amount ({currency})</Label>
                <Input type="number" value={newMilestone.amount} onChange={(e)=>setNewMilestone({...newMilestone, amount: e.target.value})} />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={newMilestone.dueDate} onChange={(e)=>setNewMilestone({...newMilestone, dueDate: e.target.value})} />
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea value={newMilestone.notes || ""} onChange={(e)=>setNewMilestone({...newMilestone, notes: e.target.value})} rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={()=>setIsMilestoneOpen(false)}>Cancel</Button>
              <Button onClick={handleAddMilestone}>Add</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BudgetAnlyo;


