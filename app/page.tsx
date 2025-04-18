"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingGigs } from "@/components/upcoming-gigs"
import { RecentClients } from "@/components/recent-clients"
import { RevenueChart } from "@/components/revenue-chart"
import { StatsCards } from "@/components/stats-cards"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardPage() {
  const router = useRouter()

  const handleNewGig = () => {
    router.push("/gigs/create")
  }

  return (
    <div>
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleNewGig}>New Gig</Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Gigs</TabsTrigger>
            <TabsTrigger value="clients">Recent Clients</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsCards />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Gigs</CardTitle>
                  <CardDescription>Your scheduled photography sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingGigs />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/gigs">View All Gigs</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Clients</CardTitle>
                  <CardDescription>Your latest client interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentClients />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/clients">View All Clients</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Pending Deliveries</CardTitle>
                  <CardDescription>Photo galleries awaiting delivery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Johnson Wedding</p>
                        <p className="text-sm text-muted-foreground">Due in 3 days</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => router.push("/galleries/1")}>
                        Deliver
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Smith Family Portrait</p>
                        <p className="text-sm text-muted-foreground">Due in 5 days</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => router.push("/galleries/2")}>
                        Deliver
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Corporate Event - Acme Inc</p>
                        <p className="text-sm text-muted-foreground">Due tomorrow</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => router.push("/galleries/3")}>
                        Deliver
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/galleries">View All Galleries</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Your financial performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/invoices">View All Invoices</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Gigs</CardTitle>
                <CardDescription>All your scheduled photography sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <UpcomingGigs extended />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleNewGig}>
                  Schedule New Gig
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Recent Clients</CardTitle>
                <CardDescription>All your recent client interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RecentClients extended />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => router.push("/clients/create")}>
                  Add New Client
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed financial performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[650px]">
                <RevenueChart extended />
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => router.push("/invoices/create")}>
                  Create New Invoice
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
