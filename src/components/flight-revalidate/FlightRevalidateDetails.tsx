"use client"
import { FormattedData } from "@/app/(flightRevalidate)/flight-revalidate/FlightRevalidate"
import {
  convertMinutesToHM,
  formatFlightDate,
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import {
  LegDescription,
  Passenger,
  RevalidateFare,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import { cn, hostedImage } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

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
      <div className="w-full bg-secondaryBg">
        <h1 className="mb-4 text-center text-lg font-bold uppercase text-primary md:mb-6 md:text-[1.8rem] md:leading-5">
          Trip to {data[0].arrival_cityName}
        </h1>
        <div className="w-full rounded-[8px] border border-[#E4E6E8] p-4 dark:border-[#303f42]">
          {data.map((item, index) => (
            <div className="revalidate-card mb-4 flex flex-col gap-2 after:bg-[#dddddd] dark:after:bg-[#333c3d]">
              <div className="mb-1 border-b pb-1">
                <div className="flex flex-row items-center justify-center gap-2">
                  <button className="rounded text-sm font-bold text-primary md:h-7 ">
                    {item.label}
                  </button>
                  <p className="text-gray-400">|</p>
                  <p className="flex gap-1 text-sm">
                    Date :
                    {legDescriptions?.map((leg, index) => (
                      <p key={index}>
                        {item.label ===
                          leg.departureLocation + "-" + leg.arrivalLocation &&
                          leg.departureDate}
                      </p>
                    ))}
                  </p>
                </div>
              </div>
              <div className="">
                {item.content.map((flight, index) => (
                  <>
                    <div key={index}>
                      <div className="mb-1 flex items-center justify-between border-b pb-2">
                        <div className="flex gap-3 ">
                          <Image
                            src={hostedImage(
                              `/${flight.carrier?.carrier_marketing_logo}`
                            )}
                            alt="airline_logo"
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className="text-sm">
                              {flight.carrier?.carrier_marketing_airline}
                            </p>
                            <div className="mt-[2px] flex gap-1 text-xs text-gray-600">
                              <p>
                                {flight.carrier?.carrier_marketing_code}{" "}
                                {
                                  flight.carrier
                                    ?.carrier_marketing_flight_number
                                }
                              </p>
                              <p>|</p>
                              <p>{item.flight_class}</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs">
                            {!item.refundable ? "nonrefundable" : "Refundable"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center justify-between gap-4 pb-3 md:flex-row">
                        <div className="w-full text-start ">
                          <div className="text-sm font-semibold text-primary md:text-lg  ">
                            {flight?.departure.airport_code} -{" "}
                            {timeSlice(flight?.departure.time)}
                          </div>
                          <div className="text-xs">
                            {formatFlightDate(flight?.departure.date)}
                          </div>
                          <div className="w-4/5 truncate text-xs ">
                            {flight?.departure.airport}
                          </div>
                        </div>

                        <div className="flex basis-full items-center justify-center text-center">
                          <div>
                            <p className="text-xs">
                              {
                                minutesToHoursAndMinutes(flight?.elapsedTime)
                                  ?.time
                              }
                            </p>
                            <div className="relative my-1 w-[60vw] border md:w-[10vw]">
                              <div className="absolute -left-px top-[-3px] size-[6px] rounded-full bg-primary"></div>
                              <div className="absolute -right-px top-[-3px] size-[6px] rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col text-start md:items-end">
                          <div className="text-sm font-semibold text-primary md:text-lg">
                            {flight?.arrival.airport_code}-{" "}
                            {timeSlice(flight?.arrival.time)}
                          </div>
                          <div className="text-xs ">
                            {formatFlightDate(flight.arrival.date)}
                          </div>
                          <div className="max-w-[80%] truncate text-xs ">
                            {flight?.arrival?.airport}
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.layover[index] !== 0 && (
                      <div className="mb-6 mt-3">
                        <p className="rounded bg-[#f5f9ff] p-1 text-center text-xs text-black dark:bg-black dark:text-white">
                          Layover at <span>{flight.arrival?.airport}</span>
                          <span className="ml-1 font-bold">
                            {convertMinutesToHM(item.layover[index])}
                          </span>
                        </p>
                      </div>
                    )}
                  </>
                ))}
              </div>
              <div className="revalidate-end before:bg-[#66a1c5]"></div>

              <p
                className={`leading-0 text-ads-middle overflow-hidden font-bold ${
                  minutesToHoursAndMinutes(item.elapsed_time)?.time.length > 7
                    ? "left-[-45px]"
                    : "left-[-40px]"
                }`}
              >
                {minutesToHoursAndMinutes(item.elapsed_time)?.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FlightRevalidateDetails
