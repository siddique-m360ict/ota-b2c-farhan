interface AuthLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Authentication - Secure Login and Registration | Booking Expert",
  description:
    "Securely log in or register with Booking Expert. Access your account, manage bookings, and enjoy a seamless authentication experience.",
  keywords: [
    "authentication",
    "login",
    "register",
    "secure login",
    "secure registration",
    "account management",
    "user authentication",
    "secure authentication",
    "Booking Expert",
    "authentication process",
    "login page",
    "registration page",
    "bookingexpert auth",
    "bookingexpert login",
    "bookingexpert register",
    "bookingexpert sign in",
    "bookingexpert signip",
    "bookingexpert.world auth",
    "bookingexpert.world login",
    "bookingexpert.world register",
  ],
  openGraph: {
    title: "Authentication - Secure Login and Registration | Booking Expert",
    description:
      "Securely log in or register with Booking Expert. Access your account, manage bookings, and enjoy a seamless authentication experience.",
    type: "website",
    url: "https://www.bookingexpert.world/login",
    images: [
      {
        url: "/og-image.PNG",
        width: 800,
        height: 600,
        alt: "Secure Login and Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bookingexpert",
    title: "Authentication - Secure Login and Registration | Booking Expert",
    description:
      "Securely log in or register with Booking Expert. Access your account, manage bookings, and enjoy a seamless authentication experience.",
    images: ["/og-image.PNG"],
  },
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <span className=" absolute bottom-0 -ml-20 mt-40 block size-72 rounded-full bg-[#04868b] opacity-10 mix-blend-multiply blur-3xl md:bottom-10 lg:size-96"></span>
      <span className=" absolute right-0 top-0 block size-72 rounded-full bg-[#ef233bb2] opacity-10 mix-blend-multiply blur-3xl backdrop-blur-[100px] lg:size-96"></span>
      <div className="z-50">{children}</div>
    </div>
  )
}
