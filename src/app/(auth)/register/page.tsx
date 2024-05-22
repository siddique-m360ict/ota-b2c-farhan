import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import UserRegisterForm from "@/components/authentication/UserRegisterForm"

export const metadata = {
  title: "Create an Account - Sign Up to Booking Expert | Booking Expert",
  description:
    "Create an account with Booking Expert to get started. Join our platform, access exclusive deals, and enjoy a seamless registration experience.",
  keywords: [
    "signup",
    "sign up",
    "create account",
    "register",
    "registration",
    "Booking Expert",
    "user registration",
    "user signup",
    "sign up page",
    "registration page",
    "create account page",
    "booking expert world signup",
    "bookingexpert.world register",
  ],
  openGraph: {
    title: "Create an Account - Sign Up to Booking Expert | Booking Expert",
    description:
      "Create an account with Booking Expert to get started. Join our platform, access exclusive deals, and enjoy a seamless registration experience.",
    type: "website",
    url: "https://www.bookingexpert.world/register",
    images: [
      {
        url: "/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Sign Up to Booking Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Create an Account - Sign Up to Booking Expert | Booking Expert",
    description:
      "Create an account with Booking Expert to get started. Join our platform, access exclusive deals, and enjoy a seamless registration experience.",
    images: ["/og-image.PNG"],
  },
}

export default function SignUpPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 text-white md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Home
        </>
      </Link>
      <div
        className="hidden h-full bg-muted lg:block"
        style={{
          backgroundImage: "url(/images/bg/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="mb-[15vh] text-center">
            <h1 className="font-heading text-[40px] font-bold text-white">
              WELCOME TO BOOKING EXPERT
            </h1>
            <p className="text-white">
              Booking Expert is part of M360ICT <br />
              One of the worlds leading providers of travel services.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your info below to create your account
            </p>
          </div>
          <UserRegisterForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
