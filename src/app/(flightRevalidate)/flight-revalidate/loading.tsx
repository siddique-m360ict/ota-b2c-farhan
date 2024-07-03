"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import Image from "next/image"
import { hostedImage } from "@/lib/utils"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import TimeCounter from "@/components/common/TimeCounter"
import RevalidatePriceBox from "@/components/flight-revalidate/elements/RevalidatePriceBox"
import FlightRevalidateDetails from "@/components/flight-revalidate/FlightRevalidateDetails"
import { Icons } from "@/components/icons"
import RevalidateDetails from "@/components/flight-revalidate/elements/RevalidateDetails"
import { FormattedData } from "./FlightRevalidate"

const flights = {
  flight_id: "4b8f1d0c-7204-4cd5-8f5b-3b91be8ce3e1",
  fare: {
    commission: 0,
    base_fare: 11048,
    discount: 0,
    ait: 39,
    payable: 13037,
    total_price: 13037,
    total_tax: 1950,
  },
  refundable: [{ type: "ADT", refundable: true }],
  carrier_code: "BS",
  carrier_name: "US-Bangla Airlines",
  carrier_logo: "airlines/BS.png",
  ticket_last_date: "2024-06-12",
  ticket_last_time: "19:11",
  leg_descriptions: [
    {
      departureDate: "2024-06-18",
      departureLocation: "DAC",
      arrivalLocation: "CXB",
    },
    {
      departureDate: "2024-07-26",
      departureLocation: "CXB",
      arrivalLocation: "DAC",
    },
  ],
  flights: [
    {
      stoppage: 0,
      id: 2,
      elapsed_time: 65,
      options: [
        {
          id: 1,
          e_ticketable: true,
          elapsedTime: 65,
          stopCount: 0,
          total_miles_flown: 189,
          departure: {
            airport_code: "DAC",
            city_code: "DAC",
            airport: "Dhaka - Hazrat Shahjalal International Airport",
            city: "Dhaka - BANGLADESH",
            country: "BD",
            terminal: "D",
            time: "07:15:00+06:00",
            date: "2024-06-18T00:00:00.000Z",
          },
          arrival: {
            airport: "Cox's Bazar Airport",
            city: "Coxs Bazar - BANGLADESH",
            airport_code: "CXB",
            city_code: "CXB",
            country: "BD",
            time: "08:20:00+06:00",
            date: "2024-06-18T00:00:00.000Z",
          },
          carrier: {
            carrier_marketing_code: "BS",
            carrier_marketing_airline: "US-Bangla Airlines",
            carrier_marketing_logo: "airlines/BS.png",
            carrier_marketing_flight_number: 141,
            carrier_operating_code: "BS",
            carrier_operating_airline: "US-Bangla Airlines",
            carrier_operating_logo: "airlines/BS.png",
            carrier_operating_flight_number: 141,
            carrier_aircraft_code: "AT7",
            carrier_aircraft_name: "ATR TURBOPROP",
          },
        },
      ],
      layover_time: [0],
    },
    {
      stoppage: 0,
      id: 1,
      elapsed_time: 65,
      options: [
        {
          id: 2,
          e_ticketable: true,
          elapsedTime: 65,
          stopCount: 0,
          total_miles_flown: 189,
          departure: {
            airport_code: "CXB",
            city_code: "CXB",
            airport: "Cox's Bazar Airport",
            city: "Coxs Bazar - BANGLADESH",
            country: "BD",
            time: "12:05:00+06:00",
            date: "2024-07-26T00:00:00.000Z",
          },
          arrival: {
            airport: "Dhaka - Hazrat Shahjalal International Airport",
            city: "Dhaka - BANGLADESH",
            airport_code: "DAC",
            city_code: "DAC",
            country: "BD",
            time: "13:10:00+06:00",
            terminal: "D",
            date: "2024-07-26T00:00:00.000Z",
          },
          carrier: {
            carrier_marketing_code: "BS",
            carrier_marketing_airline: "US-Bangla Airlines",
            carrier_marketing_logo: "airlines/BS.png",
            carrier_marketing_flight_number: 146,
            carrier_operating_code: "BS",
            carrier_operating_airline: "US-Bangla Airlines",
            carrier_operating_logo: "airlines/BS.png",
            carrier_operating_flight_number: 146,
            carrier_aircraft_code: "AT7",
            carrier_aircraft_name: "ATR TURBOPROP",
          },
        },
      ],
      layover_time: [0],
    },
  ],
  passengers: [
    {
      type: "ADT",
      number: 1,
      non_refundable: false,
      availability: [
        {
          id: 1,
          from_airport: "DAC",
          to_airport: "CXB",
          segments: [
            {
              id: 1,
              name: "Segment-1",
              cabin_code: "Y",
              cabin_type: "Economy",
              booking_code: "T",
              available_seat: 9,
              available_break: true,
              available_fare_break: true,
            },
          ],
          baggage: { id: 1, unit: "kg", count: 20 },
        },
        {
          id: 2,
          from_airport: "CXB",
          to_airport: "DAC",
          segments: [
            {
              id: 1,
              name: "Segment-1",
              cabin_code: "Y",
              cabin_type: "Economy",
              booking_code: "T",
              available_seat: 9,
              available_break: true,
              available_fare_break: true,
            },
          ],
          baggage: { id: 1, unit: "kg", count: 20 },
        },
      ],
      fare: { total_fare: 12998, tax: 1950, base_fare: 11048 },
    },
  ],
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
      flights?.passengers[0].availability[0].segments[0].cabin_type +
      `(${flights?.passengers[0].availability[0].segments[0].booking_code})`
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

export const FlightRevalidateLoader = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen ">
          <div className="relative">
            <div className="mx-auto md:p-5">
              <div className="px-3 md:px-0">
                <div className="flex flex-col gap-5 md:container md:mt-5 md:flex-row">
                  {/* PaymentSidebar */}
                  <div className="order-2 mt-10 md:order-2 md:flex-1">
                    <div className="sticky top-6">
                      <TimeCounter className="shadow-md" />
                      <RevalidatePriceBox
                        passengers={flights.passengers}
                        fare={flights.fare}
                      />
                    </div>
                  </div>

                  <div className="order-1 flex-[2.5] space-y-5 md:order-1">
                    <FlightRevalidateDetails
                      data={revalidateData}
                      legDescriptions={flights?.leg_descriptions}
                      fare={flights.fare}
                      passengers={flights?.passengers}
                    />
                    {/* fare details */}
                    <section className="md:mt-8 md:px-0">
                      <div className="py-10">
                        <p className="mb-6 flex items-center gap-1 font-heading text-sm leading-4 text-destructive">
                          <Icons.BadgeCheck
                            size={18}
                            className="text-primary"
                          />
                          <span className="mt-[2px]">
                            Cabin and fare confirmed. Book now!
                          </span>
                        </p>
                        <p className="mb-2 font-heading text-[24px] font-bold text-secondary">
                          Your Ticket(s)
                        </p>
                        <RevalidateDetails passengers={flights?.passengers} />
                      </div>

                      <div>
                        <p className="mb-2 font-heading text-[24px] font-bold text-secondary">
                          Passenger Details
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {<LoadingIndicator className="backdrop-blur-[4px]" />}
      </div>
    </div>
  )
}
const loading = () => {
  return <FlightRevalidateLoader />
}

export default loading
