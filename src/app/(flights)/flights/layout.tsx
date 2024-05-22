interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Book Flights - Best Deals on Flight Tickets | Booking Expert",
  description:
    "Discover and book cheap flights with Booking Expert. Compare prices, find the best deals on airline tickets, and enjoy a hassle-free booking experience. Book your next flight now!",
  keywords: [
    "flight booking",
    "cheap flights",
    "book flights online",
    "flight deals",
    "airline tickets",
    "best flight deals",
    "discount flights",
    "Booking Expert",
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
    "booking expert world",
    "bookingexpert .world",
  ],
  openGraph: {
    title: "Book Flights - Best Deals on Flight Tickets | Booking Expert",
    description:
      "Find the best flight deals with Booking Expert. Compare airline tickets, enjoy cheap airfare, and book your next flight easily. Book now!",
    type: "website",
    url: "https://www.bookingexpert.world",
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
    site: "@bookingexpert",
    title: "Book Flights - Best Deals on Flight Tickets | Booking Expert",
    description:
      "Discover the best deals on flights with Booking Expert. Compare prices, find cheap airfare, and book easily. Book your flight now!",
    images: ["/og-image.PNG"],
  },
}

export default function FlightLayout({ children }: FlightLayoutProps) {
  return children
}
