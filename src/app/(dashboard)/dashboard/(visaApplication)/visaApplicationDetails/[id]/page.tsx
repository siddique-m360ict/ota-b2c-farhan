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

import BookingRequestDetails from "@/components/Dashboard/booking/BookingRequestDetails"
import CancelBooking from "@/components/Dashboard/booking/elements/CancelBooking"
import { visaApplicationDetails } from "@/app/(visaSearch)/actions"
import VisaApplicationDetails from "@/components/Dashboard/visa/VisaApplicationDetails"

export const metadata = {
  title: "Visa Details",
  description: "Manage Visa Details",
}
export default async function BookingRequestViewPage({ params: { id } }) {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const visaApplicationDetailsData = await visaApplicationDetails(id, token)
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Visa Application Details"
        text="Manage your visa application"
      ></DashboardHeader>
      <div className="grid gap-8">
        <VisaApplicationDetails
          data={visaApplicationDetailsData?.data}
          token={token}
        />
      </div>
    </DashboardShell>
  )
}
