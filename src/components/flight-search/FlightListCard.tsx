"use client"
import { hostedImage, imgHostLink } from "@/lib/utils"
import Image from "next/image"
import React, { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FareDetails from "./elements/FareDetails"
import Baggages from "./elements/Baggages"
import Policy from "./elements/Policy"
import Passenger from "./elements/Passenger"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type Props = {
  flight: Result
}

const FlightListCard = ({ flight }: Props) => {
  const [activeTab, setActiveTab] = useState("Flight Details")
  const tabs = [
    {
      label: "Flight Details",
      element: <FlightContent flights={flight} />,
    },
    {
      label: "Fare Summery",
      element: (
        <FareDetails fare={flight.fare} passengers={flight.passengers} />
      ),
    },
    {
      label: "Baggages",
      element: <Baggages passengers={flight.passengers} />,
    },

    {
      label: "Passenger",
      element: <Passenger passengers={flight.passengers} />,
    },
    {
      label: "Policy",
      element: <Policy />,
    },
  ]

  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem
          value={flight.carrier_code as string}
          className="border-0 px-2 md:px-0"
        >
          <Card
            className="my-1 w-full rounded-sm border-none bg-[#F5F7FA] dark:bg-card md:rounded-none md:bg-card"
            style={{ boxShadow: "rgba(26, 43, 61, 0.12) 0px 1px 3px" }}
          >
            <CardContent className=" px-2 py-0   md:px-5">
              <FlightCard flights={flight} fare={flight.fare} />
            </CardContent>
          </Card>

          <AccordionContent className="">
            <Tabs defaultValue={activeTab}>
              <ScrollArea className="w-full whitespace-nowrap rounded-md border md:w-full">
                <TabsList
                  className="mb-2 w-full overflow-x-scroll bg-[#dce4ff] md:overflow-auto"
                  aria-label="Manage your account"
                >
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.label}
                      value={tab.label}
                      onClick={() => setActiveTab(tab.label)}
                      className="md:mx-3 "
                    >
                      <p className="flex items-center text-[14px] font-bold md:gap-1">
                        {tab.label}
                      </p>
                    </TabsTrigger>
                  ))}
                </TabsList>
                <ScrollBar orientation="horizontal" className="invisible" />
              </ScrollArea>

              {tabs.map((tab) => (
                <TabsContent
                  key={tab.label}
                  className="TabsContent "
                  value={tab.label}
                >
                  {tab.element}
                </TabsContent>
              ))}
            </Tabs>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FlightListCard
