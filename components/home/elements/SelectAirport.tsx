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
import { env } from "@/env.mjs"
import { Card, CardContent } from "@/components/ui/card"
type Props = {
  airport: IAirportList | null
  setAirport: (airport: IAirportList | null) => void
  name: string
  placeholder?: string
}
const SelectAirport = ({ airport, setAirport, name, placeholder }: Props) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const requestURL = env.NEXT_PUBLIC_BASE_SERVER_URL
  const [airportList, setAirportList] = useState<IAirportList[]>()
  const [searchTerm, setSearchTerm] = useState("")

  async function fetchAirportData(arg: string) {
    try {
      const res = await fetch(
        `${requestURL}/common/airport?skip=0&limit=20&name=${arg?.toLocaleUpperCase()}`
      )
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
          <Card className="  flex h-[5.5vh] cursor-pointer items-center rounded px-4  py-1 text-start">
            <CardContent className="p-0">
              {airport ? (
                <p className="leading-5">
                  {airport.iata_code} <br />
                  <small className="text-xs">{airport.name}</small>
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
        <Button variant="outline" className="w-[150px] justify-start">
          {airport ? <>{airport.iata_code}</> : `${name} Airport`}
        </Button>
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
