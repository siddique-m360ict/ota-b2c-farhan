import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Articles",
      href: "/dashboard",
      icon: "post",
      disabled: true,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
