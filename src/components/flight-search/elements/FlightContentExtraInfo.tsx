import {
  Fare,
  Passenger,
} from "@/components/home/elements/types/flightSearchType"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React, { useState } from "react"
import Baggages from "./Baggages"
import FareDetails from "./FareDetails"
import Policy from "./Policy"

type Props = {
  fare: Fare
  passengers: Passenger[]
}
const FlightContentExtraInfo = ({ fare, passengers }: Props) => {
  const [activeTab, setActiveTab] = useState("Fare")
  const tabs = [
    {
      label: "Fare",
      element: <FareDetails fare={fare} />,
    },
    {
      label: "Baggages",
      element: <Baggages passengers={passengers} />,
    },
    {
      label: "Policy",
      element: <Policy />,
    },
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }
  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="mb-2 w-full" aria-label="Manage your account">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.label}
            value={tab.label}
            onClick={() => handleTabChange(tab.label)}
            className="mx-3"
          >
            <p className="flex items-center gap-1 text-[14px] font-bold">
              {tab.label}
            </p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.label} className="TabsContent" value={tab.label}>
          {tab.element}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default FlightContentExtraInfo
