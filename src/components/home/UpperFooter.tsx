import React from "react"
import { Globe, Plane, Tag, Shield, Headphones, Coins } from "lucide-react"

const UpperFooter = () => {
  const features = [
    {
      icon: <Shield className="size-12 text-red-500" />,
      title: "Simplify Your Booking Experience",
      description:
        "Feel the flexibility and simplicity throughout your booking process",
    },
    {
      icon: <Globe className="size-12 text-red-500" />,
      title: "Wide Selections of Travel Product",
      description:
        "Enjoy your memorable moments with millions of favorable flights and accommodations",
    },
    {
      icon: <Tag className="size-12 text-red-500" />,
      title: "Exclusive Offer Everyday",
      description:
        "Various daily promo with competitive price for all travelers",
    },
    {
      icon: <Shield className="size-12 text-red-500" />,
      title: "Online Farhan Travels",
      description:
        "Together with our credible partners, fulfilling countless traveler's needs since 2011",
    },
    {
      icon: <Headphones className="size-12 text-red-500" />,
      title: "Affectionate Customer Support",
      description:
        "Giving best assistance, our customer support is available 24/7 with your local language",
    },
    {
      icon: <Coins className="size-12 text-red-500" />,
      title: "World's Local Booking Excitement",
      description:
        "Stress-free booking experience with local payment, currency, and language",
    },
  ]

  const airlines = [
    "AirAsia",
    "Biman Bangladesh",
    "Batik Air",
    "US-Bangla",
    "Thai AirAsia",
    "Novoair",
    "Thai Vietjet",
    "IndiGo",
    "Thai Lion Air",
    "Malaysia Airlines",
    "Air Arabia",
    "Scoot",
    "Nok Air",
    "Thai Airways",
    "Vietjet Air",
    "Emirates",
    "Philippines AirAsia",
    "China Eastern",
  ]

  return (
    <div className="w-full bg-gray-100 ">
      {/* Features Section */}
      <section className="py-20 dark:bg-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-800 dark:bg-gray-900 dark:text-gray-100 ">
            Why must travel with Farhan Travels
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 text-center"
              >
                <div className="mb-4 rounded-full bg-red-50 p-4">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800 dark:bg-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:bg-gray-900 dark:text-gray-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default UpperFooter
