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
import { addDays, format } from "date-fns"
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
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  setFilterCount,
  setFilterDataList,
} from "@/lib/redux/slice/filterDataList"
import {
  removeFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "@/components/ui/use-toast"

type Props = {
  cabinClass: string
  passenger: Passenger
}
const OneWay = ({ cabinClass, passenger }: Props) => {
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

  // swap icon rotate
  const [rotation, setRotation] = useState(0)
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }

  // react hook
  const [isPending, startTransition] = useTransition()
  const segment = useSelectedLayoutSegment()
  const isDesktop = useMediaQuery("(min-width: 768px)")

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

  // remove all flight filter because new filter add when search button click
  const removeFilter = () => {
    const saveLocalStorage = { fromAirport, toAirport, date }
    localStorage.setItem("oneWayFlights", JSON.stringify(saveLocalStorage))
    localStorage.setItem("route", "oneway")
    dispatch(setFilterDataList(undefined))
    dispatch(setFilterCount(undefined))
    dispatch(removeFilterOption())
  }
  // change route for flight
  const dispatch = useAppDispatch()
  const changeRoute = () => {
    if (!fromAirport || !toAirport || !date) {
      toast({
        title: "Please fill all fields",
        description: "",
      })
      return
    }
    router.push(`/flightsearch?${queryParams}`)
    removeFilter()
  }

  // ==================== get flight search localStorage info
  useEffect(() => {
    if (window !== undefined) {
      const searchFlightOneWay = JSON.parse(
        localStorage.getItem("oneWayFlights")
      )
      if (searchFlightOneWay && Object.keys(searchFlightOneWay).length > 0) {
        setFromAirport(searchFlightOneWay?.fromAirport)
        setToAirport(searchFlightOneWay?.toAirport)
        setDate(new Date(searchFlightOneWay.date))
      }
    }
  }, [segment])

  return (
    <>
      <div className="relative  flex flex-col gap-2 md:flex-row md:gap-3">
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
          className="absolute right-[5%] top-[15%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white dark:bg-transparent md:block xl:left-[28.5%] xl:top-[14%] 2xl:left-[29%] 2xl:top-[20%]  "
        />
        <Icons.ArrowDownUp
          onClick={swapRoute}
          style={{
            transform: `rotate(${rotation}deg)`,
            border: "3px solid white",
            boxShadow: "0px 0px 0px 1px #E2E8F0",
          }}
          className="absolute right-[5%] top-[15%] z-50 block h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white dark:bg-transparent md:left-[29%] md:top-[20%] md:hidden  "
        />
        <SelectAirport
          airport={toAirport}
          setAirport={setToAirport}
          name="To"
        />

        <DatePicker setDate={setDate} date={date} />
        {segment !== "flightsearch" ? (
          <Link
            href={
              fromAirport && toAirport && date
                ? `/flightsearch?${queryParams}`
                : "#"
            }
            className={cn(
              buttonVariants({
                variant: "default",
                size: isDesktop ? "xl" : "sm",
              }),
              "mt-2 h-10 rounded px-4 md:mt-0 xl:h-[5.3vh] 2xl:h-12"
            )}
            onClick={(e) => {
              if (!fromAirport || !toAirport || !date) {
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
              "mt-2 h-10 rounded px-4 md:mt-0 md:h-12"
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
