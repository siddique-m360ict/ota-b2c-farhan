export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type UserType = {
  id: number | null
  username: string | null
  first_name: string | null
  last_name: string | null
  gender: string | null
  email: string | null
  phone_number: string | null
  photo?: string | null
  is_verified: boolean | null
  status: boolean | null
  create_date: Date | null
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  icon?: string
}
export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}
