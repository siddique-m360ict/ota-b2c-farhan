import dynamic from "next/dynamic"
import React from "react"
import { ReValidateFlight } from "../actions"
import { FlightRevalidateLoader } from "./loading"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import "@/styles/revalidate.css"
const FlightRevalidate = dynamic(() => import("./FlightRevalidate"), {
  loading: () => <FlightRevalidateLoader />,
})

const transformSearchParamsToFlights = (searchParams) => {
  const flights = []
  let index = 0

  while (searchParams[`flights${index}`] !== undefined) {
    const [flightNumber, departureAirportCode, arrivalAirportCode] =
      searchParams[`flights${index}`].split("-")

    const flight = {
      departure_time: `${
        searchParams[`departure_time${index}`].split(" ")[0]
      }+${searchParams[`departure_time${index}`].split(" ")[1]}`,
      departure_date: searchParams[`departure_date${index}`],
      arrival_time: `${searchParams[`arrival_time${index}`].split(" ")[0]}+${
        searchParams[`arrival_time${index}`].split(" ")[1]
      }`,
      arrival_date: searchParams[`arrival_date${index}`],
      carrier_marketing_flight_number: parseInt(flightNumber),
      departure_airport_code: departureAirportCode,
      arrival_airport_code: arrivalAirportCode,
      carrier_marketing_code: searchParams[`carrier_marketing_code${index}`],
      carrier_operating_code: searchParams[`carrier_operating_code${index}`],
    }

    flights.push(flight)
    index++
  }

  return flights
}

async function FlightRevalidatePage({ params, searchParams }) {
  // const transformedFlights = transformSearchParamsToFlights(searchParams)
  // const formateParams = OneWayFormatter(searchParams)

  // const combinedParams = {
  //   ...formateParams,
  //   OriginDestinationInformation:
  //     formateParams.OriginDestinationInformation.map((info) => ({
  //       ...info,
  //       flight: transformedFlights,
  //     })),
  // }

  let res = await ReValidateFlight(searchParams.ID)
  return <FlightRevalidate flights={res.data!} ticketID={searchParams.ID} />
}
export default FlightRevalidatePage
