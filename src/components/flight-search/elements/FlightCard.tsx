"use client"
import {
  Fare,
  Flight,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn, hostedImage } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { buttonVariants } from "@/components/ui/button"
import {
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { AccordionTrigger } from "@/components/ui/accordion"
import { useMediaQuery } from "@/hooks/use-media-query"

type Props = {
  flights: Result
  fare: Fare
}
const FlightCard = ({ flights, fare }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  return (
    <div className="relative flex items-center justify-between gap-4 py-3">
      <div className="w-full  basis-10/12">
        {flights?.flights?.map((flights, index) => (
          <AccordionTrigger
            className="top-0  py-0 hover:no-underline [&>svg]:hidden"
            key={index}
          >
            <div className="flex w-full gap-4 md:gap-0">
              <div className="flex basis-3/12 flex-col items-center md:basis-8/12  md:flex-row md:gap-2">
                <Image
                  className="h-auto max-w-24 rounded"
                  src={hostedImage(
                    `/${flights?.options[0]?.carrier?.carrier_marketing_logo}`
                  )}
                  alt="airline_image"
                  width={isDesktop ? 55 : 30}
                  height={isDesktop ? 55 : 30}
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
                />
                <p className="flex flex-col items-start ">
                  <span className="text-[9px] text-secondary md:text-sm md:text-black">
                    {flights?.options[0]?.carrier?.carrier_marketing_airline}
                  </span>
                  <span className="hidden text-xs text-destructive md:block">
                    {flights?.options[0]?.carrier?.carrier_marketing_code} (
                    {
                      flights?.options[0]?.carrier
                        ?.carrier_marketing_flight_number
                    }
                    )
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
          </AccordionTrigger>
        ))}
      </div>

      <div className="relative  basis-3/12">
        <div className="w-full md:ps-4">
          <div className="text-end">
            <p className="mr-2 text-xs text-destructive line-through">
              ৳ {fare?.total_price}
            </p>
            <p className="text-sm">৳ {fare?.payable} </p>
          </div>
          <Link
            href={`/flight-revalidate?flight=${flights.flight_id}`}
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
        className="absolute right-[25%] top-0  h-[100%] w-[1px]"
      />
    </div>
  )
}

export default FlightCard
