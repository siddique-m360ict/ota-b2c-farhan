import MobileHome from "@/components/homeMobile/MobileHome"
import HomeBanner from "@/components/home/HomeBanner"
import HomeCardCarousel from "@/components/home/HomeCardCarousel"
import PopularAttractions from "@/components/home/PopularAttractions"
import { SiteFooter } from "@/components/common/site-footer"
import AppPromo from "@/components/home/AppPromo"

export default async function IndexPage() {
  return (
    <div>
      {/* home for large devices */}
      <div className="hidden min-h-screen bg-secondaryBg md:block">
        <HomeBanner />
        <HomeCardCarousel />
        <PopularAttractions />
        {/* <AppPromo /> */}
      </div>
      {/* home for mobile devices */}
      <div className="block md:hidden">
        <MobileHome />
        <PopularAttractions />
      </div>
      <SiteFooter />
    </div>
  )
}
