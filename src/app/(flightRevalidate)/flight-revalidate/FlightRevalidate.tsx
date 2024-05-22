import { getTravelers } from "@/app/(dashboard)/dashboard/(travelers)/actions"
import { Travelers } from "@/components/Dashboard/traveler/addTravelerForm"
import LoginModal from "@/components/flight-revalidate/elements/LoginModal"
import RevalidateDetails from "@/components/flight-revalidate/elements/RevalidateDetails"
import RevalidatePriceBox from "@/components/flight-revalidate/elements/RevalidatePriceBox"
import TravelerForm from "@/components/flight-revalidate/elements/TravelerForm"
import FlightRevalidateDetails from "@/components/flight-revalidate/FlightRevalidateDetails"
import { Icons } from "@/components/icons"
import {
  IRevalidated,
  Option,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import { getCookies } from "@/lib/token/getCookies"
import React from "react"

type Props = {
  flights: IRevalidated
  ticketID: string
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

const FlightRevalidate = async ({ flights, ticketID }: Props) => {
  const token = await getCookies()
  let travelers: Travelers[] = []
  if (token) {
    const data = await getTravelers(token)
    travelers = [...travelers, ...data.data]
  }

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
    <>
      <div className="">
        <div className="mx-auto md:p-5">
          <div className="px-4 md:px-0">
            <div className="flex flex-col gap-5 md:container md:mt-5 md:flex-row">
              {/* PaymentSidebar */}
              <div className="sticky top-6 order-2 md:order-2 md:flex-1">
                <RevalidatePriceBox
                  passengers={flights.passengers}
                  fare={flights.fare}
                />
              </div>

              <div className="order-1 flex-[2.5] space-y-5 md:order-1">
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
        {/* fare details */}
        <section className="bg-background px-4 md:mt-8 md:px-0">
          <div className="flex py-10 md:container">
            <div className="flex-[2.5]">
              <p className="mb-6 flex items-center gap-1 font-heading text-sm leading-4 text-destructive">
                <Icons.BadgeCheck size={18} className="text-primary" />
                <span className="mt-[2px]">
                  Cabin and fare confirmed. Book now!
                </span>
              </p>
              <p className="mb-2 font-heading text-[24px] font-bold text-secondary">
                Your Ticket(s)
              </p>
              <RevalidateDetails passengers={flights?.passengers} />
            </div>
            <div className="md:flex-1"></div>
          </div>
          <div className="flex py-8 md:container">
            <div className="flex-[2.5]">
              <p className="mb-2 font-heading text-[24px] font-bold text-secondary">
                Passenger Details
              </p>
              <TravelerForm
                passengers={flights?.passengers}
                ticketID={ticketID}
                token={token}
                travelers={travelers}
              />
            </div>
            <div className="md:flex-1"></div>
          </div>
        </section>
      </div>
    </>
  )
}

export default FlightRevalidate
