import Link from "next/link"
import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { DocsSearch } from "@/components/search"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import { SiteFooter } from "@/components/site-footer"
import { getCurrentUser } from "@/lib/session"
import { UserAccountNav } from "@/components/user-account-nav"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import FlightSearch from "@/components/home/FlightSearch"
import { redirect } from "next/navigation"
import { getCookies } from "@/lib/token/getCookies"
import { NextResponse } from "next/server"

interface FlightLayoutProps {
  children: React.ReactNode
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col">
      <header
        className="relative w-full pb-10"
        style={{
          backgroundImage: "linear-gradient(-45deg,#1442cc,#3264ff)",
        }}
      >
        <div className=" flex h-16 space-x-4 px-6  sm:justify-between sm:space-x-0">
          <MainNav />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-10 w-full bg-secondaryBg"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>

      <div className="mt-2 flex-1 bg-secondaryBg">{children}</div>

      <SiteFooter className="border-t" />
    </div>
  )
}
