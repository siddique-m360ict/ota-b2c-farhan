import { Suspense } from "react"
// import { getAllFlights } from "../actions"
import FlightListView from "@/components/flight-search/FlightListView"
import CardLoader from "@/components/flight-search/elements/CardLoader"
import { Skeleton } from "@/components/ui/skeleton"
import FlightNotFound from "@/components/flight-search/elements/FlightNotFound"
import { IGetVisaList, getAllVisa } from "../actions"
import VisaListView from "@/components/visa/VisaListView"
import NotFoundVisa from "@/components/visa/elements/NotFoundVisa"

export default async function VisaSearchPage({ params, searchParams }) {
  return (
    <Suspense fallback={<CardLoader numberFlight={8} />}>
      <AllVisa searchParams={searchParams} />
    </Suspense>
  )
}

const AllVisa = async (props: any) => {
  const res = await getAllVisa(props?.searchParams)
  if (!res.success || res?.data?.length === 0) {
    return <NotFoundVisa />
  }

  return <VisaListView visa={res?.data} searchParams={props?.searchParams} />
}

export const dynamic = "force-dynamic"
