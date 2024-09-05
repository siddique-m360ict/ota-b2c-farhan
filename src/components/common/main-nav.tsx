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
import Image from "next/image"
import WarningOTP from "./WarningOTP"

interface MainNavProps {
  home?: boolean
  className?: string
  logoMain?: boolean
}

export const headerItems = [
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
export function MainNav({ home, className, logoMain }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const user = useAppSelector((state) => state.user)
  const isLogin = getCookies().b_token
  const isEmailVerified = user?.data?.is_verified

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
          {/* <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span> */}
          <Image
            src={logoMain ? "/be.png" : "/be-removebg.png"}
            alt="site logo"
            width={200}
            height={100}
          />
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
                      : className
                      ? className
                      : "text-white"
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
        <div className="flex items-center gap-6">
          {!user.data.is_verified && <WarningOTP />}
          <ModeToggle />
          <UserAccountNav />
        </div>
      ) : (
        <nav className="flex gap-3">
          <ModeToggle />
          <Link
            href="/register"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              " px-4 shadow-xl dark:bg-primary"
            )}
          >
            Register
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "bg-white px-4 text-black dark:bg-white dark:text-black"
            )}
          >
            Sign in
          </Link>
        </nav>
      )}
    </div>
  )
}
