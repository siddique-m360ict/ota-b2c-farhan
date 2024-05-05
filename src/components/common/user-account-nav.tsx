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
import { useAppDispatch } from "@/lib/redux/hooks"
import { logout } from "@/lib/redux/slice/user_slice"
import { useRouter } from "next/navigation"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: LoginResData | undefined
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logout())
    router.replace(`${window.location.origin}/login`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user?.username || null, image: user?.photo || null }}
          className="h-9 w-9 "
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
        <DropdownMenuItem asChild disabled>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild disabled>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
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
