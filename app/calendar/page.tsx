"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function CalendarPage() {
  const router = useRouter()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleNewGig = () => {
    router.push("/gigs/create")
  }

  // Create calendar data for current month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Johnson Wedding",
      date: new Date(2025, 4, 15), // May 15, 2025
      type: "Wedding",
      client: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Smith Family Portrait",
      date: new Date(2025, 4, 18), // May 18, 2025
      type: "Portrait",
      client: "John Smith",
    },
    {
      id: 3,
      title: "Corporate Event - Acme Inc",
      date: new Date(2025, 4, 20), // May 20, 2025
      type: "Corporate",
      client: "Acme Inc",
    },
    {
      id: 4,
      title: "Davis Family Portrait",
      date: new Date(2025, 4, 22), // May 22, 2025
      type: "Portrait",
      client: "Emily Davis",
    },
    {
      id: 5,
      title: "Wilson Engagement Photos",
      date: new Date(2025, 4, 25), // May 25, 2025
      type: "Engagement",
      client: "Michael Wilson",
    },
    {
      id: 6,
      title: "Tech Conference",
      date: new Date(2025, 4, 28), // May 28, 2025
      type: "Corporate",
      client: "Tech Solutions Ltd",
    },
  ]

  const getEventsForDate = (date: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date &&
        event.date.getMonth() === currentMonth.getMonth() &&
        event.date.getFullYear() === currentMonth.getFullYear(),
    )
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Calendar</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleNewGig}>
              <Plus className="mr-2 h-4 w-4" />
              New Gig
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="View" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="list">List</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-0">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-2 text-center font-medium">
                  {day}
                </div>
              ))}

              {/* Empty spaces for start of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
                <div key={`empty-${idx}`} className="border p-2 h-32 bg-muted/20"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const date = idx + 1
                const dayEvents = getEventsForDate(date)
                const isToday =
                  new Date().getDate() === date &&
                  new Date().getMonth() === currentMonth.getMonth() &&
                  new Date().getFullYear() === currentMonth.getFullYear()

                return (
                  <div
                    key={`day-${date}`}
                    className={`border p-2 h-32 overflow-y-auto ${isToday ? "bg-primary/5 border-primary" : ""}`}
                  >
                    <div className="font-medium">{date}</div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="text-xs rounded bg-primary/10 p-1 cursor-pointer"
                          onClick={() => router.push(`/gigs/${event.id}`)}
                        >
                          <div className="font-medium truncate">{event.title}</div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-muted-foreground">{event.client}</span>
                            <Badge variant="outline" className="text-[10px] px-1 h-4">
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
