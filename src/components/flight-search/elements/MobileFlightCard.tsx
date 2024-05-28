import { Flight } from "@/app/(flightRevalidate)/actions"
import { Fare } from "@/components/home/elements/types/flightSearchType"
import { Separator } from "@/components/ui/separator"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  formatFlightDate,
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import { formatNumber, hostedImage } from "@/lib/utils"
import Image from "next/image"
import React from "react"

type Props = {
  flights: Flight
  fare: Fare
  airLogo: string
  airName: string
}
const MobileFlightCard = ({ flights, fare, airLogo, airName }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  return (
    <div className="rounded-lg bg-white px-4 py-2 dark:rounded-none dark:bg-black">
      <div className="flex w-full items-center justify-between gap-6">
        <div className="flex flex-col items-start">
          <p className=" text-[14px]  font-bold leading-4">
            {timeSlice(flights?.options[0]?.departure?.time)}
          </p>
          <p className="text-[12px]">
            {flights?.options[0]?.departure?.city.split("-")[0]}
          </p>
          <p className="text-[11px] text-destructive">
            {formatFlightDate(flights?.options[0]?.departure?.date)}
          </p>
        </div>
        <div>
          <p className="text-xs font-bold">
            {minutesToHoursAndMinutes(flights?.elapsed_time)?.time}
          </p>
          <div className="mobileAirLogo relative flex w-full items-center md:w-[10vw]">
            <Image
              className="h-auto max-w-24 rounded"
              src={hostedImage(`/${airLogo}`)}
              alt="airline_image"
              width={27}
              height={27}
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRngDAABXRUJQVlA4WAoAAAAgAAAAiAAAiAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggigEAAFAPAJ0BKokAiQA+7WaqTq01KKYumKtCoB2JZW7f+jwBwDiCr0Tt0Gy29sF5YFQjh9O84IStpshDU2KUryMR5lpzIBAiBBWUYV1UK62+nXZ5bGX4xxIU+U+cPzN8DXJ07YxMLmVCOhQbWZXrypCNt5B5zz/+7j9NlJxM8xcS//rr8GQAAP7wzJuF/q2WlbU9eOABfO/yU8HX/0qTIkJD2RBqfvUNYhE62jMc981x+r6aKUmeG7cpFHNR85rfxZLNlmO9f8pVl880VBDHUhLtWNgSxZFagJ7RmDGBUhRmCQcCE34Crds2Et5OiI21ogo03hTZNSxolshS+Orsj1u3hBIWhQt3+B9hHvvfOFWjo4K7Mnct5FT9j+/UWUrxzP4RmjIaIa0orxNPUSqpQc9b/HzcBj9cnvEFR4RH4zrXpUJJvLk3fLRp8KpIF8DUzGfLG0/bI2J5dqKKYerl1AAgwwhF67t7xoI1NhrfeH/NzS1Wt/GcvuwQCuDMbqx7QoOaB3dniQ9TdRMAAAA="
            />
          </div>
          <p className="text-[11px]">
            {flights?.stoppage > 0 ? flights?.stoppage + " Stop" : "Nonstop"}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <p className="leading-2 text-[14px] font-bold">
            {timeSlice(
              flights?.options[flights?.options.length - 1]?.arrival?.time
            )}
          </p>
          <p className="text-[12px] ">
            {
              flights?.options[
                flights?.options.length - 1
              ]?.arrival?.city.split("-")[0]
            }
          </p>
          <p className="text-[12px] text-destructive">
            {formatFlightDate(
              flights?.options[flights?.options.length - 1]?.arrival?.date
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MobileFlightCard
