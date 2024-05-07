import BoxLoader from "@/components/flight-search/elements/BoxLoader"
import dynamic from "next/dynamic"
import React from "react"
import { ReValidateFlightV2 } from "../../actions"

const FlightRevalidate = dynamic(() => import("../FlightRevalidate"), {
  loading: () => <BoxLoader message="Loading UI..." />,
})

async function page({ params }) {
  let res = await ReValidateFlightV2(params.slug)
  return <FlightRevalidate flights={res.data!} />
}
export default page
