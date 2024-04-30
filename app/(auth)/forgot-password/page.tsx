import ForgotForm from "@/components/authentication/forgot-password/ForgotForm"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

const page = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/signin"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back to login
        </>
      </Link>
      <ForgotForm />
    </div>
  )
}

export default page
