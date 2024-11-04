import  MainNav  from "@/components/common/main-nav"
import HomeMobileHeader from "@/components/homeMobile/elements/HomeMobileHeader"
import VisaSearchBox from "@/components/visa/VisaSearchBox"

interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Find Visa Worldwide - Visa Services | Farhan Travels",
  description:
    "Discover and apply for visas worldwide with Farhan Travels. Compare visa services, find the best deals, and enjoy a hassle-free application experience. Apply for your next visa now!",
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
    "Farhan Travels",
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
    "Farhan Travels world",
    "farhantravels.world",
  ],
  openGraph: {
    title: "Find Visa Worldwide - Visa Services | Farhan Travels",
    description:
      "Discover the best visa services with Farhan Travels. Compare visa options, enjoy hassle-free visa application, and apply for your next visa easily. Apply now!",
    type: "website",
    url: "https://www.farhantravels.world",
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
    site: "@farhantravels",
    title: "Find Visa Worldwide - Visa Services | Farhan Travels",
    description:
      "Discover the best visa deals with Farhan Travels. Compare visa services, find the best deals, and apply easily. Apply for your visa now!",
    images: ["/og-visa-image.PNG"],
  },
}

export default function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div>
      <header className="relative w-full pb-4 ">
        <div className="containers">
          <div className="bg-wrapper absolute left-0 top-0 z-0 size-full bg-primary"></div>
          <div className="z-50 hidden h-16  space-x-4 px-6  sm:justify-between sm:space-x-0 md:flex">
            <MainNav />
          </div>
        </div>

        <div className="block md:hidden">
          <HomeMobileHeader />
        </div>
      </header>

      <div className="bg-[#f8f8fc]">{children}</div>
    </div>
  )
}
