import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"

const page = async ({ params, searchParams }) => {
  if (Object.keys(searchParams).length !== 0) {
    console.log({ searchParams })
  }
  console.log({
    p: "dhbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbfs",
    condition: Object.keys(searchParams).length !== 0,
  })

  return <div>response: </div>
}

export default page
