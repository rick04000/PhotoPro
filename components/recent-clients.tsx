import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RecentClientsProps {
  extended?: boolean
}

export function RecentClients({ extended = false }: RecentClientsProps) {
  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      type: "Wedding",
      lastGig: "May 15, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 987-6543",
      type: "Portrait",
      lastGig: "May 18, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    {
      id: 3,
      name: "Acme Inc",
      email: "events@acmeinc.com",
      phone: "(555) 456-7890",
      type: "Corporate",
      lastGig: "May 20, 2025",
      status: "Pending",
      avatar: "/placeholder-user.jpg",
      initials: "AI",
    },
  ]

  if (extended) {
    return (
      <div className="space-y-6">
        {clients.map((client) => (
          <div key={client.id} className="flex flex-col space-y-4 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                  <AvatarFallback>{client.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                </div>
              </div>
              <Badge variant={client.status === "Active" ? "default" : "outline"}>{client.status}</Badge>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Phone: </span>
                <span>{client.phone}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Last Gig: </span>
                <span>{client.lastGig}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{client.type}</Badge>
              <div className="text-sm text-muted-foreground">Client since April 2025</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>{client.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.email}</p>
            </div>
          </div>
          <Badge variant="outline">{client.type}</Badge>
        </div>
      ))}
    </div>
  )
}
