"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Icons } from "../icons"
import Atlanta from "./elements/PopularElements/Atlanta"

const PopularAttractions = () => {
  const headingTitle = [
    { img: "/images/home/love.webp", name: "We Price Match" },
    { img: "/images/home/check.webp", name: "Hotel Booking Guarantee" },
    { img: "/images/home/bad.webp", name: "Hotel Stay Guarantee" },
  ]

  const [activeTab, setActiveTab] = useState("Atlanta")
  const tabs = [
    {
      id: "Atlanta",
      label: "Atlanta",
      element: <Atlanta />,
    },
    {
      id: "Orlando",
      label: "Orlando",
      element: <>Orlando Properties Coming soon</>,
    },
    {
      id: "Miami Beach",
      label: "Miami Beach",
      element: <>Miami Beach Properties Coming soon</>,
    },
    {
      id: "New York",
      label: "New York",
      element: <>New York Properties Coming soon</>,
    },
    {
      id: "Las Vegas",
      label: "Las Vegas",
      element: <>Las Vegas Properties Coming soon</>,
    },
    {
      id: "Houston",
      label: "Houston",
      element: <>Houston Properties Coming soon</>,
    },
  ]

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <div className="mt-8 pb-8 md:container">
      <Card
        className="border-none "
        style={{
          background:
            "url(/images/home/popular.png) no-repeat right 24px top 4px,radial-gradient(ellipse 30% 26% at 80% 0,rgba(122,226,211,.28),transparent),radial-gradient(ellipse 30% 26% at bottom left,rgba(122,226,211,.28),transparent),#f7fafc",
        }}
      >
        <CardHeader className="p-4 pb-2 md:p-6 md:pb-0">
          <h1 className="font-heading text-secondary md:text-[26px]">
            Featured Properties
          </h1>
          <div className="hidden justify-start gap-4 md:flex ">
            {headingTitle.map((item, index) => (
              <div
                key={index}
                className="box relative flex gap-1 text-[14px] font-[400] text-destructive"
              >
                <Image
                  src={item.img}
                  alt={"secured image"}
                  width={20}
                  height={20}
                />
                <p className="relative">
                  {item.name}
                  <span
                    className="absolute bottom-0 left-0"
                    style={{
                      border: "none",
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4) 2px, transparent 0px, transparent 4px, rgba(255, 255, 255, 0.4) 0px)",
                      height: "1px",
                      width: "100%",
                    }}
                  ></span>
                </p>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-3 md:p-6">
          <div>
            <Tabs defaultValue={activeTab}>
              <div className="overflow-x-scroll md:overflow-x-hidden">
                <TabsList
                  aria-label="Select Your Services"
                  className="mb-4 gap-2 bg-transparent  md:gap-6"
                >
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className="text-sm shadow-md data-[state=active]:shadow-lg md:px-4 md:data-[state=active]:bg-secondary md:data-[state=active]:text-white"
                    >
                      <p className="flex items-center gap-1 font-bold md:text-[16px]">
                        {tab.label}
                      </p>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  className="TabsContent"
                  value={tab.id}
                >
                  {tab.element}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PopularAttractions
