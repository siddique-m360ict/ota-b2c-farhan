import { OTPForm } from "@/components/authentication/forgot-password/OtpForm"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React, { Suspense } from "react"

const page = ({ params, searchParams }) => {
  return (
    <div>
      <Suspense fallback={<>Loading.......</>}>
        <OTP searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
const OTP = async (props: any) => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/login"
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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Enter the OTP
          </h1>
        </div>
        <OTPForm searchParams={props?.searchParams} />
      </div>
    </div>
  )
}

export default page
