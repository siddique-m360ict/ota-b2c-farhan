import MobileHome from "@/components/homeMobile/MobileHome"
import HomeBanner from "@/components/home/HomeBanner"
import HomeCardCarousel from "@/components/home/HomeCardCarousel"
import { SiteFooter } from "@/components/common/site-footer"
import AppPromo from "@/components/home/AppPromo"
import PopularRoute from "@/components/home/PopularRoutes"
import { getCookies } from "@/lib/token/getCookies"
import { cookies } from "next/headers"
import SectionVideos from "@/components/home/SectionVideos"
import Offer from "@/components/home/Offer"
import HotelRecommendation from "@/components/home/HotelRecommendation"
import UpperFooter from "@/components/home/UpperFooter"
import TopRecommendation from "@/components/home/TopRecommendation"
export default async function IndexPage() {
  return (
    <div>
      {/* home for large devices */}
      <div className="hidden min-h-screen bg-secondaryBg md:block">
        <HomeBanner />
        {/* <Offer /> */}
          <HomeCardCarousel />
          <TopRecommendation />
          <PopularRoute />
          <HotelRecommendation />
        <UpperFooter />
        <AppPromo />
      </div>
      {/* home for mobile devices */}
      <div className="block md:hidden">
        <MobileHome />
        <TopRecommendation />
        <PopularRoute />
        <SectionVideos className="mx-2" />

        <AppPromo />
      </div>
      <SiteFooter />
    </div>
  )
}
