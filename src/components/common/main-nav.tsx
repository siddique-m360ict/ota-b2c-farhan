"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { CircleUserRound } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import WarningOTP from './WarningOTP'
import { useAppSelector } from "@/lib/redux/hooks"
import { getCookies } from "cookies-next"
import Image from "next/image"
import { UserAccountNav } from './user-account-nav';
import { ModeToggle } from './mode-toggle';

const MainNav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const segment = useSelectedLayoutSegment()
  const user = useAppSelector((state) => state.user)
  const isLogin = getCookies().b_token

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      label: "Home",
      href: "/",
      id: "dashboard",
    },
    {
      label: "Flights",
      href: "/flights",
      id: "flights",
    },
    {
      label: "Hotel",
      href: "/comingsoon",
      id: "trains",
    },
    {
      label: "Promo",
      href: "/comingsoon",
      id: "cars",
    },
    {
      label: "Orders",
      href: "/comingsoon",
      id: "activities",
    },
  ]

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-white">
            Farhan Travels
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-12">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 text-white transition-colors hover:text-gray-200 hover:underline
                      ${
                        item.href.startsWith(`/${segment}`)
                          ? "text-yellow-300"
                          : ""
                      }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {isLogin && user?.success ? (
            <div className="flex items-center gap-6">
              {!user.data.is_verified && <WarningOTP />}
              <ModeToggle />
              <UserAccountNav />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Link
                href="/login"
                className="flex items-center font-bold text-white hover:text-gray-200"
              >
                <CircleUserRound className="mr-2 size-4" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded bg-white/25 px-4 py-1.5 font-bold text-white transition-colors hover:bg-white/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainNav
