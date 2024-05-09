"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/use-toast"
import { cn, serverUrl } from "@/lib/utils"
import { useState, useTransition } from "react"
import { matchOTP } from "@/lib/server/auth/ForgotPasswordEndpoint"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function OTPForm({ searchParams }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, seTransition] = useTransition()
  const router = useRouter()

  // submit
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const res = await matchOTP(searchParams?.email, data.pin)
      if (!res.success) {
        setIsLoading(false)
        return toast({
          title: res.message,
          description: "OTP match request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title: res.message,
        })
        seTransition(() =>
          router.push(
            `/forgot-password/verify?email=${searchParams.email}&token=${res.token}`
          )
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
    <div className="mx-auto text-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="rounded bg-secondaryBg">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            className={cn(
              "w-full rounded-full",
              buttonVariants({ variant: "default", size: "sm" })
            )}
            type="submit"
          >
            {isPending ||
              (isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ))}
            Search
          </button>
        </form>
      </Form>
    </div>
  )
}
