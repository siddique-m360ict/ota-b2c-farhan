import { CardSkeleton } from "@/components/Dashboard/common/card-skeleton"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { Card } from "@/components/ui/card"

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
