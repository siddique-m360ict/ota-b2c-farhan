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
import TimeCounter from "@/components/common/TimeCounter"
import VisaApplicationList from "@/components/Dashboard/visa/VisaApplicationList"
import { getVisaApplicationList } from "@/app/(visaSearch)/actions"

export const metadata = {
  title: "Visa Application",
  description: "Manage your Visa Application",
}
export default async function BookingRequestPage() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const visaApplication = await getVisaApplicationList(token)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Visa Application"
        text="Manage your visa application"
      ></DashboardHeader>
      <div className="grid gap-8">
        <VisaApplicationList visaApplication={visaApplication.data} />
      </div>
    </DashboardShell>
  )
}
