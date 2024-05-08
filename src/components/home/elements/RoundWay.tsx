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
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation"
import { Passenger } from "../FlightSearch"
import Link from "next/link"
import {
  setFilterCount,
  setFilterDataList,
} from "@/lib/redux/slice/filterDataList"
import { removeFilterOption } from "@/lib/redux/slice/filterOptions"
import { useAppDispatch } from "@/lib/redux/hooks"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "@/components/ui/use-toast"

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

  const [rotation, setRotation] = useState(0)
  const router = useRouter()
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }

  // react hook
  const [isPending, startTransition] = useTransition()
  const segment = useSelectedLayoutSegment()
  const isDesktop = useMediaQuery("(min-width: 768px)")

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

  const removeFilter = () => {
    dispatch(setFilterDataList(undefined))
    dispatch(setFilterCount(undefined))
    dispatch(removeFilterOption())
  }
  // change route for flight
  const dispatch = useAppDispatch()
  const changeRoute = () => {
    if (!fromAirport || !toAirport || !date?.from || !date?.to) {
      toast({
        title: "Please fill all fields",
        description: "",
      })
      return
    }

    router.push(`/flightsearch?${queryParams}`)
    removeFilter()
  }
  return (
    <>
      <div className="gap-2  md:flex">
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
        <div className="w-full justify-between gap-3 md:flex">
          <div className="mb-4 mt-2 w-full md:mb-0 md:mt-0">
            <DatePickerRange date={date} setDate={setDate} />
          </div>
          {segment !== "flightsearch" ? (
            <Link
              href={
                fromAirport && toAirport && date?.from && date?.to
                  ? `/flightsearch?${queryParams}`
                  : "#"
              }
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: isDesktop ? "xl" : "sm",
                }),
                "w-full rounded px-4 md:h-12 md:w-auto"
              )}
              onClick={(e) => {
                if (!fromAirport || !toAirport || !date?.from || !date?.to) {
                  e.preventDefault()
                  toast({
                    title: "Please fill all fields",
                  })
                } else {
                  removeFilter()
                }
              }}
            >
              Search
            </Link>
          ) : (
            <Button
              disabled={isPending}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: isDesktop ? "xl" : "sm",
                }),
                "w-full rounded px-4  md:h-12 md:w-auto"
              )}
              onClick={() => startTransition(() => changeRoute())}
            >
              Search
            </Button>
          )}
        </div>
      </div>
      {isPending && <LoadingIndicator />}
    </>
  )
}

export default RoundWay
