import React, { useEffect, useState } from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn, serverUrl } from "@/lib/utils"
import countries from "../../../../../public/data/countries.json"
import { HTTPResponse } from "@/lib/commonTypes"

type Cities = {
  id: number
  name: string
}
type Props = {
  setSelectedCity?: React.Dispatch<
    React.SetStateAction<{ id: number; name: string } | null>
  >
  selectedCity?: { id: number; name: string } | null
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{ id: number; name: string } | null>
  >
  selectedCountry: { id: number; name: string } | null
}
const City = ({
  setSelectedCity,
  selectedCity,
  setSelectedCountry,
  selectedCountry,
}: Props) => {
  // COUNTRY
  const [open, setOpen] = useState(false)
  const handleCountrySelect = (country: { id: number; name: string }) => {
    setSelectedCountry(country)
    setOpen(false)
  }

  // city
  const [cityOpen, setCityOpen] = useState(false)
  const [cities, setCities] = useState([])

  const handleCitySelect = (city: { id: number; name: string }) => {
    setSelectedCity(city)
    setCityOpen(false)
  }

  // get city by country ID from Api
  useEffect(() => {
    async function getCities(id: number): Promise<HTTPResponse<Cities[]>> {
      const customHeaders = new Headers()
      customHeaders.append("Content-Type", "application/json")
      const api = serverUrl(`/common/city?country_id=${id}`)
      const response = await fetch(api, {
        method: "GET",
        headers: customHeaders,
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status || 500}`)
      }

      const res = await response.json()
      return res
    }

    async function fetchData() {
      if (selectedCountry) {
        try {
          const data = await getCities(selectedCountry.id)
          setCities(data.data)
        } catch (error) {
          // Handle error
          console.error("Error fetching cities:", error)
        }
      }
    }

    fetchData()
  }, [selectedCountry])

  return (
    <>
      {/* country */}
      <div className="flex flex-col">
        <p className="mb-1 text-sm">Country</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedCountry ? selectedCountry.name : "Select Country"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[35vh] overflow-auto">
                {countries.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.id as any}
                    onSelect={() => handleCountrySelect(country)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selectedCountry && selectedCountry.id === country.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* cities */}
      <div className="flex flex-col ">
        <p className="mb-1 text-sm">City</p>
        <Popover open={cityOpen} onOpenChange={setCityOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              disabled={!selectedCountry}
              className="w-full justify-between"
            >
              {selectedCity ? selectedCity.name : "Select Country"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No City found.</CommandEmpty>
              <CommandGroup className="max-h-[35vh] overflow-auto">
                {cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={city.id as any}
                    onSelect={() => handleCitySelect(city)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        selectedCity && selectedCity.id === city.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {city.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

export default City
