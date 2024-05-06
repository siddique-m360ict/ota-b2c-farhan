interface FlightSearchLayoutProps {
  children: React.ReactNode
}

export default function FlightSearchLayout({
  children,
}: FlightSearchLayoutProps) {
  return (
    <>
      <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[280px_1fr] lg:gap-6">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto pr-2 md:sticky md:block "></aside>
        {children}
      </div>
    </>
  )
}
