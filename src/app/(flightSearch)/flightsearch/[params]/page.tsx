import React from "react"
import { getAllFlights } from "../../actions"
import FlightListView from "@/components/flight-search/FlightListView"

const ParamsPage = async ({ params, searchParams }) => {
  const res = await getAllFlights(searchParams)
  return <FlightListView flights={res?.data} count={res?.count} />
}

export default ParamsPage
