"use client"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { cn, createUrl } from "@/lib/utils"
import { Search } from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState, useTransition } from "react"
import { Passenger } from "../FlightSearch"
import DatePicker from "./DatePicker"
import { format } from "date-fns"
import SelectAirport from "./SelectAirport"
import { IAirportList } from "./types/flightSearchType"
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"

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
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }
  const [isPending, startTransition] = useTransition()
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  // make url and change route ---------------------------------------
  const router = useRouter()
  const queryParams = `origin=${fromAirport?.iata_code}&destination=${
    toAirport?.iata_code
  }&departuredate=${
    date ? format(new Date(date), "yyyy-MM-dd") : ""
  }&adults=${passenger.adult.toString()}${
    passenger.children !== 0 ? `&child=${passenger.children.toString()}` : ""
  }${
    passenger.infant !== 0 ? `&infant=${passenger.infant.toString()}` : ""
  }&class=${cabinClass}&route=oneway`

  const changeRoute = () => {
    router.push(`/flightsearch?${queryParams}`)
  }

  return (
    <>
      <div className="relative  flex flex-col gap-3 md:flex-row ">
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
          className="absolute left-[29%] top-[20%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white dark:bg-transparent md:block"
        />
        <SelectAirport
          airport={toAirport}
          setAirport={setToAirport}
          name="To"
        />

        <DatePicker setDate={setDate} date={date} />
        {segment !== "flightsearch" ? (
          <Link
            href={`/flightsearch?${queryParams}`}
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              "rounded px-4"
            )}
          >
            Search
          </Link>
        ) : (
          <Button
            disabled={isPending}
            className={cn(
              buttonVariants({ variant: "default", size: "xl" }),
              "rounded px-4"
            )}
            onClick={() => startTransition(() => changeRoute())}
          >
            Search
          </Button>
        )}
      </div>
      {isPending && <LoadingIndicator />}
    </>
  )
}

export default OneWay
