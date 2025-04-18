"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Download, Edit, FileText, Filter, PlusCircle, Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContractsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const contracts = [
    {
      id: "CT-2025-001",
      title: "Wedding Photography Agreement",
      client: "Sarah Johnson",
      date: "May 1, 2025",
      status: "Signed",
      type: "Wedding",
    },
    {
      id: "CT-2025-002",
      title: "Portrait Session Contract",
      client: "John Smith",
      date: "May 5, 2025",
      status: "Sent",
      type: "Portrait",
    },
    {
      id: "CT-2025-003",
      title: "Corporate Event Photography Agreement",
      client: "Acme Inc",
      date: "May 8, 2025",
      status: "Draft",
      type: "Corporate",
    },
    {
      id: "CT-2025-004",
      title: "Portrait Session Contract",
      client: "Emily Davis",
      date: "May 10, 2025",
      status: "Signed",
      type: "Portrait",
    },
    {
      id: "CT-2025-005",
      title: "Engagement Photography Agreement",
      client: "Michael Wilson",
      date: "May 12, 2025",
      status: "Signed",
      type: "Engagement",
    },
    {
      id: "CT-2025-006",
      title: "Commercial Photography License",
      client: "Tech Solutions Ltd",
      date: "May 15, 2025",
      status: "Pending",
      type: "Commercial",
    },
  ]

  const handleCreateContract = () => {
    router.push("/contracts/create")
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Contracts</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreateContract}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Contract
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
              placeholder="Search contracts..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="client">Client Name</SelectItem>
                <SelectItem value="type">Contract Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{contract.title}</p>
                        <p className="text-sm text-muted-foreground">{contract.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{contract.type}</Badge>
                  </TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>{contract.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        contract.status === "Signed"
                          ? "default"
                          : contract.status === "Sent"
                            ? "outline"
                            : contract.status === "Pending"
                              ? "secondary"
                              : "destructive"
                      }
                    >
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/contracts/${contract.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
