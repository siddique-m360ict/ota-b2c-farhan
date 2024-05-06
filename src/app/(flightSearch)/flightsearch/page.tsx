import { Suspense } from "react"
import { GetFlightList_V2, getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { HTTPResponse } from "@/lib/commonTypes"
import { IFlightSearchList } from "@/components/home/elements/types/flightSearchType"
import dynamic from "next/dynamic"

const FlightView = dynamic(
  () => import("../../../components/flight-search/FlightListView"),
  {
    loading: () => <CardLoader numberFlight={8} />,
  }
)

const FlightSearchPage = async ({ params, searchParams }) => {
  const res = await GetFlightList_V2(searchParams)
  return (
    <div>
      <FlightView flights={res?.data} count={res?.count} />
    </div>
  )
}

// const FlightSearchPage = async ({ params, searchParams }) => {
//   const origin = searchParams.origin ?? "0"
//   const destination = searchParams.destination ?? "0"
//   const departuredate = searchParams.departuredate ?? "0"
//   const adults = searchParams.adults ?? "0"
//   const cabin = searchParams.class ?? "0"
//   const route = searchParams.route ?? "0"

//   return (
//     <Suspense key={origin} fallback={<CardLoader numberFlight={8} />}>
//       <AllFlights searchParams={searchParams} />
//     </Suspense>
//   )
// }

// const AllFlights = async (props: any) => {
//   const res = await GetFlightList_V2(props?.searchParams)
//   return (
//     <div>
//       <FlightListView flights={res?.data} count={res?.count} />
//       {/* <pre>{JSON.stringify(props, null, 2)}</pre>
//       <pre>{res?.count || res?.message}</pre> */}
//     </div>
//   )
// }

export default FlightSearchPage
