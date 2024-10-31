import { DashboardNav } from "@/components/Dashboard/common/nav"
import  MainNav  from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import { dashboardConfig } from "@/config/dashboard"
import { getCookies } from "@/lib/token/getCookies"
import { notFound, redirect } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }
  return (
    <div className="flex min-h-screen flex-col space-y-6 bg-secondaryBg">
      <header
        className="relative w-full pb-10"
        style={{
          backgroundImage: "linear-gradient(-45deg,#DC143C,#DC143C)",
        }}
      >
        <div className="hidden h-16 space-x-4 px-6 sm:justify-between  sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
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
        <main className="flex w-full flex-1 flex-col overflow-auto">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
