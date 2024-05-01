interface FlightLayoutProps {
  children: React.ReactNode
}

export default async function FlightLayout({ children }: FlightLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
    </div>
  )
}
