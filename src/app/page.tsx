import MobileHome from "@/components/homeMobile/MobileHome"
import HomeBanner from "@/components/home/HomeBanner"
import HomeCardCarousel from "@/components/home/HomeCardCarousel"
import { SiteFooter } from "@/components/common/site-footer"
import AppPromo from "@/components/home/AppPromo"
import PopularRoute from "@/components/home/PopularRoutes"
import { getCookies } from "@/lib/token/getCookies"
import { cookies } from "next/headers"

export default async function IndexPage() {
  const cookieStore = cookies()
  const cookie = cookieStore.get("user")
  // console.log(cookie)
  return (
    <div>
      {/* home for large devices */}
      <div className="hidden min-h-screen bg-secondaryBg md:block">
        <HomeBanner />
        <HomeCardCarousel />
        <PopularRoute />
        <AppPromo />
      </div>

      {/* home for mobile devices */}
      <div className="block md:hidden">
        <MobileHome />
        <PopularRoute />
        <AppPromo />
      </div>
      <SiteFooter />
    </div>
  )
}
