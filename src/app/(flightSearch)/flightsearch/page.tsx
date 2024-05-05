// import { Suspense } from "react"
// import { getAllFlights } from "../actions"
// import FlightListView from "@/components/flight-search/FlightListView"

import { getAllFlights } from "../actions"

// const FlightSearchPage = async ({ params, searchParams }: any) => {
//   return (
//     <section>
//       <Suspense fallback={<>Page Loading........</>}>
//         <AllFlights searchParams={searchParams} />
//       </Suspense>
//     </section>
//   )
// }

// const AllFlights = async ({ searchParams }: any) => {
//   if (Object.keys(searchParams).length === 0) {
//     return "search again"
//   }
//   const res = await getAllFlights(searchParams)
//   return <FlightListView flights={res?.data} count={res.count} />
// }

// export default FlightSearchPage

export default async function ProductPage(props: any) {
  const res = await getAllFlights(props?.searchParams)
  return (
    <div>
      Home
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{res?.count || res?.message}</pre>
    </div>
  )
}
