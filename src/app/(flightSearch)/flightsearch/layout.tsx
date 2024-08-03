import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"
import FilterSidebar from "@/components/flight-search/elements/FilterSidebar"

interface FlightSearchLayoutProps {
  children: React.ReactNode
}

export default function FlightSearchLayout({
  children,
}: FlightSearchLayoutProps) {
  return (
    <>
      <div className="flex-1 md:mt-3 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[290px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:block ">
          <FilterSidebar />
        </aside>
        {children}
      </div>
    </>
  )
}
