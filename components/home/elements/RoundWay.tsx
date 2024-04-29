"use client"

import React, { useState, useTransition } from "react"
import { IAirportList } from "./types/flightSearchType"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import DatePickerRange from "./DatePickerRange"
import SelectAirport from "./SelectAirport"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Passenger } from "../FlightSearch"

type Props = {
  cabinClass: string
  passenger: Passenger
}

const RoundWay = ({ cabinClass, passenger }: Props) => {
  const [fromAirport, setFromAirport] = React.useState<IAirportList | null>(
    null
  )
  const [toAirport, setToAirport] = React.useState<IAirportList | null>(null)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 3),
  })
  const [isPending, startTransition] = useTransition()
  const [rotation, setRotation] = useState(0)
  const router = useRouter()
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }

  // Make url
  const queryParams = `origin=${fromAirport?.iata_code}&destination=${
    toAirport?.iata_code
  }&departuredate=${
    date?.from ? format(new Date(date.from), "yyyy-MM-dd") : ""
  }&returndate=${
    date?.to ? format(new Date(date.to), "yyyy-MM-dd") : ""
  }&adults=${passenger.adult}${
    passenger.children !== 0 ? `&child=${passenger.children}` : ""
  }${
    passenger.infant !== 0 ? `&infant=${passenger.infant}` : ""
  }&class=${cabinClass}&route=roundway`

  const changeRoute = (url: string | undefined) => {
    router.push(url as string)
  }

  return (
    <div className="flex gap-2">
      <div className="relative flex w-full gap-2">
        <SelectAirport
          airport={fromAirport}
          setAirport={setFromAirport}
          name="From"
        />
        {/* Swap Route */}
        <Icons.Repeat
          onClick={swapRoute}
          style={{
            transform: `rotate(${rotation}deg)`,
            border: "3px solid white",
            boxShadow: "0px 0px 0px 1px #E2E8F0",
          }}
          className="absolute left-[47.5%] top-[20%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 transition-all duration-150 hover:bg-primary hover:text-white md:block"
        />
        <SelectAirport
          airport={toAirport}
          setAirport={setToAirport}
          name="To"
        />
      </div>
      <div className="flex w-full justify-between gap-3">
        <DatePickerRange date={date} setDate={setDate} />
        <Button
          className={cn(
            buttonVariants({ variant: "default", size: "xl" }),
            "h-13 rounded px-4"
          )}
          onClick={() =>
            startTransition(() => changeRoute(`flight-search?${queryParams}`))
          }
        >
          {isPending ? "load.." : "Search"}
        </Button>
      </div>
    </div>
  )
}

export default RoundWay
