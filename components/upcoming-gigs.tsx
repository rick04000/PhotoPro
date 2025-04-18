import { CalendarDays, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UpcomingGigsProps {
  extended?: boolean
}

export function UpcomingGigs({ extended = false }: UpcomingGigsProps) {
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
      avatar: "/placeholder-user.jpg",
      initials: "AI",
    },
  ]

  if (extended) {
    return (
      <div className="space-y-6">
        {gigs.map((gig) => (
          <div key={gig.id} className="flex flex-col space-y-4 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={gig.avatar || "/placeholder.svg"} alt={gig.client} />
                  <AvatarFallback>{gig.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{gig.title}</h3>
                  <p className="text-sm text-muted-foreground">{gig.client}</p>
                </div>
              </div>
              <Badge variant={gig.status === "Confirmed" ? "default" : "outline"}>{gig.status}</Badge>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {gig.date} at {gig.time}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{gig.location}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{gig.type}</Badge>
              <div className="flex space-x-2">
                <Badge variant="secondary">$1,500</Badge>
                <Badge variant="secondary">4 hours</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {gigs.map((gig) => (
        <div key={gig.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={gig.avatar || "/placeholder.svg"} alt={gig.client} />
              <AvatarFallback>{gig.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{gig.title}</p>
              <p className="text-xs text-muted-foreground">{gig.date}</p>
            </div>
          </div>
          <Badge variant={gig.status === "Confirmed" ? "default" : "outline"}>{gig.status}</Badge>
        </div>
      ))}
    </div>
  )
}
