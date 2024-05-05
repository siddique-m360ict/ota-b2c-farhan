import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import { Card, CardContent } from "@/components/ui/card"
import {
  Option,
  ReValidateFlight,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import dynamic from "next/dynamic"
import React from "react"
import FlightRevalidateDetails from "./FlightRevalidate"

const FlightRevalidate = dynamic(() => import("./FlightRevalidate"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

async function page({ params, searchParams }) {
  let res = await ReValidateFlight(searchParams.flight)
  return <FlightRevalidate flights={res.data!} />
}
export default page
