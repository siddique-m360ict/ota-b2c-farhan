"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { MobileNav } from "./mobile-nav"
import { UserAccountNav } from "./user-account-nav"
import { buttonVariants } from "../ui/button"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCookies } from "cookies-next"
import { ModeToggle } from "./mode-toggle"

interface MainNavProps {
  home?: boolean
}

export function MainNav({ home }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const user = useAppSelector((state) => state.user)
  const isLogin = getCookies().b_token
  const isEmailVerified = user?.data?.is_verified

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
      href: "/stream?origin=DAC&destination=CXB&departuredate=2024-05-21&adults=1&class=Y&route=oneway",
    },
    {
      id: "Visa",
      label: "Visa",
      icon: <Icons.Bundle className="size-[22px]" />,
      href: "/",
    },
  ]

  return (
    <div className="z-50 flex w-full items-center justify-between">
      <div
        className={cn(
          "",
          home !== true ? "flex flex-row items-start gap-12" : ""
        )}
      >
        <Link
          href="/"
          className={cn(
            " hidden items-center space-x-2 text-[1.2vw] text-white md:flex"
          )}
        >
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>

        <div
          className={cn("translate-y-3", home !== true ? "translate-y-2" : "")}
        >
          {headerItems?.length ? (
            <nav className={cn("hidden gap-10  md:flex", !home && "gap-11")}>
              {headerItems?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "font-Default flex items-center text-[15px] transition-colors hover:text-foreground/80",
                    item.href.startsWith(`/${segment}`)
                      ? "text-[#ff0000]"
                      : "text-deep"
                  )}
                >
                  <span className="me-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>

      {isLogin && user?.success ? (
        <UserAccountNav user={user?.data} />
      ) : (
        <nav className="flex gap-3">
          <ModeToggle />
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              " px-4 "
            )}
          >
            Register
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "bg-white px-4 text-black"
            )}
          >
            Sing in
          </Link>
        </nav>
      )}
    </div>
  )
}
