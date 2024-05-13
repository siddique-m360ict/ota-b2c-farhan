import React, { useEffect, useState, useTransition } from "react"
import SelectAirport from "./SelectAirport"
import DatePicker from "./DatePicker" // Import your DatePicker component
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { IAirportList } from "./types/flightSearchType"
import { useToast } from "@/components/ui/use-toast"
import { Passenger } from "../FlightSearch"
import { addDays, format } from "date-fns"
import { useRouter, useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAppDispatch } from "@/lib/redux/hooks"
import {
  setFilterCount,
  setFilterDataList,
} from "@/lib/redux/slice/filterDataList"
import { removeFilterOption } from "@/lib/redux/slice/filterOptions"
import LoadingIndicator from "@/components/common/spinner/LoadingIndicator"
import { Separator } from "@/components/ui/separator"
type cityData = {
  key: number
  from: IAirportList | null
  to: IAirportList | null
  date: Date | undefined | null
}
type Props = {
  cabinClass: string
  passenger: Passenger
}
const MultiCity = ({ cabinClass, passenger }) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const router = useRouter()
  const [cityData, setCityData] = useState<cityData[]>([
    {
      key: 0,
      from: {
        id: 210,
        country_id: 18,
        country: "BANGLADESH",
        name: "Dhaka - Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        id: 2061,
        country_id: 18,
        country: "BANGLADESH",
        name: "Cox's Bazar Airport",
        iata_code: "CXB",
      },
      date: addDays(new Date(), 3),
    },
    {
      key: 1,
      from: {
        id: 2061,
        country_id: 18,
        country: "BANGLADESH",
        name: "Cox's Bazar Airport",
        iata_code: "CXB",
      },
      to: {
        id: 210,
        country_id: 18,
        country: "BANGLADESH",
        name: "Dhaka - Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      date: addDays(new Date(), 4),
    },
  ])

  //  add flight city row
  const addCity = () => {
    if (cityData.length < 6) {
      setCityData([
        ...cityData,
        { key: cityData.length, from: null, to: null, date: null },
      ])
    }
  }

  // remove flight city row
  const removeCity = (key) => {
    if (cityData.length > 2) {
      setCityData(cityData.filter((city) => city.key !== key))
    }
  }

  // swap route
  const [rotations, setRotations] = useState<number[]>([0, 0])
  const handleSwap = (index) => {
    const updatedCityData = [...cityData]
    const temp = updatedCityData[index].from
    updatedCityData[index].from = updatedCityData[index].to
    updatedCityData[index].to = temp
    setCityData(updatedCityData)
    setRotations((prevRotations) => {
      const newRotations = [...prevRotations]
      newRotations[index] = newRotations[index] === 0 ? -180 : 0
      return newRotations
    })
  }
  // hook
  const segment = useSelectedLayoutSegment()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const dispatch = useAppDispatch()

  // remove filter (from redux state)
  const removeFilter = () => {
    localStorage.setItem("multiCityFlights", JSON.stringify(cityData))
    localStorage.setItem("route", "multicity")
    localStorage.setItem("class", cabinClass)
    localStorage.setItem("passenger", JSON.stringify(passenger))
    dispatch(setFilterDataList(undefined))
    dispatch(setFilterCount(undefined))
    dispatch(removeFilterOption())
  }

  //  make URL
  const isEmpty = cityData.some(({ from, to, date }) => !from || !to || !date)
  const formattedParams = cityData
    .map(({ from, to, date }) => {
      const formattedDate = date ? format(new Date(date), "yyyy-MM-dd") : ""
      return `${from?.iata_code},${to?.iata_code},${formattedDate}`
    })
    .join(",")
  const queryParams = `trips=${formattedParams}&adults=${passenger.adult}&child=${passenger.children}&infant=${passenger.infant}&kids=${passenger.kids}&class=${cabinClass}&route=multiway`

  // HANDLE SEARCH
  const handleSearch = () => {
    if (isEmpty) {
      toast({
        title: "Please add city and date for all cities",
        description: "",
      })
    } else {
      startTransition(() => {
        router.push(`flightsearch?${queryParams}`)
      })
    }
  }

  // ==================== get flight search localStorage info
  useEffect(() => {
    if (window !== undefined) {
      const searchFlightOneWay = JSON.parse(
        localStorage.getItem("multiCityFlights")
      )
      console.log(searchFlightOneWay)

      if (searchFlightOneWay && searchFlightOneWay.length > 0) {
        const formattedFlights = searchFlightOneWay.map((flight) => ({
          ...flight,
          date: new Date(flight.date),
        }))
        setCityData(formattedFlights)
      }
    }
  }, [segment])

  return (
    <>
      <div className="w-full">
        {cityData.map(({ key, from, to, date }, index) => (
          <div key={key} className="mb-2">
            <div className="mb-1">
              <div className="flex w-full items-center">
                <p
                  className={cn(
                    isDesktop
                      ? "text-xs"
                      : "rounded-full bg-secondary p-[2px] text-xs text-white"
                  )}
                >
                  Flight({index + 1})
                </p>
                <div className="relative w-full">
                  <Separator
                    orientation="vertical"
                    className="h-[1px] w-full bg-[#EBF0EB] dark:bg-gray-800"
                  />
                  {index > 1 && (
                    <div
                      className="absolute bottom-[-9px] right-0 z-50 bg-transparent"
                      onClick={() => removeCity(key)}
                    >
                      <Icons.close className="z-50 h-6 w-6 cursor-pointer rounded-full border p-1 font-bold text-primary transition-all duration-150 hover:bg-[#ff0000] hover:text-white dark:bg-transparent  " />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* City row */}
            <div className="relative grid items-center gap-2 md:flex">
              <SelectAirport
                airport={from}
                setAirport={(airport) => {
                  const updatedCityData = [...cityData]
                  updatedCityData[index].from = airport
                  setCityData(updatedCityData)
                }}
                name="From"
              />
              {/* Swap Route */}
              <Icons.Repeat
                onClick={() => handleSwap(index)}
                style={{
                  transform: `rotate(${rotations[index]}deg)`,
                  border: "solid white",
                  boxShadow: "0px 0px 0px 1px #E2E8F0",
                }}
                className="absolute left-[31.3%] top-[20%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white  dark:bg-transparent md:block"
              />
              <Icons.ArrowDownUp
                onClick={() => handleSwap(index)}
                style={{
                  transform: `rotate(${rotations[index]}deg)`,
                  border: "solid white",
                  boxShadow: "0px 0px 0px 1px #E2E8F0",
                }}
                className="absolute right-[5%] top-[20%] z-50 block h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 font-bold text-primary transition-all duration-150 hover:bg-primary hover:text-white  dark:bg-transparent md:hidden"
              />
              <SelectAirport
                airport={to}
                setAirport={(airport) => {
                  const updatedCityData = [...cityData]
                  updatedCityData[index].to = airport
                  setCityData(updatedCityData)
                }}
                name="To"
              />
              <DatePicker
                setDate={(date) => {
                  const updatedCityData = [...cityData]
                  updatedCityData[index].date = date
                  setCityData(updatedCityData)
                }}
                date={date}
              />
            </div>
            {/* End of city row */}
          </div>
        ))}
        <div className="mt-4 flex justify-between">
          <Button onClick={addCity} className="h-8 md:h-auto">
            Add another flight
          </Button>
          {segment !== "flightsearch" ? (
            <Link
              href={!isEmpty ? `/flightsearch?${queryParams}` : "#"}
              className={cn(
                buttonVariants({
                  variant: "default",
                  size: isDesktop ? "xl" : "sm",
                }),
                "h-9 rounded px-4 md:h-10 md:w-auto"
              )}
              onClick={(e) => {
                if (isEmpty) {
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
                "h-9 rounded px-4 md:h-10 md:w-auto"
              )}
              onClick={() => startTransition(() => handleSearch())}
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

export default MultiCity
