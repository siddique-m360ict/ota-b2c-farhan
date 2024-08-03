import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

import BookingList from "@/components/Dashboard/booking/BookingList"
import { getBookingList } from "../actions"
import TimeCounter from "@/components/common/TimeCounter"

export const metadata = {
  title: "Booking List",
  description: "Manage your Booking List",
}
export default async function BookingListPage() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const bookingRequest = await getBookingList(token)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Booking List"
        text="Manage your booking list"
      ></DashboardHeader>
      <div className="grid gap-8">
        <BookingList bookingRequestData={bookingRequest.data} />
      </div>
    </DashboardShell>
  )
}
