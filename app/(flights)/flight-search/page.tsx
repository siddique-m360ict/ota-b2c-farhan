import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import GetFlightList_V1 from "@/lib/server/flights/SearchFlightListEndpoint"
import { filterFlightList } from "@/lib/server/flights/FilterFlightListEndpoint"

const FlightView = dynamic(() => import("./FlightListView"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

const hasFilterOption = (searchParams, filterOptions) => {
  for (const [key, value] of Object.entries(filterOptions)) {
    if (searchParams.hasOwnProperty(key)) {
      if (searchParams[key] !== "") {
        return true
      }
    }
  }
  return false
}

const filterOption = {
  carrier_operating: undefined,
  max_price: undefined,
  min_price: undefined,
  refundable: undefined,
  stoppage: undefined,
  aircraft: undefined,
  elapsed_time_min: undefined,
  departure_timings: undefined,
  arrival_timings: undefined,
  type: undefined,
}

async function Page({ params, searchParams }) {
  let flightsList
  let filterItems
  let count

  let res
  if (hasFilterOption(searchParams, filterOption)) {
    res = await filterFlightList(searchParams, 1)
    console.log(`filter api call`)
  } else {
    res = await GetFlightList_V1(searchParams)
    console.log(`Flight Api call`)
  }

  flightsList = res?.data?.results
  count = res.count

  // Only set filterItems if GetFlightList_V1 is called
  if (!hasFilterOption(searchParams, filterOption)) {
    filterItems = res?.data?.filter
  }

  return (
    <FlightView flights={flightsList} filterItems={filterItems} count={count} />
  )
}

export default Page
