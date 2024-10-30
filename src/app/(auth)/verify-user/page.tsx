import { OTPForm } from "@/components/authentication/forgot-password/OtpForm"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { Suspense } from "react"

const page = ({ params, searchParams }) => {
  return (
    <div>
      <Suspense fallback={<>Loading.......</>}>
        <Verify searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
const Verify = async (props: any) => {
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
          <Icons.chevronLeft className="mr-2 size-4" />
          Back to login
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Image
            src={"/app-icon.png"}
            alt=""
            width={40}
            height={40}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold tracking-tight">
            Enter the OTP
          </h1>
        </div>
        <OTPForm searchParams={props?.searchParams} type="verify_user" />
      </div>
    </div>
  )
}

export default page
