"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Edit, Mail, MoreHorizontal, Printer, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export default function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)

  // Mock invoice data
  const invoice = {
    id: params.id,
    number: "INV-2025-001",
    client: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      address: "123 Main Street, Anytown, CA 12345",
      phone: "(555) 123-4567",
    },
    issueDate: "May 15, 2025",
    dueDate: "May 30, 2025",
    status: "Paid",
    items: [
      {
        id: 1,
        description: "Wedding Photography Package - Full Day Coverage",
        quantity: 1,
        rate: 1500,
        amount: 1500,
      },
      {
        id: 2,
        description: "Additional Photographer",
        quantity: 1,
        rate: 500,
        amount: 500,
      },
      {
        id: 3,
        description: "Edited Digital Images (High Resolution)",
        quantity: 1,
        rate: 300,
        amount: 300,
      },
    ],
    subtotal: 2300,
    taxRate: 0.1,
    taxAmount: 230,
    total: 2530,
    notes: "Thank you for choosing our photography services for your special day!",
    paymentTerms: "Payment due within 15 days of invoice date.",
    paymentMethods: ["Bank Transfer", "PayPal", "Credit Card"],
    paymentHistory: [
      {
        id: 1,
        date: "May 20, 2025",
        amount: 2530,
        method: "Bank Transfer",
        reference: "REF123456",
      },
    ],
  }

  const handleRecordPayment = () => {
    toast({
      title: "Payment recorded successfully",
      description: `Payment of $${invoice.total.toFixed(2)} has been recorded.`,
    })
    setPaymentDialogOpen(false)
  }

  const handleSendReminder = () => {
    toast({
      title: "Payment reminder sent",
      description: `A payment reminder has been sent to ${invoice.client.email}.`,
    })
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
            <h1 className="text-xl font-semibold md:text-2xl">Invoice {invoice.number}</h1>
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
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Mail className="mr-2 h-4 w-4" />
              Send
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="sm:hidden">
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem className="sm:hidden">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem className="sm:hidden">
                  <Mail className="mr-2 h-4 w-4" />
                  Send
                </DropdownMenuItem>
                <DropdownMenuSeparator className="sm:hidden" />
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Invoice
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </DropdownMenuItem>
                <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Record Payment</DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Record Payment</DialogTitle>
                      <DialogDescription>Enter the payment details for invoice {invoice.number}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="payment-amount">Payment Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input id="payment-amount" defaultValue={invoice.total.toFixed(2)} className="pl-6" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="payment-date">Payment Date</Label>
                        <Input id="payment-date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="payment-method">Payment Method</Label>
                        <Select defaultValue="bank">
                          <SelectTrigger id="payment-method">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="card">Credit Card</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="payment-reference">Reference Number (Optional)</Label>
                        <Input id="payment-reference" placeholder="e.g., Transaction ID" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="payment-notes">Notes (Optional)</Label>
                        <Input id="payment-notes" placeholder="Any additional information" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleRecordPayment}>Record Payment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem onClick={handleSendReminder}>Send Reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete Invoice</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm">Mark as Paid</Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            {/* Invoice Header */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="space-y-2">
                <div className="h-12 w-auto">
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
                      P
                    </div>
                    PhotoPro
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>123 Photography Lane</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                  <p>contact@photopro.com</p>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <h1 className="text-3xl font-bold tracking-tight">INVOICE</h1>
                <p className="text-muted-foreground">{invoice.number}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Invoice Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Bill To:</h3>
                <div>
                  <h2 className="font-semibold">{invoice.client.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    <p>{invoice.client.address}</p>
                    <p>{invoice.client.email}</p>
                    <p>{invoice.client.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 md:text-right">
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <p className="font-medium text-muted-foreground">Issue Date:</p>
                  <p className="md:text-right">{invoice.issueDate}</p>
                  <p className="font-medium text-muted-foreground">Due Date:</p>
                  <p className="md:text-right">{invoice.dueDate}</p>
                  <p className="font-medium text-muted-foreground">Status:</p>
                  <p className="md:text-right">
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
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                    <th className="px-4 py-3 text-center text-sm font-medium">Quantity</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Rate</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 text-sm">{item.description}</td>
                      <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-sm">${item.rate.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-sm">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">
                    Tax ({(invoice.taxRate * 100).toFixed(0)}%):
                  </span>
                  <span>${invoice.taxAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-muted-foreground">Amount Paid:</span>
                  <span>${invoice.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Balance Due:</span>
                  <span>
                    $
                    {(invoice.total - invoice.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)).toFixed(
                      2,
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Notes and Payment Info */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground">{invoice.notes}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Terms</h3>
                <p className="text-sm text-muted-foreground">{invoice.paymentTerms}</p>
                <h3 className="text-sm font-medium mt-4">Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {invoice.paymentMethods.map((method, index) => (
                    <Badge key={index} variant="outline">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment History */}
            {invoice.paymentHistory.length > 0 && (
              <>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment History</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Reference</th>
                          <th className="px-4 py-3 text-right text-sm font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.paymentHistory.map((payment) => (
                          <tr key={payment.id} className="border-b">
                            <td className="px-4 py-3 text-sm">{payment.date}</td>
                            <td className="px-4 py-3 text-sm">{payment.method}</td>
                            <td className="px-4 py-3 text-sm">{payment.reference}</td>
                            <td className="px-4 py-3 text-right text-sm">${payment.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Thank you for your business!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
