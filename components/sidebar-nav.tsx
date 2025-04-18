"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Camera, CreditCard, FileText, Folder, Home, ImageIcon, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define our navigation items with paths and icons
const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: Users,
  },
  {
    title: "Gigs",
    href: "/gigs",
    icon: Camera,
  },
  {
    title: "Photos",
    href: "/photos",
    icon: ImageIcon,
  },
  {
    title: "Galleries",
    href: "/galleries",
    icon: Folder,
  },
  {
    title: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: CreditCard,
  },
  {
    title: "Contracts",
    href: "/contracts",
    icon: FileText,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="w-64 flex-col border-r bg-muted/40 p-6 md:flex">
      <div className="flex items-center gap-2 font-semibold">
        <Camera className="h-6 w-6" />
        <span className="text-xl">PhotoPro</span>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn("w-full justify-start gap-2", pathname === item.href && "bg-muted")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
