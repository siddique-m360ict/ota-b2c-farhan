import React, { useEffect, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import AirportSelect from "./AirportSelect"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { IAirportList } from "./types/flightSearchType"
import { Card, CardContent } from "@/components/ui/card"
import { serverUrl } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
type Props = {
  airport: IAirportList | null
  setAirport: (airport: IAirportList | null) => void
  name: string
  placeholder?: string
}
const SelectAirport = ({ airport, setAirport, name, placeholder }: Props) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [airportList, setAirportList] = useState<IAirportList[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedQuery = useDebounce(searchTerm, 400)
  async function fetchAirportData(arg: string) {
    try {
      const api = serverUrl(
        `/common/airport?skip=0&limit=20&name=${arg?.toLocaleUpperCase()}`
      )
      const res = await fetch(api)
      if (!res.ok) {
        throw new Error("Failed to fetch airport data")
      }
      const data = await res.json()
      setAirportList(data?.data)
    } catch (error) {
      console.error("Error fetching airport data:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchAirportData(searchTerm)
  }, [searchTerm])

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full">
          <Card className=" flex h-[5.5vh] cursor-pointer items-center rounded px-4  py-1 text-start">
            <CardContent className="w-full p-0">
              {airport ? (
                <p className="xl:leading-5">
                  {airport.iata_code} <br />
                  <small className="overflow-hidden truncate text-xs">
                    {airport.name}
                  </small>
                </p>
              ) : (
                <p className="text-sm"> {name} Airport</p>
              )}
            </CardContent>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <AirportSelect
            setOpen={setOpen}
            setSelectAirport={setAirport}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            airportList={airportList}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card className="flex h-[5vh]  w-full cursor-pointer items-center rounded px-4  py-1 text-start">
          <CardContent className="w-full p-0">
            {airport ? (
              <p className="text-sm leading-4">
                {airport.iata_code} <br />
                <small className="text-xs">{airport.country}</small>
              </p>
            ) : (
              <p className="text-sm"> {name} Airport</p>
            )}
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <AirportSelect
            setOpen={setOpen}
            setSelectAirport={setAirport}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            airportList={airportList}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default SelectAirport
