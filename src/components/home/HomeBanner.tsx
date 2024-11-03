"use client"
import React, { useState } from "react"
import MainNav from "../common/main-nav"
import Image from "next/image"
import HomeSearchNavigation from "./elements/HomeSearchNavigation"
import { Hotel, Plane } from "lucide-react"
import FlightSearch from "./FlightSearch"

const HomeBanner = () => {
  const [activeTab, setActiveTab] = useState<"flight" | "hotel">("flight")

  const handleFlightSearch = (searchParams) => {
    console.log("Flight search with params:", searchParams)
  }
  return (
    <div className="relative  bg-[#E31837] dark:bg-gray-800 dark:text-gray-100">
      <header className="container z-40">
        <div className="flex h-[8vh] justify-between pt-5">
          <MainNav home={true} className="text-white" />
        </div>
      </header>

      {/* Banner content */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pb-7 lg:pt-10 ">
        <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
          <h1 className="font-roboto text-3xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-[42px]">
            Start Traveling Now
          </h1>
          <p className="text-lg text-white/90">
            Get flights and hotels worldwide for your trip with the best deals
          </p>
        </div>
      </section>

      {/* Tab Section */}
      <section className="pb-10 md:pb-12 lg:pb-20">
        <div className="container mx-auto max-w-[1285px] px-4">
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setActiveTab("flight")}
              className={`flex items-center gap-2 rounded-md px-6 py-2 transition-colors ${
                activeTab === "flight" ? "bg-white text-gray-600" : "bg-[#E31837] text-white dark:bg-gray-900 dark:text-gray-100"
              }`}
            >
              <Plane />
              Flight
            </button>
            <button
              onClick={() => setActiveTab("hotel")}
              className={`flex items-center gap-2 rounded-md px-6 py-2 transition-colors ${
                activeTab === "hotel" ? "bg-white text-gray-600" : "bg-[#E31837] text-white dark:bg-gray-900 dark:text-gray-100"
              }`}
            >
              <Hotel />
              Hotel
            </button>
          </div>

          <div className="rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900 dark:text-gray-100">

            {activeTab === "flight" ? (

              <FlightSearch onSearch={handleFlightSearch} />
            ) : (

              <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                <div className="md:col-span-4">
                  <input
                    type="text"
                    placeholder="Destination"
                    className="w-full rounded-md border p-3"
                  />
                </div>
                <div className="md:col-span-3">
                  <input
                    type="text"
                    placeholder="Check-in"
                    defaultValue="Tue, 29 Oct 2024"
                    className="w-full rounded-md border p-3"
                  />
                </div>
                <div className="md:col-span-3">
                  <input
                    type="text"
                    placeholder="Check-out"
                    defaultValue="Wed, 30 Oct 2024"
                    className="w-full rounded-md border p-3"
                  />
                </div>
                <div className="md:col-span-2">
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeBanner
