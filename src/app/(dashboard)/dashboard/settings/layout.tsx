import { getCookies } from "@/lib/token/getCookies"
import { redirect } from "next/navigation"

interface SettingLayoutProps {
  children: React.ReactNode
}

export default async function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <>
      <div className="">{children}</div>
    </>
  )
}
