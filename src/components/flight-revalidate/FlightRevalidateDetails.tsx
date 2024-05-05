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
import FlightContentExtraInfo from '../flight-search/elements/FlightContentExtraInfo'

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
        <h1 className="mb-6 text-[1.5rem] font-bold text-secondary">
          Trip to {data[0].arrival_cityName}
        </h1>
        {data.map((item, index) => (
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex flex-row items-center gap-4">
                <Button className="h-7 rounded px-3 py-0 text-sm">
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
            <div className="pb-4">
              {item.content.map((flight, index) => (
                <div key={index} className="mb-6 flex items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <p className="text-lg font-bold text-secondary">
                        {timeSlice(flight.departure?.time)}
                      </p>
                      <Image
                        src={hostedImage(
                          `/${flight.carrier?.carrier_marketing_logo}`
                        )}
                        alt="airline_logo"
                        width={45}
                        height={45}
                      />
                      <p className="text-lg font-bold text-secondary">
                        {timeSlice(flight.arrival?.time)}
                      </p>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-[9vh] w-[5px]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-secondary">
                      {flight.departure?.airport}
                    </p>
                    <p className="flex gap-3 text-sm text-destructive">
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
                    <p className="font-bold text-secondary">
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

      <div className="mt-16">
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
