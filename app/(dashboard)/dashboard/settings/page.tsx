import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { UserNameForm } from "@/components/user-name-form"

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
}

export default async function page() {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and update settings."
      />
      <div className="grid gap-10">
        <UserNameForm />
      </div>
    </DashboardShell>
  )
}
