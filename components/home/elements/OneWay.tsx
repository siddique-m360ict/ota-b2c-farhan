"use client"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import Link from "next/link"
import React, { useState, useTransition } from "react"
import { Passenger } from "../FlightSearch"
import DatePicker from "./DatePicker"
import { format } from "date-fns"
import SelectAirport from "./SelectAirport"
import { IAirportList } from "./types/flightSearchType"
import { useRouter } from "next/navigation"

type Props = {
  cabinClass: string
  passenger: Passenger
}
const OneWay = ({ cabinClass, passenger }: Props) => {
  const [fromAirport, setFromAirport] = React.useState<IAirportList | null>(
    null
  )
  const [toAirport, setToAirport] = React.useState<IAirportList | null>(null)
  const [date, setDate] = React.useState<Date>()

  const [rotation, setRotation] = useState(0)
  const router = useRouter()
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }
  const [isPending, startTransition] = useTransition()

  // Make url
  const queryParams = `origin=${fromAirport?.iata_code}&destination=${
    toAirport?.iata_code
  }&departuredate=${date ? format(new Date(date), "yyyy-MM-dd") : ""}&adults=${
    passenger.adult
  }${passenger.children !== 0 ? `&child=${passenger.children}` : ""}${
    passenger.infant !== 0 ? `&infant=${passenger.infant}` : ""
  }&class=${cabinClass}&route=oneway`

  const changeRoute = (url: string | undefined) => {
    router.push(url as string)
  }

  return (
    <>
      <div className="relative flex gap-2">
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
          className="absolute left-[29%] top-[20%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 transition-all duration-150 hover:bg-primary hover:text-white md:block"
        />
        <SelectAirport
          airport={toAirport}
          setAirport={setToAirport}
          name="To"
        />

        <DatePicker setDate={setDate} date={date} />
        <Button
          className={cn(
            buttonVariants({ variant: "default", size: "xl" }),
            "rounded px-4"
          )}
          onClick={() =>
            startTransition(() => changeRoute(`flight-search?${queryParams}`))
          }
        >
          {isPending ? "load.." : "Search"}
        </Button>
      </div>
    </>
  )
}

export default OneWay
