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
import React from "react"

type Props = {
  passengers: Passenger[]
  fare: RevalidateFare
}
const RevalidatePriceBox = ({ passengers, fare }: Props) => {
  return (
    <div>
      <Card className="border-none shadow-2xl">
        <CardHeader className="px-6  py-4">
          <h1 className="text-[1.2rem] font-bold ">Price Details</h1>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            All prices are in{" "}
            <span className="font-bold  text-[#8592a6]">Bangladeshi taka</span>
          </p>
          <div className="my-5">
            <Accordion type="single" collapsible className="w-full">
              {passengers?.map((pass) => (
                <AccordionItem value={pass.type as string} className="border-0">
                  <AccordionTrigger className="flex justify-between py-1 text-sm font-bold text-secondary  hover:no-underline [&>svg]:absolute [&>svg]:left-[35%] [&>svg]:text-destructive">
                    <p>
                      Tickets ({pass.number} {pass.type})
                    </p>
                    <p>৳ {pass.fare?.total_fare}</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-1 text-destructive">
                      <div className="flex justify-between">
                        Fare <p>৳ {pass.fare?.base_fare}</p>
                      </div>

                      <div className="flex justify-between">
                        Taxes <p>৳ {pass.fare?.tax}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <h2 className="mb-2 mt-2 text-sm font-bold text-secondary">
              Fare Summary
            </h2>
            <div className="flex justify-between text-sm">
              <p>Base Fare</p>
              <p>{fare.base_fare}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Discount</p>
              <p>{fare.discount}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>AIT</p>
              <p>{fare.ait}</p>
            </div>
            <div className="flex justify-between text-sm line-through">
              <p>Total Price</p>
              <p>{fare.total_price}</p>
            </div>
          </div>
        </CardContent>
        <div className="mx-4 mt-2 h-[1px] w-[90%] border border-dashed bg-secondaryBg"></div>
        <CardFooter className="my-6 flex flex-row justify-between text-xl font-bold ">
          <p>Total</p>
          <p className="text-primary">৳ {fare.payable}</p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RevalidatePriceBox
