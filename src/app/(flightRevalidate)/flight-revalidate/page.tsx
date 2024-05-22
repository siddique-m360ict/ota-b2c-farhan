import dynamic from "next/dynamic"
import React from "react"
import { ReValidateFlightV2 } from "../actions"
import { FlightRevalidateLoader } from "./loading"

const FlightRevalidate = dynamic(() => import("./FlightRevalidate"), {
  loading: () => <FlightRevalidateLoader />,
})

async function page({ params, searchParams }) {
  let res = await ReValidateFlightV2(searchParams.flight)
  return <FlightRevalidate flights={res.data!} ticketID={searchParams.flight} />
}
export default page
