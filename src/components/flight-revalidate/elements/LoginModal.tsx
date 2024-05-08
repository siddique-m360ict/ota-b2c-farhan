"use client"
import { UserAuthForm } from "@/components/authentication/user-auth-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useState } from "react"

export default function LoginModal({ token }: { token: string }) {
  const [open, setOpen] = useState(!token)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-full bg-secondaryBg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Please Sign in</DialogTitle>
          <DialogDescription>
            You need to Sign in first to continue
          </DialogDescription>
        </DialogHeader>
        <UserAuthForm setOpenModal={setOpen} />
        <DialogFooter className="sm:justify-center">
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
