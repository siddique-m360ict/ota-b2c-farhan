import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import GetFlightList_V1 from "@/lib/server/flights/SearchFlightListEndpoint"
import { filterFlightList } from "@/lib/server/flights/FilterFlightListEndpoint"

const FlightView = dynamic(() => import("./FlightListView"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

async function Page({ params, searchParams }) {
  let res = await GetFlightList_V1(searchParams)
  return <FlightView flights={res?.data} count={res.count} />
}
export default Page
