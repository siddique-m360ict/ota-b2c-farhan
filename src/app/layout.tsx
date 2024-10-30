import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/redux/providers"
import { TailwindIndicator } from "@/components/common/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { Inter as FontSans, Roboto } from "next/font/google"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const fontRoboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: "400",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: {
    default: "Farhan Travels - Best Deals on Flight Tickets",
    template: "%s | Farhan Travels",
  },
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
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  openGraph: {
    title: "Book Flights - Best Deals on Flight Tickets | Farhan Travels",
    description:
      "Find the best flight deals with Farhan Travels. Compare airline tickets, enjoy cheap airfare, and book your next flight easily. Book now!",
    type: "website",
    url: "https://www.farhantravels.world",
    images: [
      {
        url: "/og-image.PNG",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontRoboto.className}>
      <head />
      <body
        className={cn(
          "min-h-screen font-roboto antialiased",
          fontSans.variable,
          fontHeading.variable,
          fontRoboto.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextTopLoader color="orange" />
          <ReduxProvider>
            {children}
            <Toaster />
            <TailwindIndicator />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
