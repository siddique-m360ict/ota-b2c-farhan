"use client"
import { Flight } from "@/components/home/elements/types/flightSearchType"
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
import { pricingInfo } from "../FlightListCard"
type Props = {
  flights: Flight
  pricingInfo: pricingInfo
}
const FlightCard = ({ flights, pricingInfo }: Props) => {
  return (
    <Card className="shadow-2xlo w-full rounded border-none">
      <CardContent className="py-3 ">
        <div className="flex items-center justify-between gap-4">
          <div className="flex basis-9/12 items-center gap-2">
            <Image
              className="h-auto max-w-24 rounded"
              src={hostedImage(`/${flights?.options[0]?.logo}`)}
              alt="airline_image"
              width={"55"}
              height={"55"}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
            />
            <span className="text-sm ">{flights?.options[0]?.name}</span>
          </div>

          <div className="flex basis-full items-center gap-4">
            <div>
              <p className=" text-[20px] font-bold">
                {timeSlice(flights?.options[0]?.departure_time)}
              </p>
              <p className="text-destructive">
                {flights?.options[0]?.departure_airport}
              </p>
            </div>

            <div>
              <p className="text-sm">
                {minutesToHoursAndMinutes(flights?.elapsedTime)?.time}
              </p>
              <div className="relative my-1 w-[10vw] border border-b">
                <div className="absolute left-[-1px] top-[-3px] h-[6px] w-[6px] bg-muted"></div>
                <div className="absolute right-[-1px] top-[-3px] h-[6px] w-[6px] bg-muted"></div>
              </div>
              <p className="text-xs">
                {flights?.stoppage + "stop" || "Direct"}
              </p>
            </div>
            <div>
              <p className=" text-[20px] font-bold">
                {timeSlice(
                  flights?.options[flights?.options.length - 1]?.arrival_time
                )}
              </p>
              <p className="text-destructive">
                {flights?.options[flights?.options.length - 1]?.arrival_airport}
              </p>
            </div>
          </div>

          <div className="relative basis-6/12  ">
            <Separator
              orientation="vertical"
              className="absolute top-[-14px] h-[9vh] w-[1px]"
            />
            <div className="ps-4">
              <div className="text-end">
                <p className="mr-2 text-xs text-destructive line-through">
                  {pricingInfo.currency} {pricingInfo.totalPrice}
                </p>
                <p className="text-sm"> {pricingInfo.currency} 12000 </p>
              </div>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "mt-1 h-7 w-full  rounded"
                )}
              >
                View Deal
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FlightCard
