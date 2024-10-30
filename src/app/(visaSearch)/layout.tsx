import FlightSearch from "@/components/home/FlightSearch"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import { Skeleton } from "@/components/ui/skeleton"
import VisaSearchBox from "@/components/visa/VisaSearchBox"

interface VisaSearchLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Visa Search - Find Visa Services Worldwide | Farhan Travels",
  description:
    "Search and discover visa services worldwide with Farhan Travels. Find the best visa options, compare services, and start your visa application process. Search for visas now!",
  keywords: [
    "visa search",
    "find visas",
    "visa services",
    "visa application",
    "search visa options",
    "compare visas",
    "Visa Expert",
    "visa search engine",
    "visa application process",
    "visa requirements",
    "visa assistance",
    "travel visas",
    "work visas",
    "tourist visas",
    "student visas",
    "business visas",
    "immigration services",
    "Farhan Travels world",
    "farhantravels.world",
  ],
  openGraph: {
    title: "Visa Search - Find Visa Services Worldwide | Farhan Travels",
    description:
      "Discover visa services worldwide with Farhan Travels. Search for visas, compare options, and start your visa application process easily. Search now!",
    type: "website",
    url: "https://www.farhantravels.world/visa-search",
    images: [
      {
        url: "/images/og-visa-search-image.PNG",
        width: 800,
        height: 600,
        alt: "Find Visa Services Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@farhantravels",
    title: "Visa Search - Find Visa Services Worldwide | Farhan Travels",
    description:
      "Search and discover visa services worldwide with Farhan Travels. Find the best visa options, compare services, and start your visa application process. Search for visas now!",
    images: ["/og-visa-search-image.PNG"],
  },
}

export default async function VisaSearchLayout({
  children,
}: VisaSearchLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col ">
      <header
        className="relative w-full pb-8 md:pb-20"
        style={{
          backgroundImage: "linear-gradient(-45deg,#00B3A4,#06aebd)",
        }}
      >
        <div className=" hidden h-16 space-x-4 px-6 sm:justify-between  sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-8 w-full bg-background md:h-10"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>

      <div className="mt-2 flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  )
}
