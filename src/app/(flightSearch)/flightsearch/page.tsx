"use client"
import { Suspense } from "react"
import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"
import { Skeleton } from "@/components/ui/skeleton"
import FlightNotFound from "@/components/flight-search/elements/FlightNotFound"

export default async function FlightSearchPage({ params, searchParams }) {
  return (
    <Suspense fallback={<CardLoader numberFlight={8} />}>
      <AllFlights searchParams={searchParams} />
    </Suspense>
  )
}

const AllFlights = async (props: any) => {
  const res = await getAllFlights(props?.searchParams)
  if (!res.success) {
    return <FlightNotFound message={res?.message} />
  }

  return <FlightListView flights={res?.data} count={res?.count} />
}

export const dynamic = "force-dynamic"
