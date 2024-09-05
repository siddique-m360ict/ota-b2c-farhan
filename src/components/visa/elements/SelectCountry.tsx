import React, { useEffect, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useDebounce } from "@/hooks/use-debounce"
import CountrySelect from "./CountrySelect"
import { IVisaCountry } from "./visaType"
import Image from "next/image"
import visaCountry from "../../../../public/data/visa/visaCountry.json"

type Props = {
  country: IVisaCountry
  setSelectedCountry: (selectedAirport: IVisaCountry | null) => void
  label: string
}

const SelectCountry = ({ country, setSelectedCountry, label }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [visaCountryList, setVisaCountryList] = useState<IVisaCountry[]>()
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedQuery = useDebounce(searchTerm, 400)

  async function fetchVisaCountryData(arg: string) {
    const filteredOptions = visaCountry?.filter(
      (airport) =>
        airport?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport?.slug?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setVisaCountryList(filteredOptions)
  }

  useEffect(() => {
    fetchVisaCountryData(debouncedQuery)
  }, [debouncedQuery])

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full cursor-pointer">
          <span className="mb-[6px] flex items-center gap-2 text-sm font-[400] text-[#4A4A4A]">
            {label}{" "}
            <Image
              src={country.flag as string}
              alt="country flag"
              width={20}
              height={20}
            />{" "}
          </span>
          <Card className="cursor-pointer rounded px-3 py-2 text-start">
            <CardContent className="h-[4vh] w-full cursor-pointer p-0">
              <label className="relative flex cursor-pointer items-center gap-3">
                <div>
                  <Image
                    src={country.flag as string}
                    alt="country flag"
                    width={40}
                    height={40}
                  />
                </div>
                <div className={`flex flex-col`}>
                  <p className={`text-[24px] font-[900] leading-[36px]`}>
                    {country.title}{" "}
                    <span className="text-xs"> {country.continent}</span>
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <CountrySelect
            setOpen={setOpen}
            setSelectedCountry={setSelectedCountry}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            visaCountryList={visaCountryList}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SelectCountry
