"use client"

import Image from "next/image"
import Link from "next/link"
import { Plane, ArrowRight } from "lucide-react"
import { useState } from "react"

interface FlightRecommendation {
  destination: string
  price: string
  imageUrl: string
  from: string
  depDate: string
  depAirport: string
  arrAirport: string
}

const flightRecommendations: FlightRecommendation[] = [
  {
    destination: "Kuala Lumpur",
    price: "Tk 2,143",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/kuala-lumpur.png",
    from: "Langkawi",
    depDate: "2024-11-14",
    depAirport: "LGK",
    arrAirport: "KUL",
  },
  {
    destination: "Bangkok",
    price: "Tk 25,600",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/bangkok.png",
    from: "Dhaka",
    depDate: "2024-11-05",
    depAirport: "DAC",
    arrAirport: "BKKA",
  },
  {
    destination: "Dhaka",
    price: "Tk 14,317",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/dhaka.png",
    from: "Kuala Lumpur",
    depDate: "2024-12-19",
    depAirport: "KUL",
    arrAirport: "DAC",
  },
  {
    destination: "Phuket",
    price: "Tk 3,788",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/phuket.png",
    from: "Bangkok",
    depDate: "2024-11-29",
    depAirport: "BKKA",
    arrAirport: "HKT",
  },
  {
    destination: "Langkawi",
    price: "Tk 2,143",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/langkawi.png",
    from: "Kuala Lumpur",
    depDate: "2024-11-06",
    depAirport: "KUL",
    arrAirport: "LGK",
  },
  {
    destination: "Riyadh",
    price: "Tk 39,596",
    imageUrl:
      "https://cdn.airpaz.com/cdn-cgi/image/f=webp/rel-0275/cities/320x180/riyadh.png",
    from: "Dhaka",
    depDate: "2024-11-15",
    depAirport: "DAC",
    arrAirport: "RUH",
  },
]

export default function TopRecommendation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className='my-20'>
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-left text-4xl font-semibold text-gray-700  dark:text-gray-100">
          Exclusive Flight Recommendations
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {flightRecommendations.map((flight, index) => (
            <Link
              key={index}
              href={`/en/flight/search?depDate=${flight.depDate}&depAirport=${flight.depAirport}&arrAirport=${flight.arrAirport}&adult=1&cabin=economy`}
              className="group relative block h-[250px] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={flight.imageUrl}
                alt={flight.destination}
                layout="fill"
                objectFit="cover"
                className={`transition-all duration-300 ${
                  hoveredIndex === index ? "scale-110 blur-sm" : "scale-100 blur-0"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <div className="relative size-full" data-testid="recommended-card">
                  <div className="flight-desc relative flex h-8 overflow-hidden">
                    <p
                      className={`absolute whitespace-nowrap transition-all duration-300 ease-in-out ${
                        hoveredIndex === index
                          ? "translate-y-full text-xl opacity-0"
                          : "translate-y-0 text-lg opacity-100"
                      }`}
                    >
                      Flight to
                    </p>
                    <p
                      className={`absolute whitespace-nowrap transition-all duration-300 ease-in-out ${
                        hoveredIndex === index
                          ? "translate-y-0 text-xl opacity-100"
                          : "translate-y-full text-lg opacity-0"
                      }`}
                    >
                      Flight from {flight.from}
                    </p>
                  </div>
                  <div className={`mt-3 font-bold transition-all duration-300 ${
                    hoveredIndex === index ? "text-3xl" : "text-2xl"
                  }`}>
                    <Plane className="mr-2 inline size-6" />
                    <span>{flight.destination}</span>
                  </div>
                  <div className={`mt-3 h-[2px] bg-white transition-all duration-300 ${
                    hoveredIndex === index ? "w-full" : "w-0"
                  }`}></div>
                  <div className={`absolute bottom-4 right-4 flex items-end gap-x-2 font-bold transition-all duration-300 ${
                    hoveredIndex === index ? "left-4 right-auto text-lg" : "text-base"
                  }`}>
                    <span className="opacity-100">Start from</span>
                    <div className="text-lg">{flight.price}</div>
                  </div>
                  <span
                    className={`absolute bottom-4 right-4 transition-all duration-300 ${
                      hoveredIndex === index
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                    }`}
                  >
                    <ArrowRight className="size-6" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
