"use client"

import { useEffect, useState } from "react"
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
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true)
        const response = await fetch('/api/clients')
        if (!response.ok) {
          throw new Error('Failed to fetch clients')
        }
        const data = await response.json()
        setClients(data.clients)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching clients:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchClients()
  }, [])

  // Filter clients based on search query
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddClient = () => {
    router.push("/clients/create")
  }

  if (loading) {
    return <div className="p-6">Loading clients...</div>
  }

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>
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

        {filteredClients.length === 0 ? (
          <div className="text-center py-8">
            <p>No clients found. {searchQuery && "Try adjusting your search."}</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={client.name} />
                          <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{client.type || 'N/A'}</Badge>
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
        )}
      </main>
    </div>
  )
}
