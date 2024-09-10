"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  filter: Array<number[]> | undefined
}

const Stoppage = ({ filter: total_stoppage }: Props) => {
  const searchParams = useSearchParams()
  const routeType = searchParams.get("route")
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const departuredate = searchParams.get("departuredate")
  const returnDate = searchParams.get("returndate")
  const trips = searchParams.get("trips")
  const filterOption = useAppSelector(selectFilterOption)

  const dispatch = useAppDispatch()
  const [stoppage, setStoppage] = useState<
    {
      label: string
      value: string
    }[][]
  >([])

  const getLegHeaders = () => {
    if (routeType === "oneway") {
      return [`${origin} To ${destination}`]
    } else if (routeType === "roundway") {
      return [`${origin} To ${destination}`, `${destination} TO ${origin}`]
    } else if (routeType === "multiway") {
      if (trips) {
        const tripArray = trips.split(",")
        const headers = []
        for (let i = 0; i < tripArray.length; i += 3) {
          headers.push(`${tripArray[i]} To ${tripArray[i + 1]}`)
        }
        return headers
      }
    }
    return []
  }
  const legHeaders = getLegHeaders()

  useEffect(() => {
    if (total_stoppage?.length) {
      const stoppages = total_stoppage?.map((stoppageGroup) => {
        if (stoppageGroup && stoppageGroup.length > 0) {
          return stoppageGroup?.map((item: number) => {
            return {
              label:
                item === 0
                  ? "Nonstop"
                  : item === 1
                  ? "1 Stop"
                  : `${item} Stops`,
              value: item?.toString(),
            }
          })
        }
      })
      setStoppage(stoppages)
    }
  }, [total_stoppage])

  const handleCheckboxChange = (index: number, value: string) => {
    if (!filterOption) return
    let updatedStoppage = [...(filterOption.stoppage || [])]

    if (updatedStoppage[index]?.includes(Number(value))) {
      updatedStoppage[index] = updatedStoppage[index].filter(
        (stop) => stop !== Number(value)
      )
    } else {
      if (!updatedStoppage[index]) {
        updatedStoppage[index] = []
      }
      updatedStoppage[index] = [...updatedStoppage[index], Number(value)]
    }

    updatedStoppage = updatedStoppage.map((stops) => {
      if (stops) {
        return stops?.length === 0 ? null : stops
      }
    })

    dispatch(setFilterOption({ ...filterOption, stoppage: updatedStoppage }))
  }

  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">Stops</h3>
      {stoppage?.map((stoppageGroup, groupIndex) => (
        <div key={groupIndex}>
          <h4 className="mb-2 text-sm font-semibold">{` ${legHeaders[groupIndex]}`}</h4>
          {stoppageGroup?.map((stop, index) => (
            <div className="mb-3 flex items-center space-x-2" key={index}>
              <Checkbox
                id={`${groupIndex}-${stop.value}`}
                value={stop.value}
                className="border-2 border-destructive"
                onCheckedChange={() =>
                  handleCheckboxChange(groupIndex, stop.value)
                }
                checked={
                  filterOption.stoppage?.[groupIndex]?.includes(
                    Number(stop.value)
                  ) || false
                }
              />
              <Label
                htmlFor={`${groupIndex}-${stop.value}`}
                className="flex cursor-pointer items-center  gap-2"
              >
                {stop.label}
              </Label>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Stoppage
