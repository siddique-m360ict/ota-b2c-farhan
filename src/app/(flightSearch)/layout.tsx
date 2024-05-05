import FlightSearch from "@/components/home/FlightSearch"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import { MainNav } from '@/components/common/main-nav'
import { SiteFooter } from '@/components/common/site-footer'

interface FlightLayoutProps {
  children: React.ReactNode
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col ">
      <header
        className="relative w-full pb-20"
        style={{
          backgroundImage: "linear-gradient(-45deg,#1442cc,#3264ff)",
        }}
      >
        <div className=" hidden h-16 space-x-4 px-6 sm:justify-between  sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-10 w-full bg-background"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>
      <section className="modify relative hidden md:block">
        <div className="container z-50 mb-2 mt-[-75px] rounded-3xl">
          <FlightSearch />
        </div>
      </section>
      <div className="container mt-2 flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
