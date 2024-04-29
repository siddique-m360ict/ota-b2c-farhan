import { Airline } from "@/components/home/elements/types/flightSearchType"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { hostedImage } from "@/lib/utils"
import Image from "next/image"

import React from "react"

type Props = {
  Airlines: Airline[] | undefined
}
const FilterAirline = ({ Airlines }: Props) => {
  const dispatch = useAppDispatch()
  const filterAirlines =
    useAppSelector(selectFilterOption)?.carrier_operating ?? []

  // handle airline filter
  const handleCheckboxChange = (code: string, event: string | boolean) => {
    let updatedAirlines: string[]
    if (filterAirlines.includes(code)) {
      updatedAirlines = filterAirlines.filter((airline) => airline !== code)
    } else {
      updatedAirlines = [...filterAirlines, code]
    }

    dispatch(setFilterOption({ carrier_operating: updatedAirlines }))
  }

  return (
    <section>
      <h3 className="mb-2 font-bold text-secondary">Airlines</h3>
      <Separator orientation="horizontal" className="my-3 h-[1px] w-full" />
      {Airlines?.map((airline, index) => (
        <div className="mb-3 flex items-center space-x-2" key={index}>
          <Checkbox
            id={airline.airline_code}
            className="border-2 border-destructive"
            checked={filterAirlines.includes(airline.airline_code)}
            onCheckedChange={(event) =>
              handleCheckboxChange(airline.airline_code, event)
            }
          />
          <Label
            htmlFor={airline.airline_code}
            className="flex cursor-pointer items-center gap-2"
          >
            <Image
              src={hostedImage(`/${airline.airline_logo}`)}
              alt={airline.airline_name}
              height={20}
              width={20}
              objectFit="cover"
              objectPosition="center"
            />
            {airline.airline_name}
          </Label>
        </div>
      ))}
    </section>
  )
}

export default FilterAirline
