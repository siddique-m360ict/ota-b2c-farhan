import { Airline } from "@/components/home/elements/types/flightSearchType"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterAirline,
  setFilterAirline,
} from "@/lib/redux/slice/filterAirline"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"
import { hostedImage } from "@/lib/utils"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState, useTransition } from "react"

type Props = {
  Airlines: Airline[] | undefined
}
const FilterAirline = ({ Airlines }: Props) => {
  const params = useSearchParams()
  const queryParams = new URLSearchParams(params?.toString())
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const dispatch = useAppDispatch()
  const filterAirlines = useAppSelector(selectFilterAirline) ?? []

  // get carrier_operating params to query
  useEffect(() => {
    const carrierMarketingParam = queryParams.get("carrier_operating")
    if (carrierMarketingParam) {
      const selectedAirlines = carrierMarketingParam.split(",")
      dispatch(setFilterAirline(selectedAirlines))
    }
  }, [params])

  // update base URL
  const updatePageParameter = (url: string, selectedAirlines: string[]) => {
    const queryString = selectedAirlines.join(",")
    if (url.includes("&carrier_operating=")) {
      url = url.replace(
        /&carrier_operating=[^&]*/,
        `&carrier_operating=${queryString}`
      )
    } else {
      url += `&carrier_operating=${queryString}`
    }
    return url
  }

  // handle airline filter
  const handleCheckboxChange = (code: string, event: string | boolean) => {
    let updatedAirlines: string[]
    if (filterAirlines.includes(code)) {
      updatedAirlines = filterAirlines.filter((airline) => airline !== code)
    } else {
      updatedAirlines = [...filterAirlines, code]
    }
    dispatch(setFilterAirline(updatedAirlines))
    if (window !== undefined) {
      let baseURL = `${window.location.pathname}?${queryParams.toString()}`
      const newBaseURL = updatePageParameter(baseURL, updatedAirlines)
      router.replace(newBaseURL)
    }
  }

  return (
    <section>
      <h3 className="mb-2 font-bold text-secondary">Airlines</h3>
      <Separator orientation="horizontal" className="mb-4 h-[1px] w-full" />
      {Airlines?.map((airline, index) => (
        <div className="mb-3 flex items-center space-x-2" key={index}>
          <Checkbox
            id={airline.carrier_marketing}
            className="border-2 border-destructive"
            checked={filterAirlines.includes(airline.carrier_marketing)}
            onCheckedChange={(event) =>
              startTransition(() =>
                handleCheckboxChange(airline.carrier_marketing, event)
              )
            }
          />
          <Label
            htmlFor={airline.carrier_marketing}
            className="flex cursor-pointer items-center gap-2"
          >
            <Image
              src={hostedImage(`/${airline.logo}`)}
              alt={airline.name}
              height={20}
              width={20}
              objectFit="cover"
              objectPosition="center"
            />
            {airline.name}
          </Label>
        </div>
      ))}
    </section>
  )
}

export default FilterAirline
