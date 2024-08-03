"use client"
import React, { useEffect, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn, hostedImage, serverUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { useDebounce } from "@/hooks/use-debounce"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

type Props = {
  setAirline: React.Dispatch<React.SetStateAction<IAirlineList>>
  airline: IAirlineList
}

export interface IAirlineList {
  airline_code?: string
  airline_name?: string
  airline_logo?: string
  capping?: number
  soto_commission?: string
  from_dac_commission?: string
  to_dac_commission?: string
  soto_allowed?: number
  last_updated?: null
  domestic_commission?: string
  updated_by?: null
}

function SelectAirline({ airline: carrier_operating, setAirline }: Props) {
  const [open, setOpen] = React.useState(false)
  const [airlineList, setAirlineList] = useState<IAirlineList[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedQuery = useDebounce(searchTerm, 400)
  async function fetchAirportData(arg: string) {
    try {
      const api = serverUrl(
        `/common/airlines-capping?name=${arg?.toLocaleUpperCase()}`
      )
      const res = await fetch(api, {
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error("Failed to fetch airline data")
      }
      const data = await res.json()
      setAirlineList(data?.data)
    } catch (error) {
      console.error("Error fetching airline data:", error)
      throw error
    }
  }

  useEffect(() => {
    fetchAirportData(debouncedQuery)
  }, [debouncedQuery])

  const searchParams = useSearchParams()
  const operating = searchParams.get("carrier_operating")
  useEffect(() => {
    const filterAirline = airlineList?.filter(
      (airline) => airline.airline_code === operating
    )
    if (filterAirline) {
      setAirline(filterAirline[0])
    }
  }, [operating, airlineList])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="m-0 h-0 border-none p-0"
          aria-expanded={open}
        >
          {carrier_operating ? (
            <div className="me-1">
              <Image
                src={hostedImage(`/${carrier_operating.airline_logo}`)}
                alt={carrier_operating.airline_name}
                width={20}
                height={20}
              />
            </div>
          ) : (
            <Icons.LandPlot size={18} className="me-1 hidden md:block" />
          )}

          <p className="text-sm">
            {carrier_operating
              ? airlineList?.find(
                  (framework) =>
                    framework.airline_code == carrier_operating?.airline_code
                )?.airline_name
              : "Select Airline"}
          </p>
          <Icons.ChevronDown className="ms-[1px] text-gray-800" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search Airport"
            value={searchTerm}
            onValueChange={setSearchTerm}
            autoFocus
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {airlineList?.map((airline, index) => (
              <CommandItem
                key={index}
                value={airline?.airline_code}
                onSelect={(value) => {
                  setAirline(airline)
                  setOpen(false)
                }}
                className="p-0"
              >
                <div
                  className={cn(
                    "flex w-96 cursor-pointer items-center  gap-3 border-b  px-4 py-2",
                    airline.airline_code === carrier_operating?.airline_code &&
                      "bg-primary text-white"
                  )}
                >
                  <Image
                    src={hostedImage(`/${airline.airline_logo}`)}
                    alt={airline.airline_name}
                    width={20}
                    height={20}
                  />
                  <span className="font-bold">{airline.airline_name}</span>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default SelectAirline
