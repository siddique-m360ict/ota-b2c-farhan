import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"
import FilterSidebar from "@/components/flight-search/elements/FilterSidebar"
import Image from "next/image"

interface TermsLayoutProps {
  children: React.ReactNode
}

export default function TermsLayout({ children }: TermsLayoutProps) {
  return (
    <>
      <section className="modify relative hidden md:block">
        <div className="container z-50 mb-2 mt-[-135px] grid grid-cols-2 rounded-3xl">
          <h1 className="font-heading text-[45px] text-white">
            Farhan Travels Privacy Policy
          </h1>
          <div className="mt-[-40px] flex w-full justify-end">
            <Image
              src={"/images/home/privacy.webp"}
              alt=""
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>
      <div>{children}</div>
    </>
  )
}
