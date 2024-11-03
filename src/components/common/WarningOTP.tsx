import { cn } from "@/lib/utils"
import React, { useState, useTransition } from "react"
import { buttonVariants } from "../ui/button"
import { Icons } from "../icons"
import { useAppSelector } from "@/lib/redux/hooks"
import { sendOTP } from "@/lib/server/auth/ForgotPasswordEndpoint"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

const WarningOTP = () => {
  const [loading, setLoading] = useState(false)
  const user = useAppSelector((state) => state.user)
  const [isPending, setTransition] = useTransition()
  const router = useRouter()
  const handleSendOTP = async () => {
    try {
      setLoading(true)
      const res = await sendOTP(user?.data?.email as string, "verify_user")
      if (!res.success) {
        setLoading(false)
        return toast({
          title: res.message,
          description: "Your Verify request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
        })
      } else {
        toast({
          title:
            "OTP successfully sent to your email. Please check inbox or spam",
        })
        setTransition(() =>
          router.push(`/verify-user?email=${res.data?.email}`)
        )
      }
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleSendOTP}
        className={cn(
          buttonVariants({ variant: "danger", size: "sm" }),
          "bg-red-600 px-4 shadow-xl dark:bg-gray-900 dark:text-gray-100 "
        )}
      >
        {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
        Verify Email
      </button>
    </>
  )
}

export default WarningOTP
