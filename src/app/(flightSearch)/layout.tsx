import FlightSearch from "@/components/home/FlightSearch"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import MainNav from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Search Results - Find the Best Flights | Farhan Travels",
  description:
    "Discover the best flight options and deals with our comprehensive search results. Compare prices, airlines, and book your ideal flight with Farhan Travels.",
  keywords: [
    "flight search",
    "flight results",
    "cheap flights",
    "flight deals",
    "airline tickets",
    "book flights",
    "Farhan Travels",
    "compare flights",
    "best flight prices",
    "flight options",
  ],
  openGraph: {
    title: "Search Results - Find the Best Flights | Farhan Travels",
    description:
      "Find and compare the best flight options available. Book your ideal flight with ease using Farhan Travels's comprehensive search results.",
    type: "website",
    url: "https://www.farhantravels.world/search",
    images: [
      {
        url: "https://www.farhantravels.world/og-image-search.jpg",
        width: 800,
        height: 600,
        alt: "Best Flight Search Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@farhantravels",
    title: "Search Results - Find the Best Flights | Farhan Travels",
    description:
      "Discover and book the best flights with our search results. Compare prices and airlines for your next trip.",
    images: ["https://www.farhantravels.world/twitter-image-search.jpg"],
  },
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#E2E8F0] dark:bg-background md:bg-background">
      <header
        className="relative hidden w-full pb-0 md:block bg-primary md:pb-20 dark:bg-background dark:text-gray-100"
      >
        <div className="hidden h-16 space-x-4 px-6 sm:justify-between sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader home={true} />
        </div>
        <div
          className="absolute bottom-[-11px] z-0 hidden h-8 w-full bg-background md:block md:h-10"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>
      <section className="modify relative -mt-20 hidden md:block">
        <div className="container mx-auto p-4">
          <div className="mx-auto mt-[-rounded-lg] max-w-6xl rounded-lg bg-white p-4 shadow-lg md:mt-0 dark:bg-gray-900 dark:text-gray-100">
            <FlightSearch />
          </div>
        </div>
      </section>
      <main className="flex-1 md:container md:mt-2">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  )
}
