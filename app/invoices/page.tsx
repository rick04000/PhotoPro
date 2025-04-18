// Let's also update the imports at the top of the file to make it a client component
// since we're using client-side JavaScript

// Add "use client" at the top of the file
"use client"

// Add useState and useEffect imports
import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Download, Filter, PlusCircle, Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InvoicesPage() {
  const invoices = [
    {
      id: "INV-2025-001",
      client: {
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "SJ",
      },
      amount: "$1,500.00",
      date: "May 15, 2025",
      dueDate: "May 30, 2025",
      status: "Paid",
      service: "Wedding Photography",
    },
    {
      id: "INV-2025-002",
      client: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "JS",
      },
      amount: "$350.00",
      date: "May 18, 2025",
      dueDate: "June 1, 2025",
      status: "Pending",
      service: "Family Portrait Session",
    },
    {
      id: "INV-2025-003",
      client: {
        name: "Acme Inc",
        email: "events@acmeinc.com",
        avatar: "/placeholder-user.jpg",
        initials: "AI",
      },
      amount: "$2,000.00",
      date: "May 20, 2025",
      dueDate: "June 3, 2025",
      status: "Draft",
      service: "Corporate Event Photography",
    },
    {
      id: "INV-2025-004",
      client: {
        name: "Emily Davis",
        email: "emily.davis@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "ED",
      },
      amount: "$400.00",
      date: "May 22, 2025",
      dueDate: "June 5, 2025",
      status: "Overdue",
      service: "Portrait Session",
    },
    {
      id: "INV-2025-005",
      client: {
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
        avatar: "/placeholder-user.jpg",
        initials: "MW",
      },
      amount: "$500.00",
      date: "May 25, 2025",
      dueDate: "June 8, 2025",
      status: "Pending",
      service: "Engagement Photos",
    },
    {
      id: "INV-2025-006",
      client: {
        name: "Tech Solutions Ltd",
        email: "events@techsolutions.com",
        avatar: "/placeholder-user.jpg",
        initials: "TS",
      },
      amount: "$2,500.00",
      date: "May 28, 2025",
      dueDate: "June 11, 2025",
      status: "Paid",
      service: "Conference Photography",
    },
  ]

  const [activeTab, setActiveTab] = useState("list")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation - This would be a shared component in a real app */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 p-6 md:flex">
        {/* Same sidebar as in the dashboard */}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold md:text-2xl">Invoices</h1>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/invoices/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Invoice
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search invoices..." className="w-full pl-8" />
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
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
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
                  <SelectItem value="amount-high">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount-low">Amount (Low to High)</SelectItem>
                  <SelectItem value="due-date">Due Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "list" ? "border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("list")}
              >
                List View
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "summary" ? "border-b-2 border-primary" : "text-muted-foreground"
                }`}
                onClick={() => setActiveTab("summary")}
              >
                Summary
              </button>
            </div>

            {activeTab === "list" && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={invoice.client.avatar || "/placeholder.svg"}
                                alt={invoice.client.name}
                              />
                              <AvatarFallback>{invoice.client.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium leading-none">{invoice.client.name}</p>
                              <p className="text-xs text-muted-foreground">{invoice.client.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.service}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <p className="text-sm">Issued: {invoice.date}</p>
                            <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Pending"
                                  ? "outline"
                                  : invoice.status === "Overdue"
                                    ? "destructive"
                                    : "secondary"
                            }
                          >
                            {invoice.status}
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
                                <Link href={`/invoices/${invoice.id}`}>View</Link>
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
                              <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {activeTab === "summary" && (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3,250.00</div>
                      <p className="text-xs text-muted-foreground">From 3 unpaid invoices</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4,000.00</div>
                      <p className="text-xs text-muted-foreground">From 2 invoices</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$400.00</div>
                      <p className="text-xs text-muted-foreground">From 1 invoice</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Draft</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$2,000.00</div>
                      <p className="text-xs text-muted-foreground">From 1 invoice</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest invoice activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Invoice INV-2025-006 was paid</p>
                            <p className="text-xs text-muted-foreground">Tech Solutions Ltd - $2,500.00</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Invoice INV-2025-004 is now overdue</p>
                            <p className="text-xs text-muted-foreground">Emily Davis - $400.00</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Invoice INV-2025-003 was created</p>
                            <p className="text-xs text-muted-foreground">Acme Inc - $2,000.00</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">5 days ago</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CalendarDays className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Invoice INV-2025-001 was paid</p>
                            <p className="text-xs text-muted-foreground">Sarah Johnson - $1,500.00</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
