import  MainNav  from "../../components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import FlightSearch from "@/components/home/FlightSearch"
import Image from "next/image"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"

interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
  description:
    "Discover and book cheap flights with Farhan Travels. Compare prices, find the best deals on airline tickets, and enjoy a hassle-free booking experience. Book your next flight now!",
  keywords: [
    "flight booking",
    "cheap flights",
    "book flights online",
    "flight deals",
    "airline tickets",
    "best flight deals",
    "discount flights",
    "Farhan Travels",
    "cheap airfare",
    "last-minute flights",
    "international flights",
    "domestic flights",
    "one-way flights",
    "round trip flights",
    "multi-city flights",
    "flight comparison",
    "airfare deals",
    "budget airlines",
    "low-cost carriers",
    "travel deals",
    "holiday flights",
    "business travel",
    "economy flights",
    "premium economy flights",
    "business class flights",
    "first class flights",
    "non-stop flights",
    "direct flights",
    "red-eye flights",
    "weekend getaways",
    "vacation packages",
    "group travel",
    "student travel deals",
    "Farhan Travels world",
    "farhantravels .world",
  ],
  openGraph: {
    title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
    description:
      "Find the best flight deals with Farhan Travels. Compare airline tickets, enjoy cheap airfare, and book your next flight easily. Book now!",
    type: "website",
    url: "https://www.farhantravels.world",
    images: [
      {
        url: "/images/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Best Deals on Flight Tickets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@farhantravels",
    title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
    description:
      "Discover the best deals on flights with Farhan Travels. Compare prices, find cheap airfare, and book easily. Book your flight now!",
    images: ["/og-image.PNG"],
  },
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="relative w-full pb-20  ">
        <div className="bg-wrapper absolute left-0 top-0 z-0  size-full">
          <Image
            src={"/images/home/flight_home_bg.webp"}
            alt="home-image"
            fill
            className="object-contain object-left-top md:object-cover"
          />
        </div>
        <div className="z-50 hidden h-16  space-x-4 px-6 sm:justify-between sm:space-x-0 md:flex">
          <MainNav />
        </div>
        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
        <div
          className="absolute bottom-[-11px] z-0  h-10 w-full bg-background"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
        <section className="modify relative z-50 pt-4">
          <div className="z-50 mt-10  rounded-3xl px-2  md:container ">
            <h1 className="mb-3 hidden text-[2vw] font-bold  text-white  md:block">
              Find best flight. One simple search
            </h1>
            <div className="mt-[-40px] md:mt-0">
              <FlightSearch className="py-4" />
            </div>
          </div>
        </section>
      </header>
      <div
        className="absolute top-[7.8%] z-0 block h-[48px] w-full md:hidden"
        style={{ background: "linear-gradient(hsla(0,0%,100%,0),#f0f2f5)" }}
      ></div>
      <div className="container mt-2 flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
