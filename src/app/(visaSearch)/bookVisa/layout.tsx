interface FlightSearchLayoutProps {
  children: React.ReactNode
}

export default function FlightSearchLayout({
  children,
}: FlightSearchLayoutProps) {
  return (
    <>
      <section className="modify relative hidden md:block">
        <div className="container z-50 mb-2 mt-[-90px] rounded-3xl">
          <h1 className=" font-heading text-[32px] text-white">
            Review Visa Booking
          </h1>
        </div>
      </section>
      <div className="md:container">{children}</div>
    </>
  )
}
