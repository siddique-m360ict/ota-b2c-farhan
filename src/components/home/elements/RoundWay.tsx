"use client"

import React, { useEffect, useState, useTransition } from "react"
import { IAirportList } from "./types/flightSearchType"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import DatePickerRange from "./DatePickerRange"
import SelectAirport from "./SelectAirport"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  usePathname,
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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { useMediaQuery } from "@/hooks/use-media-query"
import { toast } from "@/components/ui/use-toast"
import { useTheme } from "next-themes"
import { setModifyFlightDrawerOpen } from "@/lib/redux/slice/ModifyFlightSearchDrawer"
import {
  selectTransitionIsPending,
  setTransitionLoading,
} from "@/lib/redux/slice/transitionLoading"
import { CappingAirlines } from "./FancyMultiSelect"
import { selectSelectedAirlines } from "@/lib/redux/slice/cappingAirline"

type Props = {
  cabinClass: string
  passenger: Passenger
}

const RoundWay = ({ cabinClass, passenger }: Props) => {
  const [fromAirport, setFromAirport] = React.useState<IAirportList | null>({
    id: 210,
    country_id: 18,
    country: "BANGLADESH",
    name: "Dhaka - Hazrat Shahjalal International Airport",
    iata_code: "DAC",
    city_name: "Dhaka",
  })
  const [toAirport, setToAirport] = React.useState<IAirportList | null>({
    id: 2061,
    country_id: 18,
    country: "BANGLADESH",
    name: "Cox's Bazar Airport",
    iata_code: "CXB",
    city_name: "Cox's Bazar",
  })
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), 2),
    to: addDays(new Date(), 4),
  })
  const { theme } = useTheme()
  const [rotation, setRotation] = useState(0)
  const router = useRouter()
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }

  // react hook
  const [isPending, startTransition] = useTransition()
  const pathName = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  // flight search with airline
  const selectedAirlines = useAppSelector(selectSelectedAirlines)
  const [filterAirline, setFilterAirline] = useState<string[]>()
  useEffect(() => {
    setFilterAirline(selectedAirlines?.map((airline) => airline.airline_code))
  }, [selectedAirlines])

  // Make url
  const queryParams = `origin=${fromAirport?.iata_code}&destination=${
    toAirport?.iata_code
  }&departuredate=${
    date?.from ? format(new Date(date.from), "yyyy-MM-dd") : ""
  }&returndate=${
    date?.to ? format(new Date(date.to), "yyyy-MM-dd") : ""
  }&adults=${passenger.adult}${
    passenger.children !== 0 ? `&child=${passenger.children}` : ""
  }${passenger.infant !== 0 ? `&infant=${passenger.infant}` : ""}${
    passenger.kids !== 0 ? `&kids=${passenger.kids}` : ""
  }&carrier_operating=${
    filterAirline && filterAirline.length > 0 ? filterAirline : ""
  }&class=${cabinClass}&route=roundway`

  const removeFilter = () => {
    const saveLocalStorage = { fromAirport, toAirport, date }
    localStorage.setItem("roundWayFlights", JSON.stringify(saveLocalStorage))
    localStorage.setItem("route", "roundtrip")
    localStorage.setItem("class", cabinClass)
    localStorage.setItem("passenger", JSON.stringify(passenger))
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
        duration: 1000,
      })
      return
    }

    router.push(`/flightsearch?${queryParams}`)
    removeFilter()
  }
  const loading = useAppSelector(selectTransitionIsPending)

  // ==================== get flight search localStorage info
  useEffect(() => {
    if (window !== undefined) {
      const searchFlightOneWay = JSON.parse(
        localStorage.getItem("roundWayFlights")
      )
      if (searchFlightOneWay && Object.keys(searchFlightOneWay).length > 0) {
        setDate({
          from: new Date(searchFlightOneWay.date.from),
          to: new Date(searchFlightOneWay.date.to),
        })
      }
    }
  }, [pathName])

  useEffect(() => {
    dispatch(setTransitionLoading(isPending))
  }, [isPending, dispatch])

  useEffect(() => {
    if (loading) {
      dispatch(setTransitionLoading(isPending))
      if (!isDesktop) {
        dispatch(setModifyFlightDrawerOpen(isPending))
      }
    }
  }, [loading, isPending, dispatch])

  // local flight info set and get
  useEffect(() => {
    const origin: string | null = localStorage.getItem("origin")
    const departure: string | null = localStorage.getItem("departure")

    if (origin) setFromAirport(JSON.parse(origin))
    if (departure) setToAirport(JSON.parse(departure))
  }, [])

  // Setting data to localStorage
  useEffect(() => {
    if (fromAirport?.iata_code !== "DAC") {
      localStorage.setItem("origin", JSON.stringify(fromAirport))
    } else {
      localStorage.removeItem("origin")
    }
    if (toAirport?.iata_code !== "CXB") {
      localStorage.setItem("departure", JSON.stringify(toAirport))
    } else {
      localStorage.removeItem("origin")
    }
  }, [fromAirport, toAirport])

  return (
    <>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2">
        <div className="relative grid w-full gap-3 md:flex md:gap-2">
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
            boxShadow:
                    theme === "light"
                      ? "0px 0px 0px 1px #E2E8F0"
                      : "0px 0px 0px 1px #222",
          }}
          className="absolute left-[47%] top-[20%] z-50 hidden size-8 cursor-pointer rounded-full border-[3px] border-white bg-[#EBF0F5] p-1.5 font-bold  text-primary transition-all duration-150  hover:bg-primary
          dark:hover:bg-grey-800 hover:text-white dark:border-transparent  dark:text-black  md:block"
        />
        <Icons.ArrowDownUp
          onClick={swapRoute}
          style={{
            transform: `rotate(${rotation}deg)`,
            boxShadow:
            theme === "light"
            ? "0px 0px 0px 1px #E2E8F0"
            : "0px 0px 0px 1px #222",
          }}
          className="absolute right-[5%] top-[20%] z-50 block size-8 cursor-pointer rounded-full border-[3px] bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white dark:bg-transparent  md:hidden"
        />
          <SelectAirport
            airport={toAirport}
            setAirport={setToAirport}
            name="To"
          />
        </div>
        <div className="w-full justify-between gap-3 md:flex ">
          <div className="mb-4 mt-2 w-full md:my-0 ">
            <DatePickerRange date={date} setDate={setDate} />
          </div>
          {pathName !== "/flightsearch" ? (
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
                "h-10 w-full rounded px-4 md:w-auto xl:h-[5.2vh] 2xl:h-[5.4vh]"
              )}
              onClick={(e) => {
                if (!fromAirport || !toAirport || !date?.from || !date?.to) {
                  e.preventDefault()
                  toast({
                    title: "Please fill all fields",
                    duration: 1000,
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
              {loading && (
                <Icons.spinner className="mr-2   size-4 animate-spin " />
              )}
              Search
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default RoundWay
