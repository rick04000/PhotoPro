"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Filter, Grid3X3, List, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function GalleriesPage() {
  const router = useRouter()

  const galleries = [
    {
      id: 1,
      title: "Johnson Wedding",
      date: "May 15, 2025",
      count: 245,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Editing",
      client: "Sarah Johnson",
    },
    {
      id: 2,
      title: "Smith Family Portrait",
      date: "May 18, 2025",
      count: 48,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Completed",
      client: "John Smith",
    },
    {
      id: 3,
      title: "Corporate Event - Acme Inc",
      date: "May 20, 2025",
      count: 156,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Pending",
      client: "Acme Inc",
    },
    {
      id: 4,
      title: "Davis Family Portrait",
      date: "April 30, 2025",
      count: 52,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Completed",
      client: "Emily Davis",
    },
    {
      id: 5,
      title: "Wilson Engagement Photos",
      date: "April 25, 2025",
      count: 87,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Delivered",
      client: "Michael Wilson",
    },
    {
      id: 6,
      title: "Tech Conference",
      date: "April 15, 2025",
      count: 203,
      thumbnail: "/placeholder.svg?height=300&width=400",
      status: "Delivered",
      client: "Tech Solutions Ltd",
    },
  ]

  const handleCreateGallery = () => {
    router.push("/galleries/create")
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold md:text-2xl">Galleries</h1>
          <div className="flex items-center gap-4">
            <Button onClick={handleCreateGallery}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Gallery
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search galleries..." className="w-full pl-8" />
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
                  <Link href={`/galleries/${gallery.id}`}>
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
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{gallery.count} photos</p>
                      <Badge
                        variant={
                          gallery.status === "Completed"
                            ? "default"
                            : gallery.status === "Editing"
                              ? "secondary"
                              : gallery.status === "Delivered"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {gallery.status}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm">{gallery.client}</p>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/galleries/${gallery.id}`}>View</Link>
                      </Button>
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
                    <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
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
                          <span className="font-medium">{gallery.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{gallery.client}</td>
                      <td className="px-4 py-3 text-sm">{gallery.date}</td>
                      <td className="px-4 py-3 text-sm">{gallery.count}</td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            gallery.status === "Completed"
                              ? "default"
                              : gallery.status === "Editing"
                                ? "secondary"
                                : gallery.status === "Delivered"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {gallery.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/galleries/${gallery.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
