import { Suspense } from "react"
import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"
import { Skeleton } from "@/components/ui/skeleton"

export default async function FlightSearchPage({ params, searchParams }) {
  return (
    <Suspense fallback={<CardLoader numberFlight={8} />}>
      <AllFlights searchParams={searchParams} />
    </Suspense>
  )
}

const AllFlights = async (props: any) => {
  const res = await getAllFlights(props?.searchParams)
  return <FlightListView flights={res?.data} count={res?.count} />
}

export const dynamic = "force-dynamic"
