import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import GetFlightList_V2 from "./actions"

const page = async ({ params, searchParams }) => {
  const res = await GetFlightList_V2(searchParams)
  console.log(res)
  return <FlightListView flights={res?.data} count={res.count} />
}

export default page
