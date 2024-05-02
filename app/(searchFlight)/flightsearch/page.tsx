import { getAllFlights } from "@/app/actions"
import FlightListView from "@/components/flight-search/FlightListView"
import React, { Suspense } from "react"
import dynamic from "next/dynamic"

const page = async ({ params, searchParams }) => {
  console.log(searchParams)

  return (
    <Suspense fallback={<>loading...................</>}>
      <div>searchParams date is: </div>
    </Suspense>
  )
}

export default page
