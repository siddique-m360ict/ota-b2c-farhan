import dynamic from "next/dynamic"
import React from "react"
import { FlightRevalidateLoader } from "./loading"
import { OneWayFormatter } from "@/lib/formatter/oneWayFormatter"
import "@/styles/revalidate.css"
import { ReValidateFlightV2 } from "../actionsV2"
import { RoundWayFormatter } from "@/lib/formatter/roundWayFormatter"
import { MultiWayFormatter } from "@/lib/formatter/MultiWayFormatter"

const FlightRevalidate = dynamic(() => import("./FlightRevalidate"), {
  loading: () => <FlightRevalidateLoader />,
})

const transformSearchParamsToFlights = (searchParams) => {
  const flights = {}
  Object.keys(searchParams).forEach((key) => {
    const match = key.match(/flights(\d)_(\d)/)
    if (match) {
      const segmentIndex = parseInt(match[1])
      const flightIndex = parseInt(match[2])
      if (!flights[segmentIndex]) {
        flights[segmentIndex] = []
      }
      const [flightNumber, departureAirportCode, arrivalAirportCode] =
        searchParams[`flights${segmentIndex}_${flightIndex}`].split("-")
      flights[segmentIndex].push({
        departure_time:
          searchParams[`departure_time${segmentIndex}_${flightIndex}`],
        departure_date:
          searchParams[`departure_date${segmentIndex}_${flightIndex}`],
        arrival_time:
          searchParams[`arrival_time${segmentIndex}_${flightIndex}`],
        arrival_date:
          searchParams[`arrival_date${segmentIndex}_${flightIndex}`],
        carrier_marketing_flight_number: parseInt(flightNumber),
        departure_airport_code: departureAirportCode,
        arrival_airport_code: arrivalAirportCode,
        carrier_marketing_code:
          searchParams[`carrier_marketing_code${segmentIndex}_${flightIndex}`],
        carrier_operating_code:
          searchParams[`carrier_operating_code${segmentIndex}_${flightIndex}`],
      })
    }
  })
  return flights
}

const formatParams = (searchParams, transformedFlights) => {
  let formattedParams
  if (searchParams["route"] === "oneway") {
    formattedParams = OneWayFormatter(searchParams)
  } else if (searchParams["route"] === "roundway") {
    formattedParams = RoundWayFormatter(searchParams)
  } else if (searchParams["route"] === "multiway") {
    formattedParams = MultiWayFormatter(searchParams)
  }

  const combinedParams = {
    ...formattedParams,
    OriginDestinationInformation:
      formattedParams.OriginDestinationInformation.map((info, index) => ({
        ...info,
        flight: transformedFlights[index] || [],
      })),
  }

  return combinedParams
}

async function FlightRevalidatePage({ params, searchParams }) {
  const transformedFlights = transformSearchParamsToFlights(searchParams)
  const formattedParams = formatParams(searchParams, transformedFlights)

  let res = await ReValidateFlightV2(formattedParams)
  return <FlightRevalidate flights={res.data!} ticketID={searchParams.ID} />
}
export default FlightRevalidatePage
