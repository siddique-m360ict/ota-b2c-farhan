"use client"
import { Input } from "@/components/ui/input"
import React, { useEffect, useRef, useState } from "react"
import { IAirportList } from "./types/flightSearchType"
import { Separator } from "@/components/ui/separator"
import { env } from "@/env.mjs"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Combobox } from "@/components/ui/combobox"
import { useDebounce } from "@/hooks/use-debounce"

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
        placeholder="Filter status..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
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
              <div className="h-[30px] w-[1px] border-l border-gray-300"></div>
              <div>
                <span className="p-0 text-sm leading-4">
                  {airport.country}{" "}
                </span>
                <br />
                <span className="w-full text-ellipsis text-xs text-gray-500">
                  {airport?.name}
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
