"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CloudUpload,
  Download,
  Edit,
  Eye,
  Filter,
  Grid,
  Mail,
  MoreHorizontal,
  Share2,
  Trash,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/hooks/use-toast"

export default function GalleryDetailPage({ params }: { params: { id: string } }) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [selectMode, setSelectMode] = useState(false)
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false)

  // Mock gallery data
  const gallery = {
    id: params.id,
    title: "Johnson Wedding",
    date: "May 15, 2025",
    count: 245,
    status: "Editing",
    client: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "(555) 123-4567",
    },
    location: "Grand Plaza Hotel",
  }

  // Mock photos data
  const photos = Array.from({ length: 24 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=800&width=1200`,
    thumbnail: `/placeholder.svg?height=300&width=400`,
    title: `Photo ${i + 1}`,
    selected: false,
    edited: i < 18, // First 18 photos are edited
    favorite: i % 5 === 0, // Every 5th photo is favorited
  }))

  const togglePhotoSelection = (photoId: string) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId))
    } else {
      setSelectedPhotos([...selectedPhotos, photoId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedPhotos.length === photos.length) {
      setSelectedPhotos([])
    } else {
      setSelectedPhotos(photos.map((photo) => photo.id))
    }
  }

  const handleDelivery = () => {
    toast({
      title: "Gallery prepared for delivery",
      description: `${selectedPhotos.length} photos will be delivered to ${gallery.client.name}`,
    })
    setDeliveryDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/photos">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold md:text-2xl">{gallery.title}</h1>
            <Badge variant="outline" className="ml-2">
              {gallery.status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {selectMode ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setSelectMode(false)}>
                  Cancel
                </Button>
                <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                  {selectedPhotos.length === photos.length ? "Deselect All" : "Select All"}
                </Button>
                <Button size="sm" disabled={selectedPhotos.length === 0} onClick={() => setDeliveryDialogOpen(true)}>
                  Deliver Selected ({selectedPhotos.length})
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setSelectMode(true)}>
                  Select Photos
                </Button>
                <Dialog open={deliveryDialogOpen} onOpenChange={setDeliveryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Share2 className="mr-2 h-4 w-4" />
                      Deliver Gallery
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Deliver Gallery</DialogTitle>
                      <DialogDescription>Prepare this gallery for delivery to your client.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="client-email">Client Email</Label>
                        <Input id="client-email" defaultValue={gallery.client.email} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="gallery-name">Gallery Name</Label>
                        <Input id="gallery-name" defaultValue={gallery.title} />
                      </div>
                      <div className="grid gap-2">
                        <Label>Watermark Options</Label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Apply watermark to preview images</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Download Options</Label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Allow high-resolution downloads</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Require client selection before download</span>
                          <Switch />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiration">Gallery Expiration</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="expiration">
                            <SelectValue placeholder="Select expiration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="never">Never expires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeliveryDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleDelivery}>Deliver Gallery</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Gallery Info */}
      <div className="border-b bg-muted/20 px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Client: {gallery.client.name}</span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{gallery.client.email}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{gallery.count} Photos</Badge>
            <Badge variant="outline">{gallery.date}</Badge>
            <Badge variant="outline">{gallery.location}</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <TabsList>
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="edited">Edited ({photos.filter((p) => p.edited).length})</TabsTrigger>
              <TabsTrigger value="selected">Selected ({selectedPhotos.length})</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Select defaultValue="date-desc">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                  <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {photos.map((photo) => (
                <Card key={photo.id} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={photo.thumbnail || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                    {selectMode && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        onClick={() => togglePhotoSelection(photo.id)}
                      >
                        <Checkbox
                          checked={selectedPhotos.includes(photo.id)}
                          className="h-6 w-6 border-2 border-white"
                        />
                      </div>
                    )}
                    {!selectMode && (
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        {photo.edited && (
                          <Badge variant="secondary" className="h-6 px-1.5">
                            <Check className="h-3 w-3" />
                          </Badge>
                        )}
                        {photo.favorite && (
                          <Badge variant="default" className="h-6 px-1.5">
                            ★
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  {!selectMode && (
                    <CardFooter className="flex justify-between p-2">
                      <span className="text-xs">{photo.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="edited" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {photos
                .filter((photo) => photo.edited)
                .map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={photo.thumbnail || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />
                      {selectMode && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/30"
                          onClick={() => togglePhotoSelection(photo.id)}
                        >
                          <Checkbox
                            checked={selectedPhotos.includes(photo.id)}
                            className="h-6 w-6 border-2 border-white"
                          />
                        </div>
                      )}
                      {!selectMode && photo.favorite && (
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="default" className="h-6 px-1.5">
                            ★
                          </Badge>
                        </div>
                      )}
                    </div>
                    {!selectMode && (
                      <CardFooter className="flex justify-between p-2">
                        <span className="text-xs">{photo.title}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    )}
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="selected" className="mt-0">
            {selectedPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No Photos Selected</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Select photos to include in your delivery</p>
                  <Button className="mt-4" onClick={() => setSelectMode(true)}>
                    Select Photos
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {photos
                  .filter((photo) => selectedPhotos.includes(photo.id))
                  .map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={photo.thumbnail || "/placeholder.svg"}
                          alt={photo.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/30"
                          onClick={() => togglePhotoSelection(photo.id)}
                        >
                          <Checkbox checked={true} className="h-6 w-6 border-2 border-white" />
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {photos
                .filter((photo) => photo.favorite)
                .map((photo) => (
                  <Card key={photo.id} className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={photo.thumbnail || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover"
                      />
                      {selectMode && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black/30"
                          onClick={() => togglePhotoSelection(photo.id)}
                        >
                          <Checkbox
                            checked={selectedPhotos.includes(photo.id)}
                            className="h-6 w-6 border-2 border-white"
                          />
                        </div>
                      )}
                      {!selectMode && (
                        <div className="absolute bottom-2 right-2">
                          <Badge variant="default" className="h-6 px-1.5">
                            ★
                          </Badge>
                        </div>
                      )}
                    </div>
                    {!selectMode && (
                      <CardFooter className="flex justify-between p-2">
                        <span className="text-xs">{photo.title}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    )}
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Delivery Panel - Fixed at bottom when photos are selected */}
      {selectedPhotos.length > 0 && selectMode && (
        <div className="sticky bottom-0 border-t bg-background p-4 shadow-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="font-medium">{selectedPhotos.length} photos selected</p>
              <p className="text-sm text-muted-foreground">Ready for delivery or editing</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedPhotos([])}>
                Clear Selection
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setDeliveryDialogOpen(true)}>Deliver Selected</Button>
            </div>
          </div>
        </div>
      )}

      {/* Client Gallery Delivery Dialog */}
      <Dialog open={deliveryDialogOpen} onOpenChange={setDeliveryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Deliver Gallery to Client</DialogTitle>
            <DialogDescription>
              Create a custom gallery experience for your client with the following options.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Settings</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="gallery-title">Gallery Title</Label>
                <Input id="gallery-title" defaultValue={gallery.title} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="client-email">Client Email</Label>
                <Input id="client-email" defaultValue={gallery.client.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Input id="welcome-message" defaultValue={`Here are your photos from ${gallery.title}!`} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="expiration">Gallery Expiration</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="expiration">
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="never">Never expires</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Photos to Include</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="selected-only" />
                  <label
                    htmlFor="selected-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Only include selected photos ({selectedPhotos.length})
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="edited-only" defaultChecked />
                  <label
                    htmlFor="edited-only"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Only include edited photos ({photos.filter((p) => p.edited).length})
                  </label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Gallery Appearance</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-md border p-2 hover:bg-muted">
                    <div className="aspect-video rounded bg-muted"></div>
                    <p className="mt-2 text-center text-sm">Minimal</p>
                  </div>
                  <div className="rounded-md border p-2 hover:bg-muted">
                    <div className="aspect-video rounded bg-muted"></div>
                    <p className="mt-2 text-center text-sm">Classic</p>
                  </div>
                  <div className="rounded-md border p-2 hover:bg-muted">
                    <div className="aspect-video rounded bg-muted"></div>
                    <p className="mt-2 text-center text-sm">Modern</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="logo-upload">Your Logo</Label>
                <div className="flex items-center gap-2">
                  <div className="h-12 w-12 rounded-md border"></div>
                  <Button variant="outline" size="sm">
                    <CloudUpload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-md bg-primary"></div>
                  <Input id="accent-color" defaultValue="#2563eb" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Custom Domain</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Use your custom domain for this gallery</span>
                  <Switch />
                </div>
                <Input placeholder="gallery.yourdomain.com" disabled />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label>Download Options</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow high-resolution downloads</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Require client selection before download</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include metadata in downloaded files</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Watermark Options</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Apply watermark to preview images</span>
                  <Switch defaultChecked />
                </div>
                <div className="mt-2">
                  <Label className="mb-2 block text-sm">Watermark Opacity</Label>
                  <Slider defaultValue={[30]} max={100} step={1} />
                </div>
                <div className="mt-2">
                  <Label className="mb-2 block text-sm">Watermark Size</Label>
                  <Slider defaultValue={[20]} max={100} step={1} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Social Sharing</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow clients to share on social media</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include your branding on shared images</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Client Feedback</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow clients to favorite photos</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Allow clients to leave comments</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notify me when client interacts with gallery</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setDeliveryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelivery}>Create & Share Gallery</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
