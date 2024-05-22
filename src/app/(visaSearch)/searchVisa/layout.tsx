import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"
import FilterSidebar from "@/components/flight-search/elements/FilterSidebar"
import VisaSearchBox from "@/components/visa/VisaSearchBox"

interface FlightSearchLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Visa Search - Find Visa Services Worldwide | Booking Expert",
  description:
    "Search and discover visa services worldwide with Booking Expert. Find the best visa options, compare services, and start your visa application process. Search for visas now!",
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
    "Booking Expert world",
    "bookingexpert.world",
  ],
  openGraph: {
    title: "Visa Search - Find Visa Services Worldwide | Booking Expert",
    description:
      "Discover visa services worldwide with Booking Expert. Search for visas, compare options, and start your visa application process easily. Search now!",
    type: "website",
    url: "https://www.bookingexpert.world/searchVisa",
    images: [
      {
        url: "/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Find Visa Services Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Visa Search - Find Visa Services Worldwide | Booking Expert",
    description:
      "Search and discover visa services worldwide with Booking Expert. Find the best visa options, compare services, and start your visa application process. Search for visas now!",
    images: ["/og-image.PNG"],
  },
}

export default function FlightSearchLayout({
  children,
}: FlightSearchLayoutProps) {
  return (
    <>
      <section className="modify relative hidden md:block">
        <div className="container z-50 mb-2 mt-[-75px] rounded-3xl">
          <VisaSearchBox />
        </div>
      </section>
      <div className="md:container">{children}</div>
    </>
  )
}
