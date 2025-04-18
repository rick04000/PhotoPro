"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Heart, MessageSquare, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export default function ClientGalleryDetailPage({ params }: { params: { id: string } }) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
  const [selectMode, setSelectMode] = useState(false)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null)

  // Mock gallery data
  const gallery = {
    id: params.id,
    title: "Wedding Photos",
    date: "May 15, 2025",
    count: 245,
    status: "Ready for Review",
    description: "Your wedding day photography collection",
  }

  // Mock photos data
  const photos = Array.from({ length: 24 }, (_, i) => ({
    id: `photo-${i + 1}`,
    src: `/placeholder.svg?height=800&width=1200`,
    thumbnail: `/placeholder.svg?height=300&width=400`,
    title: `Photo ${i + 1}`,
    selected: false,
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

  const handleFeedbackSubmit = () => {
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback on this photo.",
    })
    setFeedbackDialogOpen(false)
    setCurrentPhotoId(null)
  }

  const handleDownloadSelected = () => {
    toast({
      title: "Download started",
      description: `${selectedPhotos.length} photos will be downloaded.`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-16 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/client-portal/galleries">
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
                <Button size="sm" disabled={selectedPhotos.length === 0} onClick={handleDownloadSelected}>
                  Download Selected ({selectedPhotos.length})
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setSelectMode(true)}>
                  Select Photos
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download All
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Gallery Info */}
      <div className="border-b bg-muted/20 px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{gallery.date}</p>
            <p className="text-sm">{gallery.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{gallery.count} Photos</Badge>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <TabsList>
              <TabsTrigger value="all">All Photos</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="selected">Selected ({selectedPhotos.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border">
                  <Image
                    src={photo.thumbnail || "/placeholder.svg"}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {selectMode ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                      onClick={() => togglePhotoSelection(photo.id)}
                    >
                      <Checkbox checked={selectedPhotos.includes(photo.id)} className="h-6 w-6 border-2 border-white" />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white"
                            onClick={() => {
                              setCurrentPhotoId(photo.id)
                              setFeedbackDialogOpen(true)
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                            <Heart className="h-4 w-4" fill={photo.favorite ? "white" : "none"} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-0">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {photos
                .filter((photo) => photo.favorite)
                .map((photo) => (
                  <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border">
                    <Image
                      src={photo.thumbnail || "/placeholder.svg"}
                      alt={photo.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {selectMode ? (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        onClick={() => togglePhotoSelection(photo.id)}
                      >
                        <Checkbox
                          checked={selectedPhotos.includes(photo.id)}
                          className="h-6 w-6 border-2 border-white"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <div className="flex items-center justify-between">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-white"
                              onClick={() => {
                                setCurrentPhotoId(photo.id)
                                setFeedbackDialogOpen(true)
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                              <Heart className="h-4 w-4" fill="white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="selected" className="mt-0">
            {selectedPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No Photos Selected</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Select photos to download or share</p>
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
                    <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-md border">
                      <Image
                        src={photo.thumbnail || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        onClick={() => togglePhotoSelection(photo.id)}
                      >
                        <Checkbox checked={true} className="h-6 w-6 border-2 border-white" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogDescription>Share your thoughts about this photo with your photographer.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="feedback-type">Feedback Type</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="like" />
                  <label
                    htmlFor="like"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="favorite" />
                  <label
                    htmlFor="favorite"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Heart className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea id="comment" placeholder="Share your thoughts about this photo..." className="min-h-[100px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Download Panel - Fixed at bottom when photos are selected */}
      {selectedPhotos.length > 0 && selectMode && (
        <div className="sticky bottom-0 border-t bg-background p-4 shadow-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="font-medium">{selectedPhotos.length} photos selected</p>
              <p className="text-sm text-muted-foreground">Ready for download</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedPhotos([])}>
                Clear Selection
              </Button>
              <Button onClick={handleDownloadSelected}>
                <Download className="mr-2 h-4 w-4" />
                Download Selected
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
