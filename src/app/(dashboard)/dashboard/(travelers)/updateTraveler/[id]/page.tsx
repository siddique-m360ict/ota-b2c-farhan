import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import CreateTravelerForm from "@/components/Dashboard/traveler/addTravelerForm"
import UpdateTravelerForm from "@/components/Dashboard/traveler/UpdateTravelerForm"
import { fetchSingleTraveler } from "../../actions"

export const metadata = {
  title: "Update Travelers",
  description: "Manage your Travelers",
}
export default async function TravelerUpdatePage({ params }) {
  const token = await getCookies()
  if (!token) {
    redirect("/login")
  }

  const singleTravelerData = await fetchSingleTraveler(params.id, token)

  return (
    <DashboardShell>
      <DashboardHeader heading="Update Traveler"></DashboardHeader>
      <div className="grid gap-8">
        <UpdateTravelerForm traveler={singleTravelerData.data[0]} />
      </div>
    </DashboardShell>
  )
}
