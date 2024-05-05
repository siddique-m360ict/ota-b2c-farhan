import Link from "next/link"
import { siteConfig } from "@/config/site"
import { cn, serverUrl } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { headerConfig } from "@/config/header"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { UserAccountNav } from "@/components/user-account-nav"
import Image from "next/image"
import ToggleGroup from "@/components/ui/toggleGroup"
import HomeSearch from "@/components/home/HomeSearch"
import MobileHome from "@/components/homeMobile/MobileHome"
import FlightListCard from "@/components/flight-search/FlightListCard"
import FlightListView from "@/components/flight-search/FlightListView"

export default async function IndexPage() {
  return (
    <>
      <div
        className="hidden bg-center bg-no-repeat sm:bg-cover  md:block"
        style={{
          backgroundImage: `url(/images/bg/bg.webp)`,
          backgroundPositionY: "-180px",
          backgroundSize: "cover",
        }}
      >
        <div>
          <header className="container z-40">
            <div className="flex h-[8vh] justify-between pt-5 ">
              <MainNav home={true} />
            </div>
          </header>
          <section className="space-y-6 pb-8 pt-6  md:pb-12 md:pt-10 lg:pb-7 lg:pt-24 ">
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
              <h2 className="leading-2 mb-1 font-roboto  text-3xl font-bold tracking-wide	  text-white sm:text-5xl md:text-6xl lg:text-[35px]">
                Your Trip Starts Here 12
              </h2>
              <div className="flex gap-6">
                <div className="box relative flex gap-2 text-[14px] font-[400] text-white">
                  <Image
                    src={"/images/home/secured.webp"}
                    alt={"secured image"}
                    width={20}
                    height={20}
                  />
                  <p className="relative">
                    Secure Payment
                    <span
                      className="absolute bottom-0 left-0"
                      style={{
                        border: "none",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4) 2px, transparent 0px, transparent 4px, rgba(255, 255, 255, 0.4) 0px)",
                        height: "1px",
                        width: "100%",
                      }}
                    ></span>
                  </p>
                </div>
                <div className=" mt-[5px] h-[12px] w-[2px]  border-l border-gray-300"></div>
                <div className="box relative flex gap-2 text-[14px] font-[400] text-white">
                  <Image
                    src={"/images/home/love.webp"}
                    alt={"secured image"}
                    width={20}
                    height={20}
                  />
                  <p className=" relative">
                    Support in Approx. 30s
                    <span
                      className="absolute bottom-[-3px] left-0"
                      style={{
                        border: "none",
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4) 2px, transparent 0px, transparent 4px, rgba(255, 255, 255, 0.4) 0px)",
                        height: "1px",
                        width: "100%",
                      }}
                    ></span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-8  md:pb-12  lg:pb-20">
            <div className="container">
              <HomeSearch />
            </div>
          </section>
        </div>
      </div>

      <div className="block md:hidden">
        <MobileHome />
      </div>
    </>
  )
}
