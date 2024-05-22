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
import { bookingRequestDetails } from "../../actions"
import BookingRequestDetails from "@/components/Dashboard/booking/BookingRequestDetails"
import CancelBooking from "@/components/Dashboard/booking/elements/CancelBooking"

export const metadata = {
  title: "Booking Request Details",
  description: "Manage your Booking Request Details",
}
export default async function BookingRequestViewPage({ params: { id } }) {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const bookingRequestDetailsData = await bookingRequestDetails(id, token)
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Booking Request View"
        text="Manage your booking Details"
      >
        {bookingRequestDetailsData?.data.status !== "Cancelled" && (
          <CancelBooking
            id={bookingRequestDetailsData?.data.id}
            token={token}
          />
        )}
      </DashboardHeader>
      <div className="grid gap-8">
        <BookingRequestDetails
          data={bookingRequestDetailsData?.data}
          token={token}
        />
      </div>
    </DashboardShell>
  )
}
