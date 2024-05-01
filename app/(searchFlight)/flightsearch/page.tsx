import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"

const FlightView = dynamic(
  () => import("../../../components/flight-search/FlightListView"),
  {
    loading: () => <BoxLoader message="Loading UI..." />,
  }
)

const page = async ({ params, searchParams }) => {
  const res = await getAllFlights()
  console.log(res)
  return <FlightView flights={res?.data} count={res.count} />
}

export default page
