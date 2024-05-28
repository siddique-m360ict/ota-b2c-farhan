import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import FlightListCard from "../FlightListCard"
import dummyFlights from "../../../../public/data/dummyFlight.json"
const CardLoader = ({ numberFlight }: { numberFlight: number }) => {
  return (
    <div className="flex flex-col  space-y-2">
      {dummyFlights.map((flight: any, index: number) => (
        <FlightListCard key={index} flight={flight} />
      ))}
      <LoadingIndicator />
    </div>
  )
}

export default CardLoader
