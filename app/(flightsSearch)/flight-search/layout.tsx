import { docsConfig } from "@/config/docs"
import { DocsSidebarNav } from "@/components/sidebar-nav"
import FlightTopAirline from "@/components/flight-search/elements/FlightTopAirline"
import FilterSidebar from "@/components/flight-search/elements/FilterSidebar"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <FlightTopAirline />
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block ">
          <FilterSidebar />
        </aside>
        {children}
      </div>
    </>
  )
}
