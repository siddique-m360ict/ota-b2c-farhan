"use client"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import React from "react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import { ModeToggle } from "@/components/common/mode-toggle"

type Props = {
  home?: boolean
}
const HomeMobileHeader = ({ home }: Props) => {
  const [open, setOpen] = React.useState(false)
  const segment = useSelectedLayoutSegment()

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
    {
      id: "Visa",
      label: "Visa",
      icon: <Icons.Bundle className="size-[22px]" />,
      href: "/",
    },
  ]

  return (
    <header className=" px-4 py-3">
      <div className="flex items-center justify-between ">
        <Link href={"/"} className="z-50">
          <p
            className={cn(
              " font-roboto text-[18px] font-bold text-primary",
              !home && "text-white"
            )}
          >
            Booking
            <span className="font-bold text-yellow-500">.</span>
            Expert
          </p>
        </Link>
        <div className="z-50 flex justify-between gap-5">
          {/* <ModeToggle /> */}
          <p className={cn("", !home && "text-white")}>
            <Link href={"/login"}>
              <Icons.User size={22} />
            </Link>
          </p>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <p className={cn("", !home && "text-white")}>
                <Icons.menu size={22} />
              </p>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mt-4 border-t p-4 text-center">
                More details about booking expert <br /> add coming soon
              </div>
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
                      ? "mb-1 border-b-2 pb-0 font-bold text-[#fff]"
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
