"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Eye, Mail, Send, Settings, Trash2, UserCog } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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

export default function ClientAccessDetailPage({ params }: { params: { id: string } }) {
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)

  // Mock client data
  const client = {
    id: Number.parseInt(params.id),
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastLogin: "2 days ago",
    avatar: "/placeholder-user.jpg",
    initials: "SJ",
    registeredDate: "April 15, 2025",
    accessPermissions: {
      galleries: true,
      contracts: true,
      downloads: true,
    },
    activityLog: [
      {
        id: 1,
        action: "Logged in",
        date: "May 10, 2025",
        time: "10:23 AM",
      },
      {
        id: 2,
        action: "Viewed Wedding Photos gallery",
        date: "May 10, 2025",
        time: "10:25 AM",
      },
      {
        id: 3,
        action: "Downloaded 5 photos",
        date: "May 10, 2025",
        time: "10:30 AM",
      },
      {
        id: 4,
        action: "Signed Wedding Photography Agreement",
        date: "May 8, 2025",
        time: "3:45 PM",
      },
      {
        id: 5,
        action: "Logged in",
        date: "May 8, 2025",
        time: "3:40 PM",
      },
    ],
  }

  const handleResetPassword = () => {
    toast({
      title: "Password reset link sent",
      description: "The client will receive an email with instructions",
    })
    setResetPasswordDialogOpen(false)
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deleted",
      description: "The client's portal access has been removed",
    })
    setDeleteAccountDialogOpen(false)
  }

  const handleToggleAccess = (permission: string, enabled: boolean) => {
    toast({
      title: `${permission} access ${enabled ? "enabled" : "disabled"}`,
      description: `The client's access to ${permission} has been updated`,
    })
  }

  const handleResendInvite = () => {
    toast({
      title: "Invitation resent",
      description: "A new invitation has been sent to the client",
    })
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin/client-access">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold md:text-2xl">Manage Client Access</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleResendInvite}>
              <Mail className="mr-2 h-4 w-4" />
              Resend Invite
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Message Client
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Client portal access details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                    <AvatarFallback className="text-2xl">{client.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                  <Badge
                    variant={
                      client.status === "Active" ? "default" : client.status === "Pending" ? "secondary" : "outline"
                    }
                  >
                    {client.status}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Registered</span>
                    <span className="text-sm">{client.registeredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Login</span>
                    <span className="text-sm">{client.lastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Phone</span>
                    <span className="text-sm">{client.phone}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Access Control</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="galleries-access" className="font-normal">
                        Galleries Access
                      </Label>
                      <Switch
                        id="galleries-access"
                        checked={client.accessPermissions.galleries}
                        onCheckedChange={(checked) => handleToggleAccess("galleries", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="contracts-access" className="font-normal">
                        Contracts Access
                      </Label>
                      <Switch
                        id="contracts-access"
                        checked={client.accessPermissions.contracts}
                        onCheckedChange={(checked) => handleToggleAccess("contracts", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="download-access" className="font-normal">
                        Download Access
                      </Label>
                      <Switch
                        id="download-access"
                        checked={client.accessPermissions.downloads}
                        onCheckedChange={(checked) => handleToggleAccess("downloads", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Reset Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset Client Password</DialogTitle>
                      <DialogDescription>
                        This will send a password reset link to the client's email address.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">Are you sure you want to reset the password for:</p>
                      <p className="mt-2 font-medium">
                        {client.name} ({client.email})
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setResetPasswordDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleResetPassword}>Send Reset Link</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Access
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Client Portal Access</DialogTitle>
                      <DialogDescription>
                        This will permanently remove the client's access to the portal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete portal access for:
                      </p>
                      <p className="mt-2 font-medium">
                        {client.name} ({client.email})
                      </p>
                      <p className="mt-4 text-sm text-destructive">
                        This action cannot be undone. The client will lose access to all galleries and contracts.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteAccountDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        Delete Access
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="activity" className="space-y-6">
              <TabsList>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Activity</CardTitle>
                    <CardDescription>Recent client actions in the portal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {client.activityLog.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <UserCog className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.date} at {activity.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Full Activity Log
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Portal Settings</CardTitle>
                    <CardDescription>Customize the client's portal experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="access-link">Client Access Link</Label>
                      <div className="flex gap-2">
                        <Input
                          id="access-link"
                          readOnly
                          value="https://photopro.com/client-portal/access/sarah-johnson"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Link copied",
                              description: "Client access link copied to clipboard",
                            })
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Share this link with your client to access their portal
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="welcome-message">Welcome Message</Label>
                      <Input
                        id="welcome-message"
                        defaultValue="Welcome to your photo gallery! Here you can view and download your photos."
                      />
                      <p className="text-xs text-muted-foreground">
                        This message will be displayed on the client's dashboard
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Notification Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-notifications" className="font-normal">
                            Login Notifications
                          </Label>
                          <Switch id="login-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="download-notifications" className="font-normal">
                            Download Notifications
                          </Label>
                          <Switch id="download-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="contract-notifications" className="font-normal">
                            Contract Signing Notifications
                          </Label>
                          <Switch id="contract-notifications" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Client portal settings have been updated",
                        })
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Save Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
