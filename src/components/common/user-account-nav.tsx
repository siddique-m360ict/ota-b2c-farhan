"use client"
import Link from "next/link"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./user-avatar"
import { UserType } from "@/types"
import { LoginResData } from "@/lib/server/auth/PostLoginEndpoints"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slice/user_slice"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { dashboardConfig } from "@/config/dashboard"
import { Icons } from "../icons"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function UserAccountNav({ className }: UserAccountNavProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const data = useAppSelector((state) => state.user)
  const user = data?.data
  const path = usePathname()

  const handleLogout = () => {
    dispatch(logout())
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.username || null, image: user?.photo || null }}
          className={cn("h-10 w-10 ", className)}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.username && <p className="font-medium">{user.username}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />

        {dashboardConfig.sidebarNav.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"]
          return (
            item.href && (
              <DropdownMenuItem asChild className="p-0">
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
              </DropdownMenuItem>
            )
          )
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            handleLogout()
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
