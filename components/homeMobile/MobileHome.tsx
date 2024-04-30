"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Icons } from "../icons"
import HomeMobileHeader from "./elements/HomeMobileHeader"

const MobileHome = () => {
  const mainItems = [
    {
      id: "Hotels",
      label: "Hotels",
      icon: "/images/home/mobile/5.png",
      href: "/d",
    },
    {
      id: "Flights",
      label: "Flights",
      icon: "/images/home/mobile/6.png",
      href: "/flights",
    },

    {
      id: "Trains",
      label: "Trains",
      icon: "/images/home/mobile/7.png",
      href: "/d",
    },
    {
      id: "Cars",
      label: "Car Rentals",
      icon: "/images/home/mobile/8.png",
      href: "/d",
    },
  ]

  const subItems = [
    {
      id: "AirTransport",
      label: "Airport Transfers",
      icon: "/images/home/mobile/1.png",
      href: "/d",
    },
    {
      id: "Attractions & Tours",
      label: "Attractions & Tours",
      icon: "/images/home/mobile/2.png",
      href: "/d",
    },
    {
      id: "Destinations",
      label: "Destinations",
      icon: "/images/home/mobile/3.webp",
      href: "/d",
    },
    {
      id: "Visa",
      label: "Visa",
      icon: "/images/home/mobile/4.png",
      href: "/d",
    },
  ]
  return (
    <div className="h-full bg-secondaryBg">
      <HomeMobileHeader home={true} />
      <section className="px-6">
        <div className="w-full pt-4 ">
          {mainItems?.length ? (
            <div className="flex justify-between">
              {mainItems?.map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="size-[56px] rounded-full text-[#EAEEFF]"
                      style={{
                        background: "linear-gradient(-180deg,#1e54f9,#517bff)",
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
            {subItems?.map((item, index) => (
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
      <section className="mt-10 px-3">
        <div className="h-full w-full">
          <Image
            src="/images/home/mobile/promo.webp"
            width={390}
            alt=""
            height={390}
          />
        </div>
      </section>
    </div>
  )
}

export default MobileHome
