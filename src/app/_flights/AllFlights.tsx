import { unstable_noStore } from "next/cache"
import React from "react"
import { getAllFlights } from "../(flightSearch)/actions"
import FlightListView from "@/components/flight-search/FlightListView"

const AllFlights = async (props: any) => {
  unstable_noStore()
  const res = await getAllFlights(props?.searchParams)
  return (
    <div>
      <FlightListView flights={res?.data} count={res?.count} />
      {/* <pre>{JSON.stringify(props, null, 2)}</pre>
        <pre>{res?.count || res?.message}</pre> */}
    </div>
  )
}
export default AllFlights
