import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

import BookingRequestList from "@/components/Dashboard/booking/BookingRequestList"
import { getBookingRequest } from "../actions"
import TimeCounter from "@/components/common/TimeCounter"

export const metadata = {
  title: "Booking Request",
  description: "Manage your Booking Request",
}
export default async function BookingRequestPage() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const bookingRequest = await getBookingRequest(token)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Booking Request"
        text="Manage your booking request"
      ></DashboardHeader>
      <div className="grid gap-8">
        <BookingRequestList bookingRequestData={bookingRequest.data} />
      </div>
    </DashboardShell>
  )
}
