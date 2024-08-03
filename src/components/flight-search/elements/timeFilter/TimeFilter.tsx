import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useEffect, useState } from "react"
import DepartureTime from "./DepartureTime"
import ArrivalTime from "./ArrivalTime"
import { usePathname, useSearchParams } from "next/navigation"
import { IAirportList } from "@/components/home/elements/types/flightSearchType"
import { DateRange } from "react-day-picker"

const TimeFilter = () => {
  const searchParams = useSearchParams()
  const origin = searchParams.get("origin")
  const destination = searchParams.get("destination")
  const route = searchParams.get("route")

  const [activeTab, setActiveTab] = useState("1")
  const tabs = [
    {
      id: "1",
      label: "Departure",
      element: <DepartureTime route={route} />,
    },
    {
      id: "2",
      label: "Arrival",
      element: <ArrivalTime route={route} />,
    },
  ]
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  //   -------------------

  return (
    <div>
      <h3 className="mb-4 font-bold text-secondary">Flight Schedules</h3>
      <div className="relative text-center">
        <Tabs defaultValue={activeTab}>
          <TabsList
            className="w-full rounded border bg-[#EBF0F5] py-[8px]"
            aria-label="Select Your Services"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="rounded px-9"
              >
                <p className="flex items-center gap-1 text-[16px] font-bold">
                  {tab.label}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} className="TabsContent" value={tab.id}>
              {tab.element}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default TimeFilter
