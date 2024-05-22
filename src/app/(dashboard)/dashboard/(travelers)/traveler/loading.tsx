import { CardSkeleton } from "@/components/Dashboard/common/card-skeleton"
import { DashboardHeader } from "@/components/Dashboard/common/header"
import { DashboardShell } from "@/components/Dashboard/common/shell"

export default function DashboardTravelersLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
