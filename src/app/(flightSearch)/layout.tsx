import FlightSearch from "@/components/home/FlightSearch"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import { Skeleton } from "@/components/ui/skeleton"

interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Search Results - Find the Best Flights | Booking Expert",
  description:
    "Discover the best flight options and deals with our comprehensive search results. Compare prices, airlines, and book your ideal flight with Booking Expert.",
  keywords: [
    "flight search",
    "flight results",
    "cheap flights",
    "flight deals",
    "airline tickets",
    "book flights",
    "Booking Expert",
    "compare flights",
    "best flight prices",
    "flight options",
  ],
  openGraph: {
    title: "Search Results - Find the Best Flights | Booking Expert",
    description:
      "Find and compare the best flight options available. Book your ideal flight with ease using Booking Expert's comprehensive search results.",
    type: "website",
    url: "https://www.bookingexpert.world/search",
    images: [
      {
        url: "https://www.bookingexpert.world/og-image-search.jpg",
        width: 800,
        height: 600,
        alt: "Best Flight Search Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Search Results - Find the Best Flights | Booking Expert",
    description:
      "Discover and book the best flights with our search results. Compare prices and airlines for your next trip.",
    images: ["https://www.bookingexpert.world/twitter-image-search.jpg"],
  },
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="relative w-full pb-8 md:pb-20"
        style={{
          backgroundImage: "linear-gradient(-45deg,#1442cc,#3264ff)",
        }}
      >
        <div className="hidden h-16 space-x-4 px-6 sm:justify-between sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0 h-8 w-full bg-background md:h-10"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>
      <section className="modify relative hidden md:block">
        <div className="container z-50 mb-2 mt-[-75px] rounded-3xl">
          <FlightSearch />
        </div>
      </section>
      <main className="mt-2 flex-1 md:container">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  )
}
