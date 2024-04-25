"use client"
import React, { useState } from "react"
import { Icons } from "../icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import FlightSearch from "./FlightSearch"

const HomeSearch = () => {
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
      icon: <Icons.Home className="text-[4px]" />,
      element: <>Hotels</>,
    },

    {
      id: "Trains",
      label: "Trains",
      icon: <Icons.TramFront />,
      element: <>Trains</>,
    },
    { id: "Cars", label: "Cars", icon: <Icons.CarFront />, element: <>Cars</> },
    {
      id: "Attractions & Tours",
      label: "Attractions & Tours",
      icon: <Icons.Attractions />,
      element: <>Attractions & Tours</>,
    },
    { id: "Visa", label: "Visa", icon: <Icons.Bundle />, element: <>Visa</> },
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className="relative text-center">
      <Tabs defaultValue={activeTab}>
        <TabsList
          className="absolute right-[21%] top-[-12%]  rounded-full bg-[rgba(15,41,77,.8)] py-[23px] backdrop-blur"
          aria-label="Manage your account"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className="mx-3 rounded-full text-white"
            >
              <p className="flex items-center gap-1 text-[14px] font-bold">
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

export default HomeSearch
