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
      title: "Booking Request",
      href: "/dashboard/bookingRequest",
      icon: "post",
    },
    {
      title: "Visa Application",
      href: "/dashboard/visaApplication",
      icon: "post",
    },
    {
      title: "Travelers",
      href: "/dashboard/traveler",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
