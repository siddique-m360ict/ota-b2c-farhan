"use client"
import React from "react"

type Props = {
  totalFlight: number
  arrivalCity: string | undefined
}
const FlightTopHeader = ({ totalFlight, arrivalCity }: Props) => {
  return (
    <div
      style={{
        background: "url(/images/flightTop.webp)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "8px 8px 0 0",
      }}
    >
      <div
        className="flex items-center justify-between p-[16px] text-white"
        style={{
          backgroundImage: "linear-gradient(90deg,#0f294d,rgba(50,100,255,.7))",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <h2 className="font-[700]">
          {totalFlight} Flights Departing to {arrivalCity}
        </h2>
        <p className="text-sm">*Last updated: 15:26:54, April 22, 2024</p>
      </div>
    </div>
  )
}

export default FlightTopHeader
