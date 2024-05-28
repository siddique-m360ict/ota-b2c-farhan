"use client"

import Baggages from "@/components/flight-search/elements/Baggages"
import Passenger from "@/components/flight-search/elements/Passenger"
import Policy from "@/components/flight-search/elements/Policy"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Passenger as PassengerType } from "@/lib/server/flights/RevalidateFlightEndpoint"
import { formatNumber } from "@/lib/utils"
import { useState } from "react"

type Props = {
  passengers: PassengerType[]
}

const typeMapping = {
  ADT: "Adult",
  C11: "Children",
  C05: "Kids",
  INF: "Infant",
}

const TicketFare = ({ passengers }: Props) => {
  const [activeTab, setActiveTab] = useState("Fare Summary")

  const tabs = [
    {
      label: "Fare Summary",
      element: (
        <div className="p-3 md:p-4">
          <Table>
            <TableHeader className="w-full">
              <p className="inline-block w-full font-bold">Passenger Fare</p>
              <TableRow>
                <TableHead className="p-0">Passenger</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead className="text-right">Tax</TableHead>
                <TableHead className="text-right">Total Fare</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passengers.map((passenger, index) => (
                <TableRow key={index}>
                  <TableCell className="p-0">
                    {typeMapping[passenger.type]} ({passenger.number})
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">৳</span>{" "}
                    {formatNumber(passenger.fare.base_fare)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono">৳</span>{" "}
                    {formatNumber(passenger.fare.tax)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    <span className="font-mono">৳</span>{" "}
                    {formatNumber(passenger.fare.total_fare)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      label: "Baggages",
      element: (
        <div className="p-4">
          <Baggages passengers={passengers} />
        </div>
      ),
    },
    {
      label: "Policy",
      element: (
        <div className="w-full space-y-2 p-4">
          <p>
            <span className="font-semibold">Cancellation: </span>
            Refund Amount = Paid Amount - Airline Cancellation Fee
          </p>
          <p>
            <span className="font-semibold">Re-issue: </span>
            Re-issue Fee = Airline Fee + Fare Difference
          </p>
          <p>
            The airline&apos;s fee is indicative and per person. Convenience fee
            is non-refundable.
          </p>
        </div>
      ),
    },
    {
      label: "Passenger",
      element: (
        <div className="w-full">
          <Passenger passengers={passengers} />
        </div>
      ),
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  return (
    <div className="rounded-md">
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <ScrollArea className="w-[94vw] whitespace-nowrap rounded-md border md:w-full">
          <TabsList
            className="inline-flex h-auto w-full"
            aria-label="Manage your account"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.label}
                className="mx-3 flex items-center gap-1 text-[14px] font-bold"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <ScrollArea className="w-[94vw] whitespace-nowrap rounded-md border md:w-full">
          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label}>
              {tab.element}
            </TabsContent>
          ))}
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </Tabs>
    </div>
  )
}

export default TicketFare
