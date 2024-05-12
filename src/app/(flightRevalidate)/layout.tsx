import { redirect } from "next/navigation"
import { getCookies } from "@/lib/token/getCookies"
import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"

interface FlightLayoutProps {
  children: React.ReactNode
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  // const token = await getCookies()
  // if (!token) {
  //   redirect("/login")
  // }

  return (
    <div className="flex flex-col">
      <header
        className="relative w-full pb-10"
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
          className="absolute bottom-[-11px] z-0  h-10 w-full bg-secondaryBg"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>

      <div className="mt-2 flex-1 bg-secondaryBg">{children}</div>
      <SiteFooter />
    </div>
  )
}
