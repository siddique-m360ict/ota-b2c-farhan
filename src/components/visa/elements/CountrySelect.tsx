"use client"
import React from "react"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { IVisaCountry } from "./visaType"
import Image from "next/image"

type Props = {
  setOpen: (open: boolean) => void
  setSelectedCountry: (selectedAirport: IVisaCountry | null) => void
  searchTerm: string
  setSearchTerm: (query: string) => void
  visaCountryList: IVisaCountry[] | undefined
}

const CountrySelect = ({
  setOpen,
  setSelectedCountry,
  searchTerm,
  setSearchTerm,
  visaCountryList,
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
        {visaCountryList?.map((visaCountry) => (
          <CommandItem
            key={visaCountry?.id}
            value={visaCountry?.title}
            onSelect={(value) => {
              setSelectedCountry(visaCountry)
              setOpen(false)
            }}
          >
            <div className={`w-full cursor-pointer px-3  hover:bg-blue-50`}>
              <div className="flex items-center justify-between gap-3 ">
                <Image
                  src={visaCountry.flag as string}
                  alt="country image"
                  width={20}
                  height={20}
                />

                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-[13px] capitalize">
                      {visaCountry.title}
                    </p>
                    <p className="text-[14px] font-[700] text-[#747474]">
                      {visaCountry.continent}
                    </p>
                  </div>
                  <p className="text-[12px] leading-[12px] text-[#9b9b9b]">
                    {visaCountry.title}
                  </p>
                </div>
              </div>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  )
}

export default CountrySelect
