"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Camera, CreditCard, FileText, Folder, Home, ImageIcon, Settings, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function MainSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2 font-semibold">
          <Camera className="h-6 w-6" />
          <span className="text-xl">PhotoPro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          <p>PhotoPro v1.0.0</p>
          <p>© 2025 PhotoPro Inc.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
