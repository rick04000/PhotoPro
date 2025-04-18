"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

export default function CreateInvoicePage() {
  const [invoiceItems, setInvoiceItems] = useState([{ id: 1, description: "", quantity: 1, rate: 0, amount: 0 }])
  const [issueDate, setIssueDate] = useState<Date>()
  const [dueDate, setDueDate] = useState<Date>()

  const addInvoiceItem = () => {
    const newId = invoiceItems.length > 0 ? Math.max(...invoiceItems.map((item) => item.id)) + 1 : 1
    setInvoiceItems([...invoiceItems, { id: newId, description: "", quantity: 1, rate: 0, amount: 0 }])
  }

  const removeInvoiceItem = (id: number) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((item) => item.id !== id))
    }
  }

  const updateInvoiceItem = (id: number, field: string, value: string | number) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Recalculate amount if quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.rate)
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + (item.amount || 0), 0)
  }

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.1 // 10% tax rate
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = calculateTax(subtotal)
    return subtotal + tax
  }

  const handleSaveInvoice = (status: "draft" | "send") => {
    toast({
      title: status === "draft" ? "Invoice saved as draft" : "Invoice created and ready to send",
      description: `Invoice total: $${calculateTotal().toFixed(2)}`,
    })
  }

  // Photography service templates
  const serviceTemplates = [
    {
      name: "Wedding Photography Package",
      items: [
        { description: "Full Day Wedding Photography Coverage (8 hours)", quantity: 1, rate: 1500 },
        { description: "Second Photographer", quantity: 1, rate: 500 },
        { description: "Engagement Photo Session", quantity: 1, rate: 300 },
        { description: "Online Gallery with Digital Downloads", quantity: 1, rate: 200 },
      ],
    },
    {
      name: "Portrait Session",
      items: [
        { description: "1 Hour Portrait Photography Session", quantity: 1, rate: 250 },
        { description: "Professional Editing of Images", quantity: 1, rate: 100 },
        { description: "Online Gallery with Digital Downloads", quantity: 1, rate: 50 },
      ],
    },
    {
      name: "Commercial Photography",
      items: [
        { description: "Half Day Commercial Photography (4 hours)", quantity: 1, rate: 800 },
        { description: "Professional Editing and Retouching", quantity: 1, rate: 300 },
        { description: "Commercial Usage License", quantity: 1, rate: 500 },
      ],
    },
  ]

  const applyTemplate = (templateIndex: number) => {
    const template = serviceTemplates[templateIndex]
    const newItems = template.items.map((item, index) => ({
      id: index + 1,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      amount: item.quantity * item.rate,
    }))
    setInvoiceItems(newItems)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/invoices">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold md:text-2xl">Create New Invoice</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSaveInvoice("draft")}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSaveInvoice("send")}>Create & Send</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Invoice Details</TabsTrigger>
              <TabsTrigger value="items">Line Items</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client & Invoice Information</CardTitle>
                  <CardDescription>Enter the basic details for this invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="invoice-number">Invoice Number</Label>
                      <Input id="invoice-number" defaultValue="INV-2025-007" />
                    </div>
                    <div className="space-y-2">
                      <Label>Invoice Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard Invoice</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Client</Label>
                    <Select>
                      <SelectTrigger>
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

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="issue-date">Issue Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !issueDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {issueDate ? format(issueDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={issueDate} onSelect={setIssueDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dueDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference / PO Number (Optional)</Label>
                    <Input id="reference" placeholder="e.g., PO-12345" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Templates</CardTitle>
                  <CardDescription>Quickly add predefined photography services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    {serviceTemplates.map((template, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => applyTemplate(index)}
                      >
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm text-muted-foreground">
                            {template.items.length} items, $
                            {template.items.reduce((sum, item) => sum + item.rate * item.quantity, 0).toFixed(2)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Items</CardTitle>
                  <CardDescription>Add the services or products you're billing for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                          <th className="px-4 py-3 text-center text-sm font-medium">Quantity</th>
                          <th className="px-4 py-3 text-center text-sm font-medium">Rate</th>
                          <th className="px-4 py-3 text-center text-sm font-medium">Amount</th>
                          <th className="px-4 py-3 text-center text-sm font-medium w-[80px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceItems.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="px-4 py-3">
                              <Input
                                value={item.description}
                                onChange={(e) => updateInvoiceItem(item.id, "description", e.target.value)}
                                placeholder="Enter item description"
                              />
                            </td>
                            <td className="px-4 py-3 w-[120px]">
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateInvoiceItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)
                                }
                                className="text-center"
                              />
                            </td>
                            <td className="px-4 py-3 w-[150px]">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) =>
                                    updateInvoiceItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)
                                  }
                                  className="pl-6 text-right"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 w-[150px]">
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input
                                  type="number"
                                  readOnly
                                  value={item.amount.toFixed(2)}
                                  className="pl-6 text-right bg-muted/50"
                                />
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeInvoiceItem(item.id)}
                                disabled={invoiceItems.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Button variant="outline" onClick={addInvoiceItem} className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Add Item
                  </Button>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes for the client..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (10%):</span>
                        <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure how you want to be paid</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Payment Methods</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-bank" defaultChecked />
                          <Label htmlFor="payment-bank" className="font-normal">
                            Bank Transfer
                          </Label>
                        </div>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-paypal" defaultChecked />
                          <Label htmlFor="payment-paypal" className="font-normal">
                            PayPal
                          </Label>
                        </div>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-stripe" />
                          <Label htmlFor="payment-stripe" className="font-normal">
                            Credit Card (Stripe)
                          </Label>
                        </div>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="payment-cash" />
                          <Label htmlFor="payment-cash" className="font-normal">
                            Cash
                          </Label>
                        </div>
                        <Button variant="ghost" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <Select defaultValue="14">
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">Due in 7 days</SelectItem>
                        <SelectItem value="14">Due in 14 days</SelectItem>
                        <SelectItem value="30">Due in 30 days</SelectItem>
                        <SelectItem value="60">Due in 60 days</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="late-fee">Late Payment Fee</Label>
                    <div className="flex items-center gap-2">
                      <div className="relative w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">%</span>
                        <Input id="late-fee" type="number" min="0" max="100" defaultValue="5" className="pl-6" />
                      </div>
                      <span>of the total invoice amount</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Customization</CardTitle>
                  <CardDescription>Personalize your invoice appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <Button variant="outline">Upload Logo</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary border-2 border-primary cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-blue-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-green-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-purple-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-orange-500 cursor-pointer"></div>
                      <div className="h-8 w-8 rounded-full bg-red-500 cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Footer Text</Label>
                    <Textarea
                      placeholder="Enter custom footer text for your invoice..."
                      defaultValue="Thank you for your business! Payment is due within the terms specified above."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
