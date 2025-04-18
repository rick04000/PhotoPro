import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClientPortalNav } from "@/components/client-portal/client-portal-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PhotoPro - Client Portal",
  description: "Access your photos and documents",
}

export default function ClientPortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ClientPortalNav />
      <main className="flex-1">{children}</main>
    </div>
  )
}
