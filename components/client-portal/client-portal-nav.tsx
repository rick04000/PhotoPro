"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Camera, FileText, Folder, Home, LogOut, Menu, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/client-portal",
    icon: Home,
  },
  {
    title: "Galleries",
    href: "/client-portal/galleries",
    icon: Folder,
  },
  {
    title: "Contracts",
    href: "/client-portal/contracts",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/client-portal/profile",
    icon: User,
  },
]

export function ClientPortalNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b py-4">
                  <Camera className="h-5 w-5" />
                  <span className="font-semibold">PhotoPro Client</span>
                </div>
                <nav className="flex-1 overflow-auto py-4">
                  <ul className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Button
                          asChild
                          variant="ghost"
                          className={cn("w-full justify-start", pathname === item.href && "bg-muted font-medium")}
                          onClick={() => setOpen(false)}
                        >
                          <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t py-4">
                  <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/client-portal" className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            <span className="font-semibold">PhotoPro Client</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Sarah Johnson" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
