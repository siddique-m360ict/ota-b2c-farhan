import { DashboardHeader } from "@/components/Dashboard/common/header"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { PostCreateButton } from "@/components/Dashboard/post-create-button"
import { EmptyPlaceholder } from "@/components/common/empty-placeholder"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const posts = []

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your Information">
        Dashboard
      </DashboardHeader>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>
          No Available Information
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any info yet. Start booking.
        </EmptyPlaceholder.Description>
      </EmptyPlaceholder>
    </DashboardShell>
  )
}
