"use client"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import React from "react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { ModeToggle } from "@/components/common/mode-toggle"

import { UserAccountNav } from "@/components/common/user-account-nav"
import { getCookie, getCookies } from "cookies-next"
import MobileMenuDrawer from "./MobileMenuDrawer"

type Props = {
  home?: boolean
}
const HomeMobileHeader = ({ home }: Props) => {
  const [open, setOpen] = React.useState(false)
  const segment = useSelectedLayoutSegment()
  const isLogin = getCookie("b_token")
  const pathName = usePathname()
  const flightSearchPage = pathName === "/flightsearch"

  const headerItems = [
    {
      id: "Hotels",
      label: "Hotels",
      icon: <Icons.Home className="size-[22px]" />,
      href: "/",
    },
    {
      id: "Flights",
      label: "Flights",
      icon: <Icons.Plane size={20} />,
      href: "/flights",
    },
    {
      id: "Visa",
      label: "Visa",
      icon: <Icons.Bundle className="size-[22px]" />,
      href: "/visa",
    },
    {
      id: "Trains",
      label: "Trains",
      icon: <Icons.TramFront />,
      href: "/",
    },
    {
      id: "Cars",
      label: "Cars",
      icon: <Icons.CarFront className="size-[20px]" />,
      href: "/",
    },
    {
      id: "Attractions & Tours",
      label: "Attractions & Tours",
      icon: <Icons.Attractions className="size-[20px]" />,
      href: "/",
    },
  ]

  return (
    <header className="px-4 py-3">
      <div className="flex items-center justify-between ">
        <Link href={"/"} className="z-50">
          <p
            className={cn(
              " font-roboto text-[18px] font-bold text-primary",
              home ? "text-primary" : "text-white",
              flightSearchPage && "text-white"
            )}
          >
            Booking
            <span className="font-bold text-yellow-500">.</span>
            Expert
          </p>
        </Link>
        <div className="z-50 flex justify-between gap-5">
          {/* <ModeToggle /> */}
          {!isLogin ? (
            <p className={cn("", !home || (flightSearchPage && "text-white"))}>
              <Link href={"/login"}>
                <Icons.User size={22} />
              </Link>
            </p>
          ) : (
            <div>
              <UserAccountNav className="size-6" />
            </div>
          )}

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <p
                className={cn("", !home || (flightSearchPage && "text-white"))}
              >
                <Icons.menu size={22} />
              </p>
            </DrawerTrigger>
            <DrawerContent>
              <MobileMenuDrawer />
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {!home && (
        <div
          className={cn(
            "overflow-hidden whitespace-nowrap pb-2 md:overflow-auto md:whitespace-normal"
          )}
        >
          <div
            className={cn(
              "translate-y-3 overflow-y-hidden overflow-x-scroll md:overflow-auto"
            )}
          >
            <nav className={cn(" flex  gap-6 ")}>
              {headerItems?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "font-Default flex items-center text-[15px] transition-colors hover:text-foreground/80",
                    item.href.startsWith(`/${segment}`)
                      ? "mb-1 border-b-2 pb-0 font-bold text-white dark:border-white"
                      : "text-deep"
                  )}
                >
                  <span className="me-2 hidden md:block">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default HomeMobileHeader
