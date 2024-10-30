"use client"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { toast } from "@/components/ui/use-toast"
import { changePassword } from "@/lib/server/auth/ForgotPasswordEndpoint"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const VerifyForm = ({ searchParams }) => {
  const [isLoading, setIsLoading] = useState(false)
  const forgotSchema = z.object({
    password: z.string().min(6),
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
      const res = await changePassword(
        searchParams?.email,
        searchParams.token,
        data.password
      )
      if (!res.success) {
        setIsLoading(false)
        return toast({
          title: res.message,
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title: "Your password has been successfully changed.",
        })
        seTransition(() => router.push(`/login`))
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="sr-only" htmlFor="email">
            Provide New Password
          </Label>
          <PasswordInput
            autoFocus
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}

          <div className="mt-6 flex justify-end gap-2 pb-2  ">
            <Link
              href={"/login"}
              className={cn(
                "rounded",
                buttonVariants({ variant: "destructive", size: "sm" })
              )}
            >
              Cancel
            </Link>
            <button
              className={cn(
                "rounded",
                buttonVariants({ variant: "default", size: "sm" })
              )}
              disabled={isLoading}
            >
              {isPending ||
                (isLoading && (
                  <Icons.spinner className="mr-2 size-4 animate-spin" />
                ))}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyForm
