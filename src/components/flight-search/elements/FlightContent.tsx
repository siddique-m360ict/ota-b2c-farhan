import {
  Option,
  Result,
} from "@/components/home/elements/types/flightSearchType"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hostedImage } from "@/lib/utils"
import Image from "next/image"
import React, { useState } from "react"
import {
  convertMinutesToHM,
  formatFlightDate,
  minutesToHoursAndMinutes,
  timeSlice,
} from "@/lib/formatter/dateTimeFormatter"
import { Icons } from "@/components/icons"

type Props = {
  flights: Result
}
interface TabDataTypes {
  id: string
  label: string
  content: Option[]
  layover: number[]
}
const FlightContent = ({ flights }: Props) => {
  const [activeTab, setActiveTab] = useState(
    flights?.flights[0]?.id?.toString() + 0
  )

  let tabs: TabDataTypes[] = []
  flights.flights?.map((flight, index) => {
    let departure_airport = flight.options[0]?.departure?.airport_code
    let arrival_airport =
      flight.options[flight.options.length - 1].arrival?.airport_code
    let content = flight.options
    let layover = flight.layover_time

    const makeData = {
      id: flight.id?.toString() + index,
      label: departure_airport + "-" + arrival_airport,
      layover,
      content,
    }
    tabs.push(makeData)
  })

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  return (
    <Tabs defaultValue={activeTab}>
      <TabsList className="h-0 bg-transparent" aria-label="Manage your account">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab?.id}
            onClick={() => handleTabChange(tab.id)}
            className="mx-2 my-[-3px] mb-[19px] rounded-none border-b bg-transparent bg-none  pb-2  shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary"
          >
            <p className="flex items-center gap-1 text-[14px] font-bold">
              {tab.label}
            </p>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} className="TabsContent mt-0" value={tab.id}>
          <div>
            {tab.content?.map((item, index) => (
              <div className=" px-3" key={index}>
                <div className="flex items-center justify-between border-y">
                  <div className="flex items-center justify-between gap-3 pb-3 pt-4  ">
                    <Image
                      src={hostedImage(
                        `/${item.carrier?.carrier_marketing_logo}`
                      )}
                      alt="airline_logo"
                      width={50}
                      height={50}
                    />

                    <div>
                      <div className="text-sm">
                        {item?.carrier?.carrier_marketing_airline}
                      </div>

                      <div>
                        <p className="text-[11px] leading-3">
                          Aircraft: {item?.carrier?.carrier_aircraft_name}
                        </p>
                      </div>
                      <div className="text-[11px]">
                        {(item?.carrier?.carrier_marketing_code || "") +
                          "-" +
                          item?.carrier?.carrier_marketing_flight_number}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    {
                      flights?.passengers[0].availability[0].segments[
                        flights?.passengers[0].availability[0].segments.length -
                          1
                      ].cabin_type
                    }
                    (
                    {
                      flights?.passengers[0].availability[0].segments[0]
                        .booking_code
                    }
                    )
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-lg font-semibold">
                      {item?.departure?.airport_code} -{" "}
                      {timeSlice(item?.departure?.time)}
                    </div>
                    <div className="text-sm">
                      {formatFlightDate(item.departure?.date)}
                    </div>

                    <div className="text-xs ">
                      {item?.departure?.airport}
                      {item?.departure?.terminal && (
                        <span className="ml-1 text-xs text-gray-500">
                          (Terminal - {item?.departure.terminal})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Icons.Plane className="mx-auto text-2xl text-primary opacity-50" />
                    <p className="text-center text-sm font-semibold">
                      {minutesToHoursAndMinutes(item?.elapsedTime)?.time}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold">
                      {item?.arrival?.airport_code} -{" "}
                      {timeSlice(item?.arrival?.time)}
                    </div>
                    <div className="text-sm">
                      {formatFlightDate(item?.arrival?.date)}
                    </div>

                    <div className="text-xs">
                      {item?.arrival?.airport}
                      {item?.arrival?.terminal && (
                        <span className="text-xs text-gray-500">
                          (Terminal - {item?.arrival.terminal})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {tab.layover[index] !== 0 && (
                  <div className="mt-2 ">
                    <p className="rounded bg-[#cee2fa] p-1 text-center text-xs text-black dark:bg-black dark:text-white">
                      Layover at <span>{item.arrival?.airport}</span>
                      <span className="ml-1 font-bold">
                        {convertMinutesToHM(tab.layover[index])}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default FlightContent
