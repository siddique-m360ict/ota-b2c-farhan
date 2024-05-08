"use client"
import React, { useState } from "react"
import { Icons } from "../../icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import FlightSearch from "../FlightSearch"

const HomeSearchNavigation = () => {
  const [activeTab, setActiveTab] = useState("Flights")
  const tabs = [
    {
      id: "Flights",
      label: "Flights",

      icon: <Icons.Plane size={21} />,
      element: <FlightSearch home={true} />,
    },
    {
      id: "Hotels",
      label: "Hotels",
      icon: <Icons.Home className="size-[22px]" />,
      element: <>Hotels</>,
    },

    {
      id: "Trains",
      label: "Trains",
      icon: <Icons.TramFront />,
      element: <>Trains</>,
    },
    {
      id: "Cars",
      label: "Cars",
      icon: <Icons.CarFront className="size-[20px]" />,
      element: <>Cars</>,
    },
    {
      id: "Attractions & Tours",
      label: "Attractions & Tours",
      icon: <Icons.Attractions className="size-[20px]" />,
      element: <>Attractions & Tours</>,
    },
    {
      id: "Visa",
      label: "Visa",
      icon: <Icons.Bundle className="size-[22px]" />,
      element: <>Visa</>,
    },
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className="relative text-center">
      <Tabs defaultValue={activeTab}>
        <TabsList
          className="absolute top-[-12%] rounded-full bg-[rgba(15,41,77,.8)] py-[23px]  backdrop-blur-[6px] md:right-[4%]  lg:right-[10%] xl:right-[19%] 2xl:right-[21%]  "
          aria-label="Select Your Services"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="mx-3 rounded-full px-3 text-white"
            >
              <p className="flex items-center gap-1 text-[16px] font-bold">
                {tab?.icon}
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
  )
}

export default HomeSearchNavigation
