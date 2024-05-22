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

const fare = {
  commission: 0,
  base_fare: 10220,
  discount: 0,
  ait: 39,
  payable: 12984,
  total_price: 12984,
  total_tax: 2625,
}

const data = [
  {
    label: "CXB-DAC",
    elapsed_time: 65,
    flight_class: "Economy(Y)",
    arrival_cityName: "Dhaka - BANGLADESH",
    refundable: true,
    layover: ["00:00:00"],
    content: [
      {
        id: 1,
        e_ticketable: true,
        elapsedTime: 65,
        stopCount: 0,
        total_miles_flown: 189,
        departure: {
          airport: "Dhaka - Hazrat Shahjalal International Airport",
          city: "Dhaka - BANGLADESH",
          airport_code: "DAC",
          city_code: "DAC",
          country: "BD",
          time: "11:40:00+06:00",
          terminal: "D",
          date: "2024-05-24T00:00:00.000Z",
        },
        arrival: {
          airport_code: "CXB",
          city_code: "CXB",
          airport: "Cox's Bazar Airport",
          city: "Coxs Bazar - BANGLADESH",
          country: "BD",
          time: "10:35:00+06:00",
          date: "2024-05-24T00:00:00.000Z",
        },

        carrier: {
          carrier_marketing_code: "BS",
          carrier_marketing_airline: "US-Bangla Airlines",
          carrier_marketing_logo: "airlines/BS.png",
          carrier_marketing_flight_number: 144,
          carrier_operating_code: "BS",
          carrier_operating_airline: "US-Bangla Airlines",
          carrier_operating_logo: "airlines/BS.png",
          carrier_operating_flight_number: 144,
        },
      },
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
          time: "10:35:00+06:00",
          date: "2024-05-24T00:00:00.000Z",
        },
        arrival: {
          airport: "Dhaka - Hazrat Shahjalal International Airport",
          city: "Dhaka - BANGLADESH",
          airport_code: "DAC",
          city_code: "DAC",
          country: "BD",
          time: "11:40:00+06:00",
          terminal: "D",
          date: "2024-05-24T00:00:00.000Z",
        },

        carrier: {
          carrier_marketing_code: "BS",
          carrier_marketing_airline: "US-Bangla Airlines",
          carrier_marketing_logo: "airlines/BS.png",
          carrier_marketing_flight_number: 144,
          carrier_operating_code: "BS",
          carrier_operating_airline: "US-Bangla Airlines",
          carrier_operating_logo: "airlines/BS.png",
          carrier_operating_flight_number: 144,
        },
      },
      {
        id: 3,
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
          time: "10:35:00+06:00",
          date: "2024-05-24T00:00:00.000Z",
        },
        arrival: {
          airport: "Dhaka - Hazrat Shahjalal International Airport",
          city: "Dhaka - BANGLADESH",
          airport_code: "DAC",
          city_code: "DAC",
          country: "BD",
          time: "11:40:00+06:00",
          terminal: "D",
          date: "2024-05-24T00:00:00.000Z",
        },

        carrier: {
          carrier_marketing_code: "BS",
          carrier_marketing_airline: "US-Bangla Airlines",
          carrier_marketing_logo: "airlines/BS.png",
          carrier_marketing_flight_number: 144,
          carrier_operating_code: "BS",
          carrier_operating_airline: "US-Bangla Airlines",
          carrier_operating_logo: "airlines/BS.png",
          carrier_operating_flight_number: 144,
        },
      },
    ],
  },
]

export const FlightRevalidateLoader = () => {
  return (
    <div>
      <div className="min-h-screen ">
        <div className="container mx-auto py-5">
          <div className="mt-5 flex flex-col gap-5 md:flex-row">
            <div className="order-1 md:order-2 md:flex-1">
              <div>
                <Card className="border-none shadow-2xl">
                  <CardHeader className="px-6  py-4">
                    <h1 className="text-[1.2rem] font-bold ">Price Details</h1>
                  </CardHeader>
                  <CardContent>
                    <p className="pb-8 text-sm text-destructive">
                      All prices are in{" "}
                      <span className="font-bold  text-[#8592a6]">
                        Bangladeshi taka
                      </span>
                    </p>
                    <div>
                      <h2 className="mb-3 mt-2 text-sm font-bold text-secondary">
                        Fare Summary
                      </h2>
                      <div className="mb-[7px] flex justify-between text-sm">
                        <p className="border-b border-dashed">Base Fare</p>
                        <p>{fare.base_fare}</p>
                      </div>
                      <div className=" mb-[7px]  flex justify-between text-sm">
                        <p className="border-b border-dashed">Tax</p>
                        <p>{fare.total_tax}</p>
                      </div>
                      <div className=" mb-[7px]  flex justify-between text-sm">
                        <p className="border-b border-dashed">AIT</p>
                        <p>{fare.ait}</p>
                      </div>
                      <div className="mb-[7px]  flex justify-between text-sm line-through">
                        <p className="border-b border-dashed">Total Price</p>
                        <p>{fare.total_price}</p>
                      </div>
                      <div className="mb-[7px]  flex justify-between text-sm">
                        <p className="border-b border-dashed">Discount</p>
                        <p>{fare.discount}</p>
                      </div>
                    </div>
                  </CardContent>
                  <div className="mx-4 mt-2 h-[1px] w-[90%] border border-dashed bg-secondaryBg"></div>
                  <CardFooter className="my-6 flex flex-row justify-between text-xl font-bold ">
                    <p>Payable</p>
                    <p className="text-primary">৳ {fare.payable}</p>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className="order-2 flex-[2.5] space-y-5 md:order-1">
              <div>
                <div>
                  <h1 className="mb-4  text-lg font-bold uppercase text-secondary md:mb-6 md:text-[2rem] md:leading-5">
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
                            {/* {legDescriptions?.map((leg, index) => (
                    <p key={index}>
                      {item.label ===
                        leg.departureLocation + "-" + leg.arrivalLocation &&
                        leg.departureDate}
                    </p>
                  ))} */}
                          </p>
                          <Separator
                            orientation="vertical"
                            className="h-[1.9vh] w-[1px]"
                          />
                          <p className="text-sm">
                            Duration{" "}
                            {minutesToHoursAndMinutes(item.elapsed_time)?.time}
                          </p>
                        </div>
                      </div>
                      <div className="md:pb-4">
                        {item.content.map((flight, index) => (
                          <div
                            key={index}
                            className="mb-7 flex items-center gap-6 md:mb-8"
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
                                <span>
                                  {flight.carrier?.carrier_marketing_airline}
                                </span>
                                <span>
                                  {flight.carrier?.carrier_marketing_code} (
                                  {
                                    flight.carrier
                                      ?.carrier_marketing_flight_number
                                  }
                                  )
                                </span>
                                <span>{item.flight_class}</span>
                                <span>
                                  {item.refundable
                                    ? "Refundable"
                                    : "Nonrefundable"}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {<LoadingIndicator className="backdrop-blur-[4px]" />}
    </div>
  )
}
const loading = () => {
  return <FlightRevalidateLoader />
}

export default loading
