import { MainNav } from "@/components/common/main-nav"
import { SiteFooter } from "@/components/common/site-footer"
import FlightSearch from "@/components/home/FlightSearch"
import Image from "next/image"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import VisaSearchBox from "@/components/visa/VisaSearchBox"

interface VisaLayoutProps {
  children: React.ReactNode
}
export const metadata = {
  title: "Find Visa Worldwide - Visa Services | Booking Expert",
  description:
    "Discover and apply for visas worldwide with Booking Expert. Compare visa services, find the best deals, and enjoy a hassle-free application experience. Apply for your next visa now!",
  keywords: [
    "visa services",
    "visa application",
    "apply for visa",
    "visa deals",
    "travel visa",
    "business visa",
    "tourist visa",
    "work visa",
    "student visa",
    "Booking Expert",
    "visa application services",
    "visa processing",
    "visa requirements",
    "visa fees",
    "travel documents",
    "visa application form",
    "visa appointment",
    "visa assistance",
    "immigration services",
    "apply for visa online",
    "expedited visa services",
    "rush visa processing",
    "visa appointment booking",
    "visa consultation",
    "visa agency",
    "Booking Expert world",
    "bookingexpert.world",
  ],
  openGraph: {
    title: "Find Visa Worldwide - Visa Services | Booking Expert",
    description:
      "Discover the best visa services with Booking Expert. Compare visa options, enjoy hassle-free visa application, and apply for your next visa easily. Apply now!",
    type: "website",
    url: "https://www.bookingexpert.world",
    images: [
      {
        url: "/images/og-visa-image.PNG",
        width: 800,
        height: 600,
        alt: "Visa Services Worldwide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Find Visa Worldwide - Visa Services | Booking Expert",
    description:
      "Discover the best visa deals with Booking Expert. Compare visa services, find the best deals, and apply easily. Apply for your visa now!",
    images: ["/og-visa-image.PNG"],
  },
}

export default async function VisaLayout({ children }: VisaLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col  ">
      <div
        className="absolute top-[7.8%] z-0 block h-[48px] w-full md:hidden"
        style={{ background: "linear-gradient(hsla(0,0%,100%,0),#f0f2f5)" }}
      ></div>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  )
}
