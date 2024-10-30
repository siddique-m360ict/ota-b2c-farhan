"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import {
  Bell,
  Home,
  Plane,
  Train,
  Car,
  Map,
  Sun,
  Moon,
  CircleUserRound,
} from "lucide-react"

const MainNav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const segment = useSelectedLayoutSegment()

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
      href: "/trains",
      id: "trains",
    },
    {
      label: "Promo",
      href: "/cars",
      id: "cars",
    },
    {
      label: "Orders",
      href: "/activities",
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
          <div className="flex gap-4 text-white">
            <Link href="/login" className="flex items-center font-bold hover:text-gray-200 ">
              <CircleUserRound className="mx-1 size-4" /> Sign In
            </Link>
            <Link
              href="/register"
              className="rounded bg-white/25 px-2 py-1 font-bold transition-colors hover:bg-white/30 "
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav
