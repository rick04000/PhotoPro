import Link from "next/link"
import { CalendarDays, MapPin, PlusCircle, Search } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function GigsPage() {
  const gigs = [
    {
      id: 1,
      title: "Johnson Wedding",
      client: "Sarah Johnson",
      date: "May 15, 2025",
      time: "2:00 PM",
      location: "Grand Plaza Hotel",
      type: "Wedding",
      status: "Confirmed",
      price: "$1,500",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    {
      id: 2,
      title: "Smith Family Portrait",
      client: "John Smith",
      date: "May 18, 2025",
      time: "10:00 AM",
      location: "Riverside Park",
      type: "Portrait",
      status: "Confirmed",
      price: "$350",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    {
      id: 3,
      title: "Corporate Event - Acme Inc",
      client: "Acme Inc",
      date: "May 20, 2025",
      time: "9:00 AM",
      location: "Acme Headquarters",
      type: "Corporate",
      status: "Pending",
      price: "$2,000",
      avatar: "/placeholder-user.jpg",
      initials: "AI",
    },
    {
      id: 4,
      title: "Davis Family Portrait",
      client: "Emily Davis",
      date: "May 22, 2025",
      time: "4:00 PM",
      location: "Sunset Beach",
      type: "Portrait",
      status: "Confirmed",
      price: "$400",
      avatar: "/placeholder-user.jpg",
      initials: "ED",
    },
    {
      id: 5,
      title: "Wilson Engagement Photos",
      client: "Michael Wilson",
      date: "May 25, 2025",
      time: "5:30 PM",
      location: "Botanical Gardens",
      type: "Engagement",
      status: "Confirmed",
      price: "$500",
      avatar: "/placeholder-user.jpg",
      initials: "MW",
    },
    {
      id: 6,
      title: "Tech Conference",
      client: "Tech Solutions Ltd",
      date: "May 28, 2025",
      time: "8:00 AM",
      location: "Convention Center",
      type: "Corporate",
      status: "Pending",
      price: "$2,500",
      avatar: "/placeholder-user.jpg",
      initials: "TS",
    },
    {
      id: 7,
      title: "Brown Wedding",
      client: "Jessica Brown",
      date: "June 5, 2025",
      time: "3:00 PM",
      location: "Lakeside Venue",
      type: "Wedding",
      status: "Confirmed",
      price: "$1,800",
      avatar: "/placeholder-user.jpg",
      initials: "JB",
    },
    {
      id: 8,
      title: "Miller Graduation Photos",
      client: "David Miller",
      date: "June 10, 2025",
      time: "1:00 PM",
      location: "University Campus",
      type: "Portrait",
      status: "Confirmed",
      price: "$300",
      avatar: "/placeholder-user.jpg",
      initials: "DM",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold md:text-2xl">Gigs</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Gig
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search gigs..." className="w-full pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              <Button variant="outline" size="sm">
                Wedding
              </Button>
              <Button variant="outline" size="sm">
                Portrait
              </Button>
              <Button variant="outline" size="sm">
                Corporate
              </Button>
              <Button variant="outline" size="sm">
                Engagement
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gig</TableHead>
                  <TableHead>Date & Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gigs.map((gig) => (
                  <TableRow key={gig.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={gig.avatar || "/placeholder.svg"} alt={gig.client} />
                          <AvatarFallback>{gig.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{gig.title}</p>
                          <p className="text-sm text-muted-foreground">{gig.client}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {gig.date}, {gig.time}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{gig.location}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{gig.type}</Badge>
                    </TableCell>
                    <TableCell>{gig.price}</TableCell>
                    <TableCell>
                      <Badge variant={gig.status === "Confirmed" ? "default" : "outline"}>{gig.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/gigs/${gig.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  )
}
