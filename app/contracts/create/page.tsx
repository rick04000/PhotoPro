"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function CreateContractPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")

  const templates = [
    {
      id: "wedding",
      name: "Wedding Photography Contract",
      description: "Standard contract for wedding photography services",
    },
    {
      id: "portrait",
      name: "Portrait Session Contract",
      description: "Agreement for portrait photography sessions",
    },
    {
      id: "commercial",
      name: "Commercial Photography Agreement",
      description: "Contract for commercial photography with licensing terms",
    },
    {
      id: "event",
      name: "Event Photography Contract",
      description: "Standard contract for event photography services",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Contract created successfully",
        description: "Your new contract is ready to be sent to the client.",
      })
      router.push("/contracts")
    }, 1000)
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/contracts">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold md:text-2xl">Create New Contract</h1>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Select Contract Template</CardTitle>
                <CardDescription>Choose a template to start with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border p-4 hover:border-primary hover:bg-muted/50 ${
                        selectedTemplate === template.id ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
                <CardDescription>Customize your contract information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Contract Title</Label>
                  <Input id="title" placeholder="e.g. Wedding Photography Agreement" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
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
                      <SelectItem value="tech-solutions">Tech Solutions Ltd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="services">Services Included</Label>
                  <Textarea
                    id="services"
                    placeholder="Detail the photography services included in this contract"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fee">Total Fee ($)</Label>
                    <Input id="fee" type="number" min="0" placeholder="e.g. 1500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit">Deposit Amount ($)</Label>
                    <Input id="deposit" type="number" min="0" placeholder="e.g. 500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Additional Terms & Conditions</Label>
                  <Textarea id="terms" placeholder="Any additional terms specific to this contract" rows={6} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => router.push("/contracts")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || !selectedTemplate}>
                  {isSubmitting ? "Creating..." : "Create Contract"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </main>
    </div>
  )
}
