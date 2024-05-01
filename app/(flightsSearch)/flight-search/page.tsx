import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import GetFlightList_V2 from "./actions"

const FlightView = dynamic(() => import("./FlightListView"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

async function Page({ params, searchParams }) {
  const res = await GetFlightList_V2(searchParams)
  console.log(res)

  return <FlightView flights={res?.data} count={res.count} />
}

export default Page
