import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"

const page = async ({ params, searchParams }) => {
  console.log(searchParams)
  return <div>FlightDataGet {searchParams?.departuredate} </div>
}

export default page
