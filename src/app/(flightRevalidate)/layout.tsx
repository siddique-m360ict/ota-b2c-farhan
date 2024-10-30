import { redirect } from "next/navigation"
import { getCookies } from "@/lib/token/getCookies"
import  MainNav  from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import type { Metadata } from "next"

interface FlightRevalidateLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Revalidate Flight Information - Farhan Travels",
  description:
    "Revalidate and get the latest updates on your flight bookings with Farhan Travels. Ensure you have the most accurate and up-to-date flight information.",
  keywords: [
    "flight revalidate",
    "flight information",
    "flight updates",
    "Farhan Travels",
    "flight booking",
    "update flights",
    "latest flight info",
  ],
  openGraph: {
    title: "Revalidate Flight Information - Farhan Travels",
    description:
      "Stay updated with the latest flight information by revalidating your bookings with Farhan Travels. Get accurate and timely updates on your flights.",
    type: "website",
    url: "https://www.farhantravels.world",
    images: [
      {
        url: "/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Revalidate Flight Information",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@farhantravels",
    title: "Revalidate Flight Information - Farhan Travels",
    description:
      "Revalidate your flight bookings and get the latest updates with Farhan Travels. Ensure you have the most accurate flight information.",
    images: ["/og-image.PNG"],
  },
}

export default async function FlightRevalidateLayout({
  children,
}: FlightRevalidateLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="relative w-full pb-10"
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
          className="absolute bottom-[-11px] z-0 h-10 w-full bg-secondaryBg"
          style={{ borderRadius: "24px 24px 0 0" }}
        ></div>
      </header>
      <main className="mt-2 flex-1 bg-secondaryBg">{children}</main>
      <SiteFooter />
    </div>
  )
}
