import { Suspense } from "react"
import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"

export default async function FlightSearchPage({ params, searchParams }) {
  return (
    <Suspense fallback={<>Suspense Loading......</>}>
      <AllFlights searchParams={searchParams} />
    </Suspense>
  )
}

const AllFlights = async (props: any) => {
  const res = await getAllFlights(props?.searchParams)
  return (
    <Suspense fallback={<>Suspense Loading 22222......</>}>
      <FlightListView flights={res?.data} count={res?.count} />
    </Suspense>
  )
}

export const dynamic = "force-dynamic"
