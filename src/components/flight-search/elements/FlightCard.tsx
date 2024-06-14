"use client"
import {
  Fare,
  Flight,
  IAirportList,
  Option,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn, formatNumber, hostedImage } from "@/lib/utils"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { AccordionTrigger } from "@/components/ui/accordion"
import { useMediaQuery } from "@/hooks/use-media-query"
import MobileFlightCard from "./MobileFlightCard"
import { addDays, format } from "date-fns"
import { usePathname } from "next/navigation"
import { Passenger } from "@/components/home/FlightSearch"

type Props = {
  flights: Result
  fare: Fare
}
const FlightCard = ({ flights: FlightData, fare }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [fromAirport, setFromAirport] = React.useState<IAirportList | null>({
    id: 210,
    country_id: 18,
    country: "BANGLADESH",
    name: "Dhaka - Hazrat Shahjalal International Airport",
    iata_code: "DAC",
  })
  const [toAirport, setToAirport] = React.useState<IAirportList | null>({
    id: 2061,
    country_id: 18,
    country: "BANGLADESH",
    name: "Cox's Bazar Airport",
    iata_code: "CXB",
  })
  const [date, setDate] = React.useState<Date>(addDays(new Date(), 3))
  const pathName = usePathname()
  const [passenger, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })
  const [cabinClass, setCabinClass] = useState<string>("Y")

  useEffect(() => {
    if (window !== undefined) {
      const searchFlightOneWay = JSON.parse(
        localStorage.getItem("oneWayFlights")
      )
      const passenger = JSON.parse(localStorage.getItem("passenger"))
      const cabinClass = localStorage.getItem("class")

      if (searchFlightOneWay && Object.keys(searchFlightOneWay).length > 0) {
        setFromAirport(searchFlightOneWay?.fromAirport)
        setToAirport(searchFlightOneWay?.toAirport)
        setDate(new Date(searchFlightOneWay.date))
      }
      if (passenger) {
        setPassenger(passenger)
      }
      if (cabinClass) {
        setCabinClass(cabinClass)
      }
    }
  }, [pathName])

  //  MAKE URL
  const transformFlightData = (results: Result) => {
    return results.flights.flatMap((flight) =>
      flight.options.map((option: Option) => ({
        departure_time: option.departure.time,
        departure_date: option.departure.date,
        arrival_time: option.arrival.time,
        arrival_date: option.arrival.date,
        carrier_marketing_flight_number:
          option.carrier.carrier_marketing_flight_number,
        departure_airport_code: option.departure.airport_code,
        arrival_airport_code: option.arrival.airport_code,
        carrier_marketing_code: option.carrier.carrier_marketing_code,
        carrier_operating_code: option.carrier.carrier_operating_code,
      }))
    )
  }

  const generateQueryParams = (
    flightData,
    fromAirport,
    toAirport,
    date,
    passenger,
    cabinClass
  ) => {
    const transformedFlights = transformFlightData(flightData)

    const flightParams = transformedFlights
      .map((flight, index) => {
        return `flights${index}=${flight.carrier_marketing_flight_number}-${flight.departure_airport_code}-${flight.arrival_airport_code}&departure_time${index}=${flight.departure_time}&departure_date${index}=${flight.departure_date}&arrival_time${index}=${flight.arrival_time}&arrival_date${index}=${flight.arrival_date}&carrier_marketing_code${index}=${flight.carrier_marketing_code}&carrier_operating_code${index}=${flight.carrier_operating_code}`
      })
      .join("&")

    const queryParams = `ID=${FlightData.flight_id}&origin=${
      fromAirport?.iata_code
    }&destination=${toAirport?.iata_code}&departuredate=${
      date ? format(new Date(date), "yyyy-MM-dd") : ""
    }&adults=${passenger.adult.toString()}${
      passenger.children !== 0 ? `&child=${passenger.children.toString()}` : ""
    }${passenger.infant !== 0 ? `&infant=${passenger.infant.toString()}` : ""}${
      passenger.kids !== 0 ? `&kids=${passenger.kids.toString()}` : ""
    }&class=${cabinClass}&route=oneway&${flightParams}`

    return queryParams
  }

  const queryParams = generateQueryParams(
    FlightData,
    fromAirport,
    toAirport,
    date,
    passenger,
    cabinClass
  )

  return (
    <div className="relative items-center  justify-between gap-4 md:flex md:py-3">
      <div className="flex items-center gap-2 px-3 pb-2 pt-3 md:hidden">
        <Image
          className="h-auto max-w-24 rounded"
          src={hostedImage(`/${FlightData.carrier_logo}`)}
          alt="airline_image"
          width={20}
          height={20}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
        />
        <p className="text-start text-xs">{FlightData.carrier_name}</p>
      </div>

      <div className="h-full w-full basis-10/12">
        <AccordionTrigger
          className={cn(
            "top-0 flex-col py-0 hover:no-underline md:flex [&>svg]:absolute [&>svg]:bottom-[17px] [&>svg]:left-[76%] [&>svg]:text-destructive [&>svg]:md:block md:[&>svg]:text-primary ",
            FlightData?.flights.length < 2
              ? "[&>svg]:bottom-[12px] md:[&>svg]:bottom-[17px]"
              : "[&>svg]:bottom-[1.2vh] md:[&>svg]:bottom-[4.5vh]"
          )}
        >
          {FlightData?.flights?.map((flights, index) => (
            <>
              <div
                className="mb-2 hidden w-full gap-4 md:flex md:gap-0"
                key={index}
              >
                <div className="flex basis-3/12 flex-col items-center md:basis-8/12 md:flex-row md:gap-4">
                  <Image
                    className="h-auto max-w-24 rounded"
                    src={hostedImage(`/${FlightData.carrier_logo}`)}
                    alt="airline_image"
                    width={isDesktop ? 55 : 30}
                    height={isDesktop ? 55 : 30}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
                  />
                  <p className="flex flex-col items-start gap-1">
                    <span className="text-[9px] text-secondary md:text-sm   ">
                      {FlightData.carrier_name}
                    </span>
                  </p>
                </div>

                <div className="flex basis-full items-center gap-6">
                  <div>
                    <p className="md:text-[20px] md:font-bold">
                      {timeSlice(flights?.options[0]?.departure?.time)}
                    </p>
                    <p className="text-destructive">
                      {flights?.options[0]?.departure?.airport_code}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs">
                      {minutesToHoursAndMinutes(flights?.elapsed_time)?.time}
                    </p>
                    <div className="relative my-1 w-full border border-b md:w-[10vw]">
                      <div className="absolute left-[-1px] top-[-3px] hidden h-[6px] w-[6px] bg-muted md:block"></div>
                      <div className="absolute right-[-1px] top-[-3px] hidden h-[6px] w-[6px] bg-muted md:block"></div>
                    </div>
                    <p className="text-xs">
                      {flights?.stoppage + " Stop" || "Nonstop"}
                    </p>
                  </div>
                  <div>
                    <p className="md:text-[20px] md:font-bold">
                      {timeSlice(
                        flights?.options[flights?.options.length - 1]?.arrival
                          ?.time
                      )}
                    </p>
                    <p className="text-destructive">
                      {
                        flights?.options[flights?.options.length - 1]?.arrival
                          ?.airport_code
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="block w-full md:hidden">
                <MobileFlightCard
                  flights={flights}
                  fare={fare}
                  airLogo={FlightData.carrier_logo}
                  airName={FlightData.carrier_name}
                />
              </div>
            </>
          ))}
        </AccordionTrigger>
      </div>

      <div className="mt-2 flex items-center justify-between px-2 pb-2 md:hidden">
        <div className="flex items-center gap-2">
          <p className="flex items-center justify-end gap-1 text-[15px] font-[600] text-primary">
            <span className="font-mono text-[15px] ">৳</span>
            {formatNumber(fare?.payable)}
          </p>
          <p className="text-[12px] text-destructive line-through">
            <span className="font-mono">৳</span>
            {formatNumber(fare?.total_price)}
          </p>
        </div>
        <div>
          <Link
            href={`/flight-revalidate?ID=${FlightData.flight_id}`}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "mt-1 h-6 w-full rounded px-4 text-white md:h-7"
            )}
          >
            View <span className="ms-[3px] hidden md:block">Deal</span>
          </Link>
        </div>
      </div>

      <div className="relative hidden basis-3/12 md:block">
        <div className="w-full md:ps-4">
          <div className="text-end">
            <p className="flex items-center justify-end gap-1 text-[18px] font-[600]">
              <span className="font-mono text-[15px]">৳</span>
              {formatNumber(fare?.payable)}
            </p>
            <p className="mr-2 text-[12px] text-destructive line-through">
              <span className="font-mono">৳</span>
              {formatNumber(fare?.total_price)}
            </p>
          </div>
          <Link
            href={`/flight-revalidate?${queryParams}`}
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "mt-1 h-6 w-full rounded text-white md:h-7"
            )}
          >
            View <span className="ms-[3px] hidden md:block">Deal</span>
          </Link>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="absolute right-[25%] top-0 hidden h-[100%]  w-[1px] md:block"
      />
    </div>
  )
}

export default FlightCard
