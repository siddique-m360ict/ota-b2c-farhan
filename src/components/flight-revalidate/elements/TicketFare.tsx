"use client"
import Policy from "@/components/flight-search/elements/Policy"
import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Passenger } from "@/lib/server/flights/RevalidateFlightEndpoint"
import { useState } from "react"
type Props = {
  passengers: Passenger[]
}
const TicketFare = ({ passengers }: Props) => {
  const [activeTab, setActiveTab] = useState("Fare")
  const tabs = [
    {
      label: "Fare",
      element: (
        <div className="p-3 md:p-4">
          <Table className="overflow-x-scroll whitespace-nowrap">
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
                    {passenger.type} ({passenger.number})
                  </TableCell>
                  <TableCell> ৳ {passenger.fare.base_fare}</TableCell>
                  <TableCell className="text-right">
                    ৳ {passenger.fare.tax}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ৳ {passenger.fare.total_fare}
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
          <Table>
            <TableHeader>
              <p className="font-bold">Baggage Allowance</p>
              <TableRow>
                <TableHead className="p-0">Passenger</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-center">Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passengers.map((passenger, index) => (
                <TableRow key={index}>
                  <TableCell className="p-0">
                    {passenger.type}({passenger.number})
                  </TableCell>
                  <TableCell>{passenger.baggage?.unit || "N/A"}</TableCell>
                  <TableCell className="text-center">
                    {passenger.baggage?.weight || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ),
    },
    {
      label: "Policy",
      element: (
        <div className="tab-content">
          <div className="mt-3 space-y-2 p-4 pb-8">
            <p>
              <span className="font-semibold"> Cancellation: </span>
              Refund Amount = Paid Amount - Airline Cancellation Fee
            </p>

            <p>
              <span className="font-semibold"> Re-issue: </span>
              Re-issue Fee = Airline Fee + Fare Difference
            </p>

            <p>
              *The {"airline's"} fee is indicative and per person. Convenience
              fee is non-refundable.
            </p>
          </div>
        </div>
      ),
    },
  ]
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }
  return (
    <div className="relative rounded-sm bg-secondaryBg md:gap-8">
      <Tabs defaultValue={activeTab}>
        <TabsList className="w-full " aria-label="Manage your account">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              onClick={() => handleTabChange(tab.label)}
              className="mx-3  "
            >
              <p className="flex items-center gap-1 text-[14px] font-bold">
                {tab.label}
              </p>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.label}
            className="TabsContent"
            value={tab.label}
          >
            {tab.element}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default TicketFare
