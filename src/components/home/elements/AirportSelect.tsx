"use client"
import React from "react"
import { IAirportList } from "./types/flightSearchType"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Props = {
  setOpen: (open: boolean) => void
  setSelectAirport: (selectedAirport: IAirportList | null) => void
  searchTerm: string
  setSearchTerm: (query: string) => void
  airportList: IAirportList[] | undefined
}

const AirportSelect = ({
  setOpen,
  setSelectAirport,
  searchTerm,
  setSearchTerm,
  airportList,
}: Props) => {
  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search Airport"
        value={searchTerm}
        onValueChange={setSearchTerm}
        autoFocus
      />
      <CommandList className="max-h-screen md:max-h-[300px]">
        <CommandEmpty>No results found.</CommandEmpty>
        {airportList?.map((airport) => (
          <CommandItem
            key={airport?.id}
            value={airport?.iata_code}
            onSelect={(value) => {
              setSelectAirport(airport)
              setOpen(false)
            }}
          >
            <div className="flex items-center gap-4 ">
              <p className="w-[35px] px-3 text-[15px]"> {airport?.iata_code}</p>
              <div className="h-[30px] w-px border-l border-gray-300"></div>
              <div>
                <span className="p-0 text-sm leading-4">{airport.name} </span>
                <br />
                <span className="w-full text-ellipsis text-xs text-gray-500">
                  {airport.city_name}, {airport?.country}
                </span>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  )
}

export default AirportSelect
