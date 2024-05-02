import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"

const page = async ({ params, searchParams }) => {
  let response
  if (Object.keys(searchParams).length !== 0) {
    response = await getAllFlights(searchParams)
  }
  console.log(response)

  return <div>response: {response?.message}</div>
}

export default page
