"use client"
import FareDetails from "@/components/flight-search/elements/FareDetails"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Passenger,
  RevalidateFare,
} from "@/lib/server/flights/RevalidateFlightEndpoint"
import { formatNumber } from "@/lib/utils"
import React from "react"

type Props = {
  passengers: Passenger[]
  fare: RevalidateFare
}
const RevalidatePriceBox = ({ passengers, fare }: Props) => {
  return (
    <div>
      <Card className="shadow-lg">
        <CardHeader className="px-6  py-4">
          <h1 className="text-[1.2rem] font-bold ">Price Details</h1>
        </CardHeader>
        <CardContent>
          <p className="pb-8 text-sm text-destructive">
            All prices are in{" "}
            <span className="font-bold  text-[#8592a6]">Bangladeshi taka</span>
          </p>

          <div>
            <h2 className="mb-3 mt-2 text-sm font-bold text-secondary">
              Fare Summary
            </h2>
            <div className="mb-[7px] flex justify-between text-sm">
              <p className="border-b border-dashed">Base Fare</p>
              <p>{formatNumber(fare.base_fare)}</p>
            </div>
            <div className=" mb-[7px]  flex justify-between text-sm">
              <p className="border-b border-dashed">Tax</p>
              <p>{formatNumber(fare.total_tax)}</p>
            </div>

            <div className=" mb-[7px]  flex justify-between text-sm">
              <p className="border-b border-dashed">AIT</p>
              <p>{formatNumber(fare.ait)}</p>
            </div>

            <div className="mb-[7px]  flex justify-between text-sm ">
              <p className="border-b border-dashed">Total Price</p>
              <p>{formatNumber(fare.total_price)}</p>
            </div>

            <div className="mb-[7px]  flex justify-between text-sm">
              <p className="border-b border-dashed">Discount</p>
              <p>{formatNumber(fare.discount)}</p>
            </div>
          </div>
        </CardContent>
        <div className="mx-4 mt-2 h-px w-[90%] border border-dashed bg-secondaryBg"></div>
        <CardFooter className="mt-6 flex flex-row justify-between text-xl font-bold ">
          <p>Total Amount</p>
          <p className="text-primary">৳ {formatNumber(fare.payable)}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RevalidatePriceBox
