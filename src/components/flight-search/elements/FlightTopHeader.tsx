"use client"
import { useMediaQuery } from "@/hooks/use-media-query"
import React from "react"

type Props = {
  totalFlight: number
  arrivalCity: string | undefined
}
const FlightTopHeader = ({ totalFlight, arrivalCity }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  return (
    <div
      style={{
        background:
          "url(/images/bg-theme.jpg) center bottom -140px / cover, rgb(220, 20, 60) ",
        backgroundSize: "cover",
        borderRadius: isDesktop ? "8px 8px 0 0" : "0",
      }}
    >
      <div
        className="flex items-center justify-between p-[16px] text-white"
        style={{
          backgroundImage: "linear-gradient(90deg,#0f294d,rgba(220, 20, 60,.7))",
          borderRadius: isDesktop ? "8px 8px 0 0" : "0",
        }}
      >
        <h2 className="md:text-md text-sm font-[700]">
          {totalFlight} Flights Departing to {arrivalCity}
        </h2>
        <p className="hidden text-sm md:block">
          *Last updated: 15:26:54, April 22, 2024
        </p>
      </div>
    </div>
  )
}

export default FlightTopHeader
