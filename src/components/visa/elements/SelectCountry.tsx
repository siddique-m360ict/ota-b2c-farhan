import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import countries from "../../../../public/data/countries.json"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type Props = {
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{ id: number; name: string; iso: string } | null>
  >
  selectedCountry: { id: number; name: string; iso } | null
  type: string
}
const SelectCountry = ({
  setSelectedCountry,
  selectedCountry,
  type,
}: Props) => {
  const [open, setOpen] = useState(false)
  const handleCountrySelect = (country: {
    id: number
    name: string
    iso: string
  }) => {
    setSelectedCountry(country)
    setOpen(false)
  }
  return (
    <div className="flex w-full flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto w-full flex-col items-start justify-start rounded py-[7px] text-start"
          >
            {selectedCountry ? (
              <div className="flex w-full flex-col">
                <span className="text-sm text-destructive">{type}</span>
                <div className="text-xs ">
                  {type === "Country" ? (
                    <p className=" flex w-full gap-4">
                      {selectedCountry.name} ({selectedCountry.iso})
                    </p>
                  ) : (
                    <p className=" flex w-full gap-4">
                      {selectedCountry.iso} ({selectedCountry.name})
                    </p>
                  )}
                </div>
              </div>
            ) : (
              "Select Country"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 ">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[35vh]  overflow-auto">
              {countries.map((country) => (
                <CommandItem
                  key={country.id}
                  value={country.id as any}
                  onSelect={() => handleCountrySelect(country)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
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
  )
}

export default SelectCountry
