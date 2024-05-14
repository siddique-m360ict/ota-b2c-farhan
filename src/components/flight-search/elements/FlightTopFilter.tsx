"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"

const FlightTopFilter = () => {
  return (
    <Card className="mt-[4px]">
      <CardContent className="overflow-hidden whitespace-nowrap p-4 px-6  md:overflow-auto  md:whitespace-normal ">
        <div className="flex items-center gap-4 overflow-y-hidden overflow-x-scroll md:gap-6 md:overflow-x-hidden md:overflow-y-hidden">
          <div className="relative flex basis-full cursor-pointer">
            <p className="w-full pe-4 text-center  text-sm font-bold text-secondary md:pe-0">
              Lowest Price
            </p>
            <Separator
              orientation="vertical"
              className=" absolute right-0 top-[-8px] h-[4vh] w-[1px]"
            />
          </div>
          <div className="relative flex basis-full cursor-pointer">
            <p className="w-full pe-4 text-center  text-sm font-bold text-secondary md:pe-0">
              Shortest Duration
            </p>
            <Separator
              orientation="vertical"
              className=" absolute right-0 top-[-8px] h-[4vh] w-[1px]"
            />
          </div>
          <div className="relative flex basis-full cursor-pointer">
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
