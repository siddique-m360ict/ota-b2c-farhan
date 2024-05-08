import { DashboardHeader } from "@/components/Dashboard/common/header"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import ProfileForm from "@/components/Dashboard/setting/ProfileForm"
import { getCookies } from "@/lib/token/getCookies"

import { redirect } from "next/navigation"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function page() {
  const token = await getCookies()

  if (!token) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and update settings."
      />
      <div className="grid gap-10">
        <ProfileForm />
      </div>
    </DashboardShell>
  )
}
