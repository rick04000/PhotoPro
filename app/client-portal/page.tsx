"use client"

import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, FileText, Folder, ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function ClientPortalPage() {
  // Mock client data
  const client = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg",
    initials: "SJ",
  }

  // Mock galleries data
  const galleries = [
    {
      id: 1,
      title: "Wedding Photos",
      date: "May 15, 2025",
      count: 245,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Ready for Review",
      progress: 100,
    },
    {
      id: 2,
      title: "Engagement Session",
      date: "April 10, 2025",
      count: 87,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Ready for Download",
      progress: 100,
    },
  ]

  // Mock contracts data
  const contracts = [
    {
      id: "CT-2025-001",
      title: "Wedding Photography Agreement",
      date: "May 1, 2025",
      status: "Signed",
    },
    {
      id: "CT-2025-005",
      title: "Engagement Photography Agreement",
      date: "April 5, 2025",
      status: "Signed",
    },
  ]

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      title: "Wedding Day Photography",
      date: "May 15, 2025",
      time: "2:00 PM",
      location: "Grand Plaza Hotel",
    },
  ]

  return (
    <div className="container max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {client.name}</h1>
        <p className="text-muted-foreground">Access your photos, contracts, and upcoming sessions all in one place.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Galleries</CardTitle>
            <CardDescription>Access your photo collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {galleries.map((gallery) => (
                <div key={gallery.id} className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="font-medium">{gallery.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{gallery.status}</Badge>
                      <span className="text-xs text-muted-foreground">{gallery.count} photos</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress value={gallery.progress} className="h-1.5 w-full" />
                      <span className="text-xs text-muted-foreground">{gallery.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/client-portal/galleries">View All Galleries</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Contracts</CardTitle>
            <CardDescription>View and sign your agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div key={contract.id} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{contract.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant={contract.status === "Signed" ? "default" : "outline"}>{contract.status}</Badge>
                      <span className="text-xs text-muted-foreground">{contract.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/client-portal/contracts">View All Contracts</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled photography sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="space-y-2">
                  <h3 className="font-medium">{session.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                  <p className="text-sm">{session.location}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Recent Activity</h2>
        <div className="rounded-lg border">
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ImageIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Wedding Photos gallery is ready for review</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Wedding Photography Agreement has been signed</p>
                  <p className="text-sm text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Engagement Session gallery is ready for download</p>
                  <p className="text-sm text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
