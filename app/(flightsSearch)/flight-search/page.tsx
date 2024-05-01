import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import { getAllFlights } from "./actions"

const FlightView = dynamic(
  () => import("../../../components/flight-search/FlightListView"),
  {
    loading: () => <BoxLoader message="Loading UI..." />,
  }
)

async function Page({ params, searchParams }) {
  const res = await getAllFlights()
  console.log(res)

  return (
    <div>
      <h1>{res?.message}</h1>
      <FlightView flights={res?.data} count={res.count} />
    </div>
  )
}

export default Page
