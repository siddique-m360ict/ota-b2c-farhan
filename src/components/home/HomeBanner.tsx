"use client"
import React, { useState } from "react"
import MainNav from "../common/main-nav"
import Image from "next/image"
import HomeSearchNavigation from "./elements/HomeSearchNavigation"
import { Hotel, Plane } from "lucide-react"

const HomeBanner = () => {
  const [activeTab, setActiveTab] = useState<"flight" | "hotel">("flight")

  return (
    <div className="relative bg-[#E31837]">
      <div>
        <header className="container z-40">
          <div className="flex h-[8vh] justify-between pt-5">
            <MainNav home={true} className="text-white" />
          </div>
        </header>

        {/* Banner content */}
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pb-7 lg:pt-10">
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
        <section className="pb-8 md:pb-12 lg:pb-20">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setActiveTab("flight")}
                className={`flex items-center gap-2 rounded-md px-6 py-2 transition-colors ${
                  activeTab === "flight" ? "bg-white text-gray-600" : "bg-[#E31837] text-white"
                }`}
              >
                <Plane />
                Flight
              </button>
              <button
                onClick={() => setActiveTab("hotel")}
                className={`flex items-center gap-2 rounded-md px-6 py-2 transition-colors ${
                  activeTab === "hotel" ? "bg-white text-gray-600" : "bg-[#E31837] text-white"
                }`}
              >
                <Hotel />
                Hotel
              </button>
            </div>




            <div className="rounded-lg bg-white p-4 shadow-lg">
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <button className="flex items-center gap-2">
                  <span>Round Trip</span>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>

                <button className="flex items-center gap-2">
                  <span>1 Passenger</span>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button className="flex items-center gap-2">
                  <span>Economy</span>
                  <svg className="size-4" viewBox="0 0 24 24" fill="none">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <div className="ml-auto mb-5">
                  <button className="flex items-center gap-2 text-[#E31837]">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Order List
                    <svg className="size-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Search Form - Flight */}
              {activeTab === "flight" && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      placeholder="Origin"
                      className="w-full rounded-md border p-3"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <input
                      type="text"
                      placeholder="Destination"
                      className="w-full rounded-md border p-3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Departure"
                      defaultValue="Tue, 29 Oct 2024"
                      className="w-full rounded-md border p-3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="text"
                      placeholder="Return"
                      defaultValue="Wed, 30 Oct 2024"
                      className="w-full rounded-md border p-3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button className="w-full rounded-md bg-[#E31837] p-3 text-white transition-colors hover:bg-[#c41530]">
                      Search
                    </button>
                  </div>
                </div>
              )}

              {/* Search Form - Hotel */}
              {activeTab === "hotel" && (
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
                    <button className="w-full rounded-md bg-[#E31837] p-3 text-white transition-colors hover:bg-[#c41530]">
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomeBanner
