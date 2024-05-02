import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import FlightDataGet from "@/components/flight-search/FlightDataGet"

const FlightView = dynamic(
  () => import("../../../components/flight-search/FlightDataGet"),
  {
    loading: () => <BoxLoader message="Loading UI..." />,
  }
)

const page = async ({ params, searchParams }) => {
  return <FlightView searchParams={searchParams} />
}

export default page
