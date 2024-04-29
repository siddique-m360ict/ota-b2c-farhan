import React, { useState, useTransition } from "react"

import SelectAirport from "./SelectAirport"
import DatePicker from "./DatePicker" // Import your DatePicker component
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { IAirportList } from "./types/flightSearchType"
import { useToast } from "@/components/ui/use-toast"
import { Passenger } from "../FlightSearch"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
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
    { key: 0, from: null, to: null, date: null },
    { key: 1, from: null, to: null, date: null },
  ])

  const addCity = () => {
    if (cityData.length < 6) {
      setCityData([
        ...cityData,
        { key: cityData.length, from: null, to: null, date: null },
      ])
    }
  }

  const removeCity = (key) => {
    if (cityData.length > 2) {
      setCityData(cityData.filter((city) => city.key !== key))
    }
  }

  const handleSwap = (index) => {
    const updatedCityData = [...cityData]
    const temp = updatedCityData[index].from
    updatedCityData[index].from = updatedCityData[index].to
    updatedCityData[index].to = temp
    setCityData(updatedCityData)
  }

  const handleSearch = () => {
    const isEmpty = cityData.some(({ from, to, date }) => !from || !to || !date)
    if (isEmpty) {
      toast({
        title: "Please add city and date for all cities",
        description: "",
      })
    } else {
      const formattedParams = cityData
        .map(({ from, to, date }) => {
          const formattedDate = date ? format(new Date(date), "yyyy-MM-dd") : ""
          return `${from?.iata_code},${to?.iata_code},${formattedDate}`
        })
        .join(",")

      const queryParams = `trips=${formattedParams}&adults=${passenger.adult}&child=${passenger.children}&infant=${passenger.infant}&kids=${passenger.kids}&class=${cabinClass}&route=multiway`
      startTransition(() => {
        router.push(`flight-search?${queryParams}`)
      })
    }
  }

  return (
    <div className="w-full">
      {cityData.map(({ key, from, to, date }, index) => (
        <div key={key} className="mb-2">
          {/* City row */}
          <div className="relative flex items-center gap-2">
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
              className="absolute left-[30.4%] top-[20%] z-50 hidden h-8 w-8 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5 transition-all duration-150 hover:bg-primary hover:text-white md:block"
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
            {index > 1 && (
              <div onClick={() => removeCity(key)}>
                <Icons.close />
              </div>
            )}
          </div>
          {/* End of city row */}
        </div>
      ))}
      <div className="mt-4 flex justify-between">
        <Button onClick={addCity}>Add another city</Button>
        <Button onClick={handleSearch} className="rounded px-4">
          {isPending ? "load.." : "Search"}
        </Button>
      </div>
    </div>
  )
}

export default MultiCity
