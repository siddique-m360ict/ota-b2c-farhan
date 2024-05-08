import { DashboardHeader } from "@/components/Dashboard/common/header"
import { DashboardShell } from "@/components/Dashboard/common/shell"
import { PostCreateButton } from "@/components/Dashboard/post-create-button"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <PostCreateButton />
      </DashboardHeader>
    </DashboardShell>
  )
}
