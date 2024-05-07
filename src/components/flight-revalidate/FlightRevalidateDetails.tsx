"use client"
import { FormattedData } from "@/app/(flightRevalidate)/flight-revalidate/FlightRevalidate"
import {
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import {
  LegDescription,
  Passenger,
  RevalidateFare,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import { hostedImage } from "@/lib/utils"
import Image from "next/image"
import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import FlightContentExtraInfo from "../flight-search/elements/FlightContentExtraInfo"

type Props = {
  data: FormattedData[]
  legDescriptions: LegDescription[] | undefined
  fare: RevalidateFare
  passengers: Passenger[]
}
const FlightRevalidateDetails = ({
  data,
  legDescriptions,
  fare,
  passengers,
}: Props) => {
  return (
    <div>
      <div>
        <h1 className="mb-4 text-lg font-bold text-secondary md:mb-6 md:text-[2rem] md:leading-5">
          Trip to {data[0].arrival_cityName}
        </h1>
        {data.map((item, index) => (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex flex-row items-center gap-3 md:gap-4">
                <Button className="rounded text-sm md:h-7 md:px-3 md:py-0">
                  {item.label}
                </Button>
                <p className="text-sm">
                  {legDescriptions?.map((leg, index) => (
                    <p key={index}>
                      {item.label ===
                        leg.departureLocation + "-" + leg.arrivalLocation &&
                        leg.departureDate}
                    </p>
                  ))}
                </p>
                <Separator
                  orientation="vertical"
                  className="h-[1.9vh] w-[1px]"
                />
                <p className="text-sm">
                  Duration {minutesToHoursAndMinutes(item.elapsed_time)?.time}
                </p>
              </div>
            </div>
            <div className="md:pb-4">
              {item.content.map((flight, index) => (
                <div
                  key={index}
                  className="mb-7 flex items-center gap-6 md:mb-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <p className="font-bold text-secondary md:text-lg">
                        {timeSlice(flight.departure?.time)}
                      </p>
                      <Image
                        src={hostedImage(
                          `/${flight.carrier?.carrier_marketing_logo}`
                        )}
                        alt="airline_logo"
                        width={40}
                        height={40}
                      />
                      <p className="font-bold text-secondary md:text-lg">
                        {timeSlice(flight.arrival?.time)}
                      </p>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-[9vh] w-[5px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="md:text-md text-sm font-bold text-secondary">
                      {flight.departure?.airport}
                    </p>
                    <p className="flex flex-wrap gap-0 space-x-4 text-xs text-destructive md:gap-3 md:text-sm">
                      <span>{flight.carrier?.carrier_marketing_airline}</span>
                      <span>
                        {flight.carrier?.carrier_marketing_code} (
                        {flight.carrier?.carrier_marketing_flight_number})
                      </span>
                      <span>{item.flight_class}</span>
                      <span>
                        {item.refundable ? "Refundable" : "Nonrefundable"}
                      </span>
                    </p>
                    <p className="md:text-md text-sm font-bold text-secondary ">
                      {flight.arrival?.airport}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* fare details */}
      <div className="md:mt-16">
        <Card>
          <CardHeader>
            <p className="text-lg font-bold text-secondary">Fare Details</p>
          </CardHeader>
          <CardContent>
            <FlightContentExtraInfo fare={fare} passengers={passengers} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FlightRevalidateDetails
