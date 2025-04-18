"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Filter, Grid3X3, List, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ClientGalleriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
      description: "Your wedding day photography collection",
    },
    {
      id: 2,
      title: "Engagement Session",
      date: "April 10, 2025",
      count: 87,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Ready for Download",
      progress: 100,
      description: "Photos from your engagement session at Botanical Gardens",
    },
    {
      id: 3,
      title: "Save the Date",
      date: "March 5, 2025",
      count: 25,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Completed",
      progress: 100,
      description: "Special photos for your save-the-date cards",
    },
  ]

  return (
    <div className="container max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Photo Galleries</h1>
        <p className="text-muted-foreground">View and download your photography collections</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search galleries..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Tabs defaultValue="grid" className="w-auto">
            <TabsList>
              <TabsTrigger value="grid" className="px-3">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleries.map((gallery) => (
              <Card key={gallery.id} className="overflow-hidden">
                <Link href={`/client-portal/galleries/${gallery.id}`}>
                  <div className="relative aspect-video">
                    <Image
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white">{gallery.title}</h3>
                      <p className="text-sm text-white/80">{gallery.date}</p>
                    </div>
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{gallery.count} photos</p>
                      <Badge
                        variant={
                          gallery.status === "Ready for Review"
                            ? "secondary"
                            : gallery.status === "Ready for Download"
                              ? "default"
                              : "outline"
                        }
                      >
                        {gallery.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{gallery.description}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={gallery.progress} className="h-1.5 w-full" />
                      <span className="text-xs text-muted-foreground">{gallery.progress}%</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/client-portal/galleries/${gallery.id}`}>View Gallery</Link>
                    </Button>
                    {gallery.status === "Ready for Download" && (
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">Gallery</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Photos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {galleries.map((gallery) => (
                  <tr key={gallery.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={gallery.thumbnail || "/placeholder.svg"}
                            alt={gallery.title}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium">{gallery.title}</span>
                          <p className="text-xs text-muted-foreground">{gallery.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{gallery.date}</td>
                    <td className="px-4 py-3 text-sm">{gallery.count}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          gallery.status === "Ready for Review"
                            ? "secondary"
                            : gallery.status === "Ready for Download"
                              ? "default"
                              : "outline"
                        }
                      >
                        {gallery.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/client-portal/galleries/${gallery.id}`}>View</Link>
                        </Button>
                        {gallery.status === "Ready for Download" && (
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
