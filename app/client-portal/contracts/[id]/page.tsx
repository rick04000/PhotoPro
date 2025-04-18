"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ClientContractDetailPage({ params }: { params: { id: string } }) {
  const [signDialogOpen, setSignDialogOpen] = useState(false)

  // Mock contract data
  const contract = {
    id: params.id,
    title: "Wedding Photography Agreement",
    date: "May 1, 2025",
    status: params.id === "CT-2025-007" ? "Pending Signature" : "Signed",
    type: "Wedding",
    content: `
      <h2>PHOTOGRAPHY AGREEMENT</h2>
      
      <p>This Photography Agreement (the "Agreement") is entered into as of May 1, 2025, by and between PhotoPro ("Photographer") and Sarah Johnson ("Client").</p>
      
      <h3>1. SCOPE OF SERVICES</h3>
      <p>Photographer agrees to provide photography services for Client's wedding on May 15, 2025, at Grand Plaza Hotel ("Event"). Services include:</p>
      <ul>
        <li>8 hours of wedding day coverage</li>
        <li>Two photographers</li>
        <li>Online gallery of edited images</li>
        <li>High-resolution digital files with print release</li>
      </ul>
      
      <h3>2. PAYMENT</h3>
      <p>The total fee for services is $2,500. A non-refundable deposit of $500 is due upon signing this Agreement. The remaining balance is due 14 days prior to the Event.</p>
      
      <h3>3. DELIVERABLES</h3>
      <p>Photographer will deliver a minimum of 400 edited digital images within 6 weeks of the Event. Images will be delivered via an online gallery.</p>
      
      <h3>4. COPYRIGHT AND USAGE RIGHTS</h3>
      <p>Photographer retains copyright to all images. Client is granted a non-exclusive license to use the images for personal use. Photographer may use images for portfolio, advertising, and other promotional purposes.</p>
      
      <h3>5. CANCELLATION</h3>
      <p>If Client cancels this Agreement more than 90 days before the Event, the deposit will be forfeited. If Client cancels within 90 days of the Event, Client is responsible for the full payment.</p>
    `,
  }

  const handleSign = () => {
    toast({
      title: "Contract signed successfully",
      description: "A copy has been emailed to you for your records.",
    })
    setSignDialogOpen(false)
  }

  const handleDownload = () => {
    toast({
      title: "Contract downloaded",
      description: "The contract has been downloaded to your device.",
    })
  }

  return (
    <div className="container max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/client-portal/contracts">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">{contract.title}</h1>
        <Badge
          variant={
            contract.status === "Signed" ? "default" : contract.status === "Pending Signature" ? "secondary" : "outline"
          }
          className="ml-2"
        >
          {contract.status}
        </Badge>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{contract.title}</p>
            <p className="text-sm text-muted-foreground">
              {contract.id} • {contract.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          {contract.status === "Pending Signature" && (
            <Dialog open={signDialogOpen} onOpenChange={setSignDialogOpen}>
              <DialogTrigger asChild>
                <Button>Sign Contract</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign Contract</DialogTitle>
                  <DialogDescription>Please review the contract carefully before signing.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Enter your full legal name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="signature">Signature</Label>
                    <div className="h-24 rounded-md border border-dashed bg-muted/50 p-2">
                      <p className="text-center text-sm text-muted-foreground">Type your name or draw your signature</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSignDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSign}>Sign Contract</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: contract.content }} />
      </div>

      <Separator className="my-8" />

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Contract History</h2>
        <div className="space-y-4">
          {contract.status === "Signed" ? (
            <>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contract signed by Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">May 1, 2025 at 10:23 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contract sent by PhotoPro</p>
                  <p className="text-sm text-muted-foreground">April 28, 2025 at 3:45 PM</p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Contract sent by PhotoPro</p>
                <p className="text-sm text-muted-foreground">May 2, 2025 at 2:15 PM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
