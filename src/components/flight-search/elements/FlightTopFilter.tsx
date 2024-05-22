"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"

import { cn } from "@/lib/utils"
import React from "react"

const FlightTopFilter = () => {
  const dispatch = useAppDispatch()
  let filterItem = useAppSelector(selectFilterOption)
  const handleClick = (value: "CHEAPEST" | "SHORTEST" | "EARLIEST") => {
    dispatch(setFilterOption({ sort_by: value }))
  }

  return (
    <Card className="mt-[4px]">
      <CardContent className="overflow-hidden whitespace-nowrap p-0 px-0  md:overflow-auto  md:whitespace-normal ">
        <div className="flex items-center gap-4 overflow-y-hidden overflow-x-scroll md:gap-6 md:overflow-x-hidden md:overflow-y-hidden">
          <div
            className={cn(
              "relative flex basis-full cursor-pointer p-3",
              filterItem.sort_by === "CHEAPEST" &&
                "bg-primary  [&>p]:text-white"
            )}
            onClick={() => handleClick("CHEAPEST")}
          >
            <p className="w-full text-center  text-sm font-bold text-secondary md:pe-0">
              Lowest Price
            </p>
            <Separator
              orientation="vertical"
              className="absolute right-[-1px] top-[8px] h-[4vh] w-[1px]"
            />
          </div>
          <div
            className={cn(
              "relative flex basis-full cursor-pointer p-3",
              filterItem.sort_by === "SHORTEST" &&
                "bg-primary  [&>p]:text-white"
            )}
            onClick={() => handleClick("SHORTEST")}
          >
            <p className="w-full pe-4 text-center  text-sm font-bold text-secondary md:pe-0">
              Shortest Duration
            </p>
            <Separator
              orientation="vertical"
              className=" absolute right-[-1px] top-[8px] h-[4vh] w-[1px]"
            />
          </div>
          <div
            className={cn(
              "relative flex basis-full cursor-pointer p-3",
              filterItem.sort_by === "EARLIEST" &&
                "bg-primary  [&>p]:text-white"
            )}
            onClick={() => handleClick("EARLIEST")}
          >
            <p className="w-full text-center text-sm font-bold text-secondary">
              Earliest First
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FlightTopFilter
