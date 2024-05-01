import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React from "react"

const page = async ({ params, searchParams }) => {
  const res = await getAllFlights()
  console.log(res)
  return (
    <div>
      page {res?.message}
      <FlightListView flights={res?.data} count={res.count} />
    </div>
  )
}

export default page
