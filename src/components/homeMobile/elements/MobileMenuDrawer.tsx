import { headerItems } from "@/components/common/main-nav"
import { ModeToggle } from "@/components/common/mode-toggle"
import { UserAvatar } from "@/components/common/user-avatar"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { dashboardConfig } from "@/config/dashboard"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slice/user_slice"
import { cn, hostedImage } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import React from "react"

const MobileMenuDrawer = () => {
  const { data: user } = useAppSelector((state) => state.user)
  const path = usePathname()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logout())
    router.refresh()
  }
  return (
    <div className="mt-4 border-t p-4">
      <div className="relative mt-2">
        <UserAvatar
          user={{ name: user?.username || null, image: user?.photo || null }}
          className={cn("mx-auto h-28 w-28 object-cover")}
        />
        {!user ? (
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                " px-12 shadow-xl dark:bg-primary"
              )}
            >
              Register
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "bg-white px-12 text-black dark:bg-white dark:text-black"
              )}
            >
              Sing in
            </Link>
          </div>
        ) : (
          <h1 className="mt-4 text-center text-xl font-bold capitalize">
            {user?.first_name + " " + user?.last_name + " " + user?.username}
          </h1>
        )}
        <div className="absolute right-0 top-0">
          <ModeToggle className="h-8 w-10 bg-transparent text-black shadow-none" />
        </div>
      </div>
      <div className="mt-4">
        <Separator className="mb-6 dark:invisible" />
        <p className="mb-1 ms-2 text-start text-sm text-destructive">
          Travel Options
        </p>
        {headerItems.map((item, index) => {
          return (
            item.href && (
              <Link key={index} href={item.href}>
                <div
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2  text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    path === item.href ? "bg-accent" : "transparent"
                  )}
                >
                  <p>{item.icon}</p>
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          )
        })}
      </div>
      {user && (
        <div className="mt-1">
          <Separator className="mb-3 dark:invisible" />
          <p className="ms-2 text-start text-sm text-destructive">
            Dashboard Options
          </p>
          {dashboardConfig.sidebarNav.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"]
            return (
              item.href && (
                <Link key={index} href={item.disabled ? "" : item.href}>
                  <span
                    className={cn(
                      "group flex w-full cursor-pointer items-center rounded-md px-2 py-2  text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      path === item.href ? "bg-accent" : "transparent",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </span>
                </Link>
              )
            )
          })}
        </div>
      )}
      <Separator className="mb-3 dark:invisible" />

      <div className="flex flex-col gap-1 text-center ">
        <Link href={"/terms"} className="text-xs">
          Terms of Service
        </Link>
        <Link href={"/privacy"} className="text-xs">
          Privacy Policy
        </Link>
      </div>

      {user && (
        <button
          onClick={(event) => {
            event.preventDefault()
            handleLogout()
          }}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            " mt-4 w-full bg-red-400 px-12 text-center shadow-xl "
          )}
        >
          Sign out
        </button>
      )}
    </div>
  )
}

export default MobileMenuDrawer
