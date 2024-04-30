import React from "react"
import dynamic from "next/dynamic"
import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import { HTTPResponse } from "@/lib/commonTypes"
import { serverUrl } from "@/lib/utils"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import { RoundWayFormatter } from "@/lib/formatter/roundWayFormatter"
import { MultiWayFormatter } from "@/lib/formatter/MultiWayFormatter"
import { IFlightSearchList } from "@/components/home/elements/types/flightSearchType"

const FlightView = dynamic(() => import("./FlightListView"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

async function Page({ params, searchParams }) {
  try {
    return <FlightView />
  } catch (error) {
    // Handle errors
    return <div>Error: {error.message}</div>
  }
}

export default Page
