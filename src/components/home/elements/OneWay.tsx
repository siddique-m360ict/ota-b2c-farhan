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
import DatePickerFlight from "./DatePickerFlight"
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
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
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
import { useTheme } from "next-themes"
import { setModifyFlightDrawerOpen } from "@/lib/redux/slice/ModifyFlightSearchDrawer"
import {
  selectTransitionIsPending,
  setTransitionLoading,
} from "@/lib/redux/slice/transitionLoading"
import { IAirlineList } from "./SelectAirline"
import { CappingAirlines } from "./FancyMultiSelect"
import { selectSelectedAirlines } from "@/lib/redux/slice/cappingAirline"

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
  const [date, setDate] = React.useState<Date>(addDays(new Date(), 3))

  // swap icon rotate
  const [rotation, setRotation] = useState(0)
  const swapRoute = () => {
    setRotation(rotation === 0 ? -180 : 0)
    setFromAirport(toAirport)
    setToAirport(fromAirport)
  }
  const { theme } = useTheme()
  const loading = useAppSelector(selectTransitionIsPending)
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

  // make url and change route ---------------------------------------
  const router = useRouter()
  const queryParams = `origin=${fromAirport?.iata_code}&destination=${
    toAirport?.iata_code
  }&departuredate=${date ? format(new Date(date), "yyyy-MM-dd") : ""}&adults=${
    passenger.adult
  }${passenger.children !== 0 ? `&child=${passenger.children}` : ""}${
    passenger.infant !== 0 ? `&infant=${passenger.infant}` : ""
  }${passenger.kids !== 0 ? `&kids=${passenger.kids}` : ""}&carrier_operating=${
    filterAirline && filterAirline.length > 0 ? filterAirline : ""
  }&class=${cabinClass}&route=oneway`

  // remove all flight filter because new filter add when search button click
  const removeFilter = () => {
    const saveLocalStorage = { fromAirport, toAirport, date }
    localStorage.setItem("oneWayFlights", JSON.stringify(saveLocalStorage))
    localStorage.setItem("route", "oneway")
    localStorage.setItem("class", cabinClass)
    localStorage.setItem("passenger", JSON.stringify(passenger))
    dispatch(setFilterDataList(undefined))
    dispatch(setFilterCount(undefined))
    dispatch(removeFilterOption())
    // dispatch(setModifyFlightDrawerOpen(false))
  }
  // change route for flight
  const dispatch = useAppDispatch()
  const changeRoute = () => {
    if (!fromAirport || !toAirport || !date) {
      toast({
        title: "Please fill all fields",
        description: "",
        duration: 1000,
      })
      return
    }
    router.push(`/flightsearch?${queryParams}`)
    router.refresh()
    removeFilter()
  }

  // ==================== get flight search date localStorage info
  useEffect(() => {
    if (window !== undefined) {
      const searchFlightOneWay = JSON.parse(
        localStorage.getItem("oneWayFlights")
      )
      if (searchFlightOneWay && Object.keys(searchFlightOneWay).length > 0) {
        setDate(new Date(searchFlightOneWay.date))
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

  // ------------------------- link between one way and round way
  // Getting data form localStorage
  useEffect(() => {
    const origin: string | null = localStorage.getItem("origin")
    const departure: string | null = localStorage.getItem("departure")

    if (JSON.parse(origin)?.iata_code !== "DAC") {
      if (origin) setFromAirport(JSON.parse(origin))
    }
    if (JSON.parse(departure)?.iata_code !== "CXB") {
      if (departure) setToAirport(JSON.parse(departure))
    }
  }, [])

  // Setting data to localStorage
  useEffect(() => {
    localStorage.setItem("origin", JSON.stringify(fromAirport))
    localStorage.setItem("departure", JSON.stringify(toAirport))
  }, [fromAirport, toAirport])

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
            boxShadow:
                    theme === "light"
                      ? "0px 0px 0px 1px #E2E8F0"
                      : "0px 0px 0px 1px #ffffff",
          }}
          className="dark:bg-grey-800 absolute left-[28.5%] top-[20%] z-50 hidden size-8 cursor-pointer rounded-full border-[3px] border-white bg-[#EBF0F5] p-1.5  font-bold text-primary transition-all duration-150 hover:bg-primary
          dark:hover:bg-grey-800 hover:text-white dark:border-transparent dark:text-black  md:block "
        />
        <Icons.ArrowDownUp
          onClick={swapRoute}
          style={{
            transform: `rotate(${rotation}deg)`,
            boxShadow:
            theme === "light"
            ? "0px 0px 0px 1px #E2E8F0"
            : "0px 0px 0px 1px #ffffff",
          }}
          className="absolute right-[5%] top-[20%] z-50 block size-8 cursor-pointer rounded-full border-[3px] bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white dark:bg-transparent  md:hidden"
        />
        <SelectAirport
          airport={toAirport}
          setAirport={setToAirport}
          name="To"
        />

        <DatePickerFlight setDate={setDate} date={date} />
        {pathName !== "/flightsearch" ? (
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
              "mt-2 h-10 rounded px-4 md:mt-0 md:h-12"
            )}
            onClick={() => startTransition(() => changeRoute())}
          >
            {loading && (
              <Icons.spinner className="mr-2 size-4 animate-spin " />
            )}
            Search
          </Button>
        )}
      </div>
    </>
  )
}

export default OneWay
