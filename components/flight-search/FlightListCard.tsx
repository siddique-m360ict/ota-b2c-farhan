"use client"
import { hostedImage, imgHostLink } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Fare, Result } from "../home/elements/types/flightSearchType"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Card, CardContent } from "../ui/card"
import FlightCard from "./elements/FlightCard"
import FlightContent from "./elements/FlightContent"
import FlightContentExtraInfo from "./elements/FlightContentExtraInfo"

type Props = {
  flight: Result
}

const FlightListCard = ({ flight }: Props) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem
          value={flight.carrier_code as string}
          className="border-0"
        >
          <Card className="shadow-2xlo my-1 w-full rounded-none border-none">
            <CardContent className="px-5 py-0">
              <FlightCard flights={flight} fare={flight.fare} />
            </CardContent>
          </Card>

          <AccordionContent>
            <div className="justify-between md:flex">
              <div className="mt-2 basis-3/4 items-center justify-center border-r">
                <h3 className="mb-2 text-center text-lg font-bold">
                  Flight Details
                </h3>
                <FlightContent flights={flight} />
              </div>
              <div className="flex-1 p-2">
                <FlightContentExtraInfo
                  fare={flight.fare}
                  passengers={flight.passengers}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FlightListCard
