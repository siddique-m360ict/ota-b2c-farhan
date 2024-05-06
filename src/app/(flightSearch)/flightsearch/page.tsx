import { Suspense } from "react"
import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"

const FlightSearchPage = async ({ params, searchParams }) => {
  const keyString = JSON.stringify(searchParams)
  return (
    <Suspense key={keyString} fallback={<CardLoader numberFlight={8} />}>
      <AllFlights searchParams={searchParams} />
    </Suspense>
  )
}

const AllFlights = async (props: any) => {
  const res = await getAllFlights(props?.searchParams)
  return (
    <div>
      <FlightListView flights={res?.data} count={res?.count} />
      {/* <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{res?.count || res?.message}</pre> */}
    </div>
  )
}

export default FlightSearchPage
