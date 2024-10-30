interface FlightLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
  description:
    "Discover and book cheap flights with Farhan Travels. Compare prices, find the best deals on airline tickets, and enjoy a hassle-free booking experience. Book your next flight now!",
  keywords: [
    "flight booking",
    "cheap flights",
    "book flights online",
    "flight deals",
    "airline tickets",
    "best flight deals",
    "discount flights",
    "Farhan Travels",
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
    "Farhan Travels world",
    "farhantravels .world",
  ],
  openGraph: {
    title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
    description:
      "Find the best flight deals with Farhan Travels. Compare airline tickets, enjoy cheap airfare, and book your next flight easily. Book now!",
    type: "website",
    url: "https://www.farhantravels.world",
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
    site: "@farhantravels",
    title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
    description:
      "Discover the best deals on flights with Farhan Travels. Compare prices, find cheap airfare, and book easily. Book your flight now!",
    images: ["/og-image.PNG"],
  },
}

export default function FlightLayout({ children }: FlightLayoutProps) {
  return children
}
