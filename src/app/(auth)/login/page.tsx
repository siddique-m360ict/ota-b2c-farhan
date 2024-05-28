import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserAuthForm } from "@/components/authentication/user-auth-form"
import LoginForm from "@/components/authentication/LoginForm"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Login - Secure Sign In to Your Account | Booking Expert",
  description:
    "Login to your Booking Expert account securely. Access your bookings, manage your profile, and enjoy a seamless sign-in experience.",
  keywords: [
    "login",
    "sign in",
    "secure login",
    "account login",
    "user login",
    "Booking Expert",
    "secure sign in",
    "login page",
    "user authentication",
    "sign in page",
    "booking expert world login",
    "bookingexpert.world login",
  ],
  openGraph: {
    title: "Login - Secure Sign In to Your Account | Booking Expert",
    description:
      "Login to your Booking Expert account securely. Access your bookings, manage your profile, and enjoy a seamless sign-in experience.",
    type: "website",
    url: "https://www.bookingexpert.world/login",
    images: [
      {
        url: "/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Secure Sign In to Your Account",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Login - Secure Sign In to Your Account | Booking Expert",
    description:
      "Login to your Booking Expert account securely. Access your bookings, manage your profile, and enjoy a seamless sign-in experience.",
    images: ["/og-image.PNG"],
  },
}

export default function SigninPage() {
  return (
    <div
      className="z-50 flex h-screen w-screen flex-col items-center justify-center px-4 md:px-0"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #0034d5, transparent), url(/images/bg/e-bg.webp)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 border border-[#9cade2] text-white md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>

      <Card className="mx-auto flex w-full flex-col justify-center space-y-6 pt-6 sm:w-[350px]">
        <CardContent>
          <div className="mb-4 flex flex-col space-y-2 text-center">
            <Image
              src={"/app-icon.png"}
              alt=""
              width={40}
              height={40}
              className="mx-auto"
            />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <LoginForm />
          <p className="mt-6 px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand  underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
