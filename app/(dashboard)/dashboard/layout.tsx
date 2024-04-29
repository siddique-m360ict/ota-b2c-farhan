import { notFound } from "next/navigation"

import { dashboardConfig } from "@/config/dashboard"
import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { UserAccountNav } from "@/components/user-account-nav"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  // const user = await getCurrentUser()

  // if (!user) {
  //   return notFound()
  // }

  return (
    <div className="flex min-h-screen flex-col space-y-6 bg-secondaryBg">
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

      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
