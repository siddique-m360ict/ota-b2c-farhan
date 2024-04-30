"use client"
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Icons } from "../icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import MultiCity from "./elements/MultiCity"
import OneWay from "./elements/OneWay"
import RoundWay from "./elements/RoundWay"
import SelectClass from "./elements/SelectClass"
import SelectPassenger from "./elements/SelectPassenger"
import SelectRoute from "./elements/SelectRoute"

export interface Passenger {
  adult: number
  kids: number
  children: number
  infant: number
}

type Props = {
  home?: boolean
  className?: string
}
const FlightSearch = ({ home, className }: Props) => {
  const [passenger, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })
  const [cabinClass, setCabinClass] = useState<string>("Y")
  const [body, setBody] = useState<any>({})
  const [activeRoute, setActiveRoute] = useState("oneway")
  const routeContent = [
    {
      id: "oneway",
      element: <OneWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "roundtrip",
      element: <RoundWay cabinClass={cabinClass} passenger={passenger} />,
    },
    {
      id: "multicity",
      element: <MultiCity cabinClass={cabinClass} passenger={passenger} />,
    },
  ]

  return (
    <Card className={cn(!home && "shadow-xl", className)}>
      <CardContent
        className={cn("px-4 pt-12 text-start md:px-6", !home && "pt-4")}
      >
        <div className="mb-3 mt-1 flex items-center gap-3 md:gap-5">
          <SelectRoute
            activeRoute={activeRoute}
            setActiveRoute={setActiveRoute}
          />
          <SelectPassenger setPassenger={setPassenger} passenger={passenger} />

          <SelectClass cabinClass={cabinClass} setCabinClass={setCabinClass} />
        </div>
        {routeContent.map(
          (route, index) =>
            route.id === activeRoute && <div key={index}>{route.element}</div>
        )}
      </CardContent>
    </Card>
  )
}

export default FlightSearch
