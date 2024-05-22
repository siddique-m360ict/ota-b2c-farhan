"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Icons } from "../icons"
import HomeMobileHeader from "./elements/HomeMobileHeader"
import { MobileCardCarousel } from "./elements/MobileCardCarousel"

const MobileHome = () => {
  const homeItems = {
    mainItems: [
      {
        id: "Hotels",
        label: "Hotels",
        icon: "/images/home/mobile/5.png",
        href: "/",
      },
      {
        id: "Flights",
        label: "Flights",
        icon: "/images/home/mobile/6.png",
        href: "/flights",
      },
      {
        id: "Visa",
        label: "Visa",
        icon: "/images/home/mobile/visa.svg",
        href: "/visa",
      },

      {
        id: "Cars",
        label: "Car Rentals",
        icon: "/images/home/mobile/8.png",
        href: "/",
      },
    ],
    subItems: [
      {
        id: "AirTransport",
        label: "Airport Transfers",
        icon: "/images/home/mobile/1.png",
        href: "/",
      },
      {
        id: "Attractions & Tours",
        label: "Attractions & Tours",
        icon: "/images/home/mobile/2.png",
        href: "/",
      },
      {
        id: "Destinations",
        label: "Destinations",
        icon: "/images/home/mobile/3.webp",
        href: "/",
      },
      {
        id: "Trains",
        label: "Trains",
        icon: "/images/home/mobile/7.png",
        href: "/",
      },
    ],
  }

  return (
    <>
      <div className="h-full bg-secondaryBg ">
        <HomeMobileHeader home={true} />
        <section className="px-6">
          <div className="w-full pt-4 ">
            {homeItems?.mainItems?.length ? (
              <div className="flex justify-between">
                {homeItems?.mainItems?.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="size-[56px] overflow-hidden rounded-full text-[#EAEEFF]"
                        style={{
                          background:
                            "linear-gradient(-180deg,#1e54f9,#517bff)",
                        }}
                      >
                        <Image
                          src={item.icon}
                          alt="home-image"
                          width={56}
                          height={56}
                        />
                      </div>
                      <p className="text-center text-xs"> {item.label}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="mt-4 grid grid-cols-4 gap-9">
              {homeItems?.subItems?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="">
                    <Image
                      src={item.icon}
                      alt="home-image"
                      width={32}
                      height={32}
                    />
                  </div>
                  <p className="text-center text-xs"> {item.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="relative z-50 mt-10">
          <MobileCardCarousel />
          <div className="absolute bottom-[0px]  z-0 h-8 w-full bg-background md:h-10 "></div>
        </section>
      </div>
    </>
  )
}

export default MobileHome
