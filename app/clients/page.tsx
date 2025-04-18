"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function ClientsPage() {
  const router = useRouter()

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
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 234-5678",
      type: "Portrait",
      lastGig: "April 30, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "ED",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "(555) 876-5432",
      type: "Event",
      lastGig: "April 25, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "MW",
    },
    {
      id: 6,
      name: "Tech Solutions Ltd",
      email: "events@techsolutions.com",
      phone: "(555) 345-6789",
      type: "Corporate",
      lastGig: "April 15, 2025",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
      initials: "TS",
    },
    {
      id: 7,
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      phone: "(555) 567-8901",
      type: "Wedding",
      lastGig: "April 10, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "JB",
    },
    {
      id: 8,
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "(555) 678-9012",
      type: "Portrait",
      lastGig: "April 5, 2025",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      initials: "DM",
    },
  ]

  const handleAddClient = () => {
    router.push("/clients/create")
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Clients</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleAddClient}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search clients..." className="w-full pl-8" />
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
              Event
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Gig</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                        <AvatarFallback>{client.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{client.type}</Badge>
                  </TableCell>
                  <TableCell>{client.lastGig}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status === "Active" ? "default" : client.status === "Pending" ? "secondary" : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/clients/${client.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
