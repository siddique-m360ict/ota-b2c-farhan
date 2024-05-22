import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import CreateTravelerForm from "@/components/Dashboard/traveler/addTravelerForm"

export const metadata = {
  title: "Add Travelers",
  description: "Manage your Travelers",
}
export default async function TravelerCreatePage() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Create Traveler"
        text="Create a new traveler"
      ></DashboardHeader>
      <div className="grid gap-8">
        <CreateTravelerForm />
      </div>
    </DashboardShell>
  )
}
