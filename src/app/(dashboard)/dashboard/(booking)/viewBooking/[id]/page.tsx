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
import { bookingDetails } from "../../actions"
import BookingDetails from "@/components/Dashboard/booking/BookingDetails"
import CancelBooking from "@/components/Dashboard/booking/elements/CancelBooking"
import DownloadBookingPDF from "@/components/Dashboard/booking/elements/DownloadBookingPDF"
import DownloadTicketPDFButton from "@/components/Dashboard/booking/elements/ticketPDF"

export const metadata = {
  title: "Booking Request Details",
  description: "Manage your Booking Request Details",
}
export default async function BookingViewPage({ params: { id } }) {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const bookingDetailsData = await bookingDetails(id, token)
  return (
    <DashboardShell>
      <div className="hidden md:block">
        <DashboardHeader
          heading="Booking Details"
          text="Manage your booking Details"
        >
          <div className="flex items-center gap-2">
            <DownloadBookingPDF bookingData={bookingDetailsData?.data} />
            {bookingDetailsData?.data.ticket && (
              <DownloadTicketPDFButton
                ticketData={bookingDetailsData?.data.ticket}
                pnrCode={bookingDetailsData.data.pnr_code}
                totalPassenger={bookingDetailsData.data.total_passenger}
              />
            )}
          </div>
        </DashboardHeader>
      </div>
      <div className="block md:hidden">
        <div className="flex items-center gap-2">
          <DownloadBookingPDF bookingData={bookingDetailsData?.data} />
          {bookingDetailsData?.data.ticket && (
            <DownloadTicketPDFButton
              ticketData={bookingDetailsData?.data.ticket}
              pnrCode={bookingDetailsData.data.pnr_code}
              totalPassenger={bookingDetailsData.data.total_passenger}
            />
          )}
        </div>
      </div>

      <div className="grid gap-8">
        <BookingDetails data={bookingDetailsData?.data} token={token} />
      </div>
    </DashboardShell>
  )
}
