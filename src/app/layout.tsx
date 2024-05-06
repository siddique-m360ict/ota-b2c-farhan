import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/redux/providers"
import { TailwindIndicator } from "@/components/common/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"
import { Inter as FontSans, Roboto } from "next/font/google"
import localFont from "next/font/local"

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
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ]
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-roboto antialiased",
          fontSans.variable,
          fontHeading.variable,
          fontRoboto.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReduxProvider>
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
            <TailwindIndicator />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
