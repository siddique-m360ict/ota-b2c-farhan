import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { getTravelers } from "../actions"
import TravelerList from "@/components/Dashboard/traveler/TravelerList"

export const metadata = {
  title: "Travelers",
  description: "Manage your Travelers",
}
export default async function TravelersPage() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  const travelers = await getTravelers(token)

  return (
    <DashboardShell>
      <DashboardHeader heading="Travelers" text="Manage your travelers">
        <Link href={"/dashboard/addTraveler"} className={cn(buttonVariants())}>
          Add Traveler
        </Link>
      </DashboardHeader>
      <div className="grid gap-8">
        <TravelerList travelers={travelers.data} token={token} />
      </div>
    </DashboardShell>
  )
}
