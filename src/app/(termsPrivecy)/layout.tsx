import FlightSearch from "@/components/home/FlightSearch"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface TermsLayoutProps {
  children: React.ReactNode
}

export default async function TermsLayout({ children }: TermsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col ">
      <header
        className="relative w-full pb-8 md:pb-48"
        style={{
          backgroundImage: "linear-gradient(-45deg,#06aebd,#06aebd)",
        }}
      >
        <div className=" hidden h-16 space-x-4 px-6 sm:justify-between  sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-8 w-full bg-background md:h-10"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>
      <div className="mt-2 flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
