"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"

const FlightTopFilter = () => {
  return (
    <Card className="mt-[4px] ">
      <CardContent className="p-4 px-6">
        <div className="flex items-center gap-6">
          <div className="relative flex basis-full cursor-pointer items-center text-center">
            <h2 className="text-sm font-bold text-secondary">Recommended</h2>
            <Separator
              orientation="vertical"
              className=" absolute right-0 top-[-8px] h-[4vh] w-[1px]"
            />
          </div>
          <div className="relative flex basis-full cursor-pointer">
            <p className="w-full text-center text-sm font-bold text-secondary">
              Lowest Price
            </p>
            <Separator
              orientation="vertical"
              className=" absolute right-0 top-[-8px] h-[4vh] w-[1px]"
            />
          </div>
          <div className="relative flex basis-full cursor-pointer">
            <p className="w-full text-center text-sm font-bold text-secondary">
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
