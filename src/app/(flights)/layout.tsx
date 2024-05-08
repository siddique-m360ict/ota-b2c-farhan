import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import FlightSearch from "@/components/home/FlightSearch"
import Image from "next/image"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"

interface FlightLayoutProps {
  children: React.ReactNode
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col  ">
      <header className="relative w-full pb-20  ">
        <div className="bg-wrapper absolute left-0 top-0 z-0  h-full w-full">
          <Image
            src={"/images/home/flight_home_bg.webp"}
            alt="home-image"
            fill
            className="object-contain object-left-top md:object-cover"
          />
          <div
            className="absolute top-[31.5%] block h-[48px] w-full md:hidden"
            style={{ background: "linear-gradient(hsla(0,0%,100%,0),#f0f2f5)" }}
          ></div>
        </div>
        <div className="z-50 hidden h-16  space-x-4 px-6 sm:justify-between sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-10 w-full bg-background"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
        <section className="modify relative pt-4">
          <div className="z-50 mt-10  rounded-3xl px-2 md:container md:px-0">
            <h1 className="mb-3 hidden text-[2vw] font-bold  text-white  md:block">
              Find cheap flight deals
            </h1>
            <div className="mt-[-40px] md:mt-0">
              <FlightSearch className="py-4" />
            </div>
          </div>
        </section>
      </header>

      <div className="container mt-2 flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
