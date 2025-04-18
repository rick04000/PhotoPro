"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Mail, Search, Send, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function ClientAccessPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)

  // Mock clients data
  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
      status: "Active",
      lastLogin: "2 days ago",
      avatar: "/placeholder-user.jpg",
      initials: "SJ",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 987-6543",
      status: "Active",
      lastLogin: "1 week ago",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    {
      id: 3,
      name: "Acme Inc",
      email: "events@acmeinc.com",
      phone: "(555) 456-7890",
      status: "Pending",
      lastLogin: "Never",
      avatar: "/placeholder-user.jpg",
      initials: "AI",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "(555) 234-5678",
      status: "Active",
      lastLogin: "3 days ago",
      avatar: "/placeholder-user.jpg",
      initials: "ED",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "(555) 876-5432",
      status: "Inactive",
      lastLogin: "2 months ago",
      avatar: "/placeholder-user.jpg",
      initials: "MW",
    },
  ]

  const handleInviteClient = () => {
    toast({
      title: "Invitation sent",
      description: "The client has been invited to access the portal",
    })
    setInviteDialogOpen(false)
  }

  const handleCopyLink = (clientId: number) => {
    toast({
      title: "Link copied",
      description: "Client access link copied to clipboard",
    })
  }

  const handleResendInvite = (clientId: number) => {
    toast({
      title: "Invitation resent",
      description: "A new invitation has been sent to the client",
    })
  }

  const handleToggleAccess = (clientId: number, newStatus: boolean) => {
    toast({
      title: newStatus ? "Access enabled" : "Access disabled",
      description: `Client portal access has been ${newStatus ? "enabled" : "disabled"}`,
    })
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Client Portal Access</h1>
          <div className="flex items-center gap-4">
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Invite Client to Portal</DialogTitle>
                  <DialogDescription>
                    Send an invitation to your client to access their photos and documents
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client">Select Client</Label>
                    <Select>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                        <SelectItem value="john-smith">John Smith</SelectItem>
                        <SelectItem value="acme-inc">Acme Inc</SelectItem>
                        <SelectItem value="emily-davis">Emily Davis</SelectItem>
                        <SelectItem value="michael-wilson">Michael Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="client@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="message">Personalized Message (Optional)</Label>
                    <Input id="message" placeholder="Add a personal message to your invitation" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Access Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="galleries-access" className="font-normal">
                          Galleries Access
                        </Label>
                        <Switch id="galleries-access" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="contracts-access" className="font-normal">
                          Contracts Access
                        </Label>
                        <Switch id="contracts-access" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="download-access" className="font-normal">
                          Download Access
                        </Label>
                        <Switch id="download-access" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteClient}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Active
            </Button>
            <Button variant="outline" size="sm">
              Pending
            </Button>
            <Button variant="outline" size="sm">
              Inactive
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Access</TableHead>
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
                  <TableCell>
                    <Badge
                      variant={
                        client.status === "Active" ? "default" : client.status === "Pending" ? "secondary" : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastLogin}</TableCell>
                  <TableCell>
                    <Switch
                      checked={client.status === "Active"}
                      onCheckedChange={(checked) => handleToggleAccess(client.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopyLink(client.id)}
                        title="Copy access link"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {client.status === "Pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleResendInvite(client.id)}
                          title="Resend invitation"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/client-access/${client.id}`}>Manage</Link>
                      </Button>
                    </div>
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
