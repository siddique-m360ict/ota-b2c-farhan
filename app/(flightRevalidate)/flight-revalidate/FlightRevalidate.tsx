import RevalidatePriceBox from "@/components/flight-revalidate/elements/RevalidatePriceBox"
import FlightRevalidateDetails from "@/components/flight-revalidate/FlightRevalidateDetails"
import {
  IRevalidated,
  Option,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import React from "react"

type Props = {
  flights: IRevalidated
}

export interface FormattedData {
  label: string
  elapsed_time: number
  flight_class: string
  arrival_cityName: string | undefined
  refundable: boolean
  layover: any
  content: Option[]
}

const FlightRevalidate = ({ flights }: Props) => {
  // make data
  let revalidateData: FormattedData[] = []
  flights?.flights?.length &&
    flights?.flights?.map((flight, index) => {
      let departure_airport = flight?.options[0].departure?.airport_code
      let arrival_airport =
        flight.options[flight.options.length - 1].arrival?.airport_code
      let arrival_cityName =
        flight.options[flight.options.length - 1].arrival?.city

      let content = flight.options
      let layover = flight?.layover_time
      let elapsed_time = flight?.elapsed_time
      let flight_class =
        flights?.passengers[0].cabin_type +
        `(${flights?.passengers[0].cabin_code})`
      let refundable = flights?.refundable[0].refundable

      const makeData = {
        label: departure_airport + "-" + arrival_airport,
        elapsed_time: elapsed_time,
        flight_class: flight_class,
        arrival_cityName: arrival_cityName,
        refundable: refundable,
        layover,
        content,
      }
      revalidateData.push(makeData)
    })

  return (
    <div className="pb-40">
      <div className="container mx-auto py-5">
        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          {/* PaymentSidebar */}
          <div className="order-1 md:order-2 md:flex-1">
            <RevalidatePriceBox
              passengers={flights.passengers}
              fare={flights.fare}
            />
          </div>

          <div className="order-2 flex-[2.5] space-y-5 md:order-1">
            <FlightRevalidateDetails
              data={revalidateData}
              legDescriptions={flights?.leg_descriptions}
              fare={flights.fare}
              passengers={flights?.passengers}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightRevalidate
