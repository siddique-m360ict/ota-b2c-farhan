"use client"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { sendOTP } from "@/lib/server/auth/ForgotPasswordEndpoint"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const ForgotForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const forgotSchema = z.object({
    email: z.string().email(),
  })
  type FormData = z.infer<typeof forgotSchema>
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(forgotSchema),
  })
  const router = useRouter()

  const [isPending, seTransition] = useTransition()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    try {
      const res = await sendOTP(data.email)
      if (!res.success) {
        setIsLoading(false)
        return toast({
          title: res.message,
          description: "Your OTP in request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title:
            "OTP successfully sent to your email. Please check inbox or spam",
        })
        seTransition(() =>
          router.push(`/forgot-password/otp?email=${res.data?.email}`)
        )
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <Card>
        <CardHeader className="px-0 py-4">
          <div className="mb-2 flex items-center gap-3 px-4">
            <Icons.logo className="h-6 w-6" />
            <h1 className=" text-xl font-semibold tracking-tight">
              Find Your Account
            </h1>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please enter your email address to search for your account.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
              autoFocus
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3 pb-2  ">
              <Link
                href={"/login"}
                className={cn(
                  "rounded-full",
                  buttonVariants({ variant: "destructive", size: "sm" })
                )}
              >
                Cancel
              </Link>
              <button
                className={cn(
                  "rounded-full",
                  buttonVariants({ variant: "default", size: "sm" })
                )}
                disabled={isLoading}
              >
                {isPending ||
                  (isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ))}
                Search
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotForm
