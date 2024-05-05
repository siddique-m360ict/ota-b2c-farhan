import { Suspense } from "react"
import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import dynamic from "next/dynamic"

const DynamicHeader = dynamic(
  () => import("../../../components/flight-search/FlightListView"),
  {
    loading: () => <p>Loading...</p>,
  }
)

const FlightSearchPage = async ({ params, searchParams }) => {
  return (
    <Suspense fallback={<>Page loading............</>}>
      <AllFlights searchParams={searchParams} />
    </Suspense>
  )
}

const AllFlights = async (props: any) => {
  const res = await getAllFlights(props?.searchParams)
  return (
    <div>
      <DynamicHeader flights={res?.data} count={res?.count} />
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{res?.count || res?.message}</pre>
    </div>
  )
}

export default FlightSearchPage
