"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function AvailabilityCalendar() {
  const [blockedDates, setBlockedDates] = useState<string[]>([])
  const [newBlock, setNewBlock] = useState({ start: "", end: "" })

  const addBlock = () => {
    if (!newBlock.start || !newBlock.end) return
    const range = `${new Date(newBlock.start).toLocaleDateString()} → ${new Date(newBlock.end).toLocaleDateString()}`
    setBlockedDates([range, ...blockedDates])
    setNewBlock({ start: "", end: "" })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarIcon className="w-5 h-5" /> Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="start">Start date</Label>
              <Input id="start" type="date" value={newBlock.start} onChange={(e) => setNewBlock({ ...newBlock, start: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="end">End date</Label>
              <Input id="end" type="date" value={newBlock.end} onChange={(e) => setNewBlock({ ...newBlock, end: e.target.value })} />
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={addBlock}>Block Dates</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Blocked ranges</h3>
            {blockedDates.length === 0 ? (
              <p className="text-sm text-muted-foreground">No blocked dates yet.</p>
            ) : (
              <ul className="list-disc pl-5 text-sm space-y-1">
                {blockedDates.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


