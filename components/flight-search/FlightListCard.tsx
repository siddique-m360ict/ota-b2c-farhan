"use client"
import { hostedImage, imgHostLink } from "@/lib/utils"
import Image from "next/image"
import React from "react"
import { Result } from "../home/elements/types/flightSearchType"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import FlightCard from "./elements/FlightCard"

type Props = {
  flight: Result
}
export type pricingInfo = {
  totalPrice: number
  currency: string
}
const FlightListCard = ({ flight }: Props) => {
  const pricingInfo: pricingInfo = {
    totalPrice: flight.totalPrice,
    currency: flight.currency,
  }
  return (
    <div>
      <Accordion type="single" collapsible>
        {flight?.flights?.map((flights, index) => (
          <AccordionItem
            value={flights?.id?.toString() as string}
            className="border-0"
            key={index}
          >
            <AccordionTrigger className="top-0 py-1 hover:no-underline  [&>svg]:absolute [&>svg]:bottom-[10px] [&>svg]:right-[5px]">
              <FlightCard flights={flights} pricingInfo={pricingInfo} />
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FlightListCard
