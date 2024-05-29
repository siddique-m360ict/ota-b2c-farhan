import React from "react"
import {
  Fare,
  Passenger,
} from "@/components/home/elements/types/flightSearchType"
import { Separator } from "@/components/ui/separator"
import { cn, formatNumber } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Props = {
  fare: Fare
  className?: string
  passengers: Passenger[]
}

const typeMapping = {
  ADT: "Adult",
  C11: "Children",
  C05: "Kids",
  INF: "Infant",
}

const FareDetails = ({ fare, className, passengers }: Props) => {
  const fareDetails = [
    { label: "Base Fare", value: fare.base_fare },
    { label: "Tax", value: fare.total_tax },
    { label: "AIT", value: fare.ait },
    { label: "Total Price", value: fare.total_price },
    { label: "Discount", value: fare.discount },
    { label: "Total Amount", value: fare.payable },
  ]

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100">
      <div className="justify-between md:flex">
        <div className="mt-2 basis-3/4 items-center justify-center border-r dark:border-gray-700">
          <h3 className="dark:text-primary-light mb-2 text-center text-[16px] font-bold text-primary">
            Passenger Fare
          </h3>

          <div>
            <ScrollArea className="w-screen whitespace-nowrap rounded-md border md:w-full">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Base Fare
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Tax
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-800">
                  {passengers.map((passenger, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-3 dark:text-gray-100">
                        {typeMapping[passenger.type] || passenger.type}
                        {<span> ({passenger.number})</span>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 dark:text-gray-100">
                        <span className="font-mono text-sm"> ৳</span>{" "}
                        {formatNumber(passenger.fare.base_fare)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 dark:text-gray-100">
                        <span className="font-mono text-sm"> ৳</span>{" "}
                        {formatNumber(passenger.fare.tax)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 dark:text-gray-100">
                        <span className="font-mono text-sm"> ৳</span>{" "}
                        {formatNumber(passenger.fare.total_fare)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </div>

        <div className="flex-1 p-2">
          <h3 className="dark:text-primary-light my-3 text-center text-sm font-bold text-primary">
            Total Fare Summary
          </h3>
          <div className={cn("flex flex-col px-2", className)}>
            {fareDetails.map((item, index) => (
              <div key={index}>
                <div
                  className={cn(
                    "flex justify-between",
                    item.label === "Total Amount" &&
                      "dark:text-primary-light font-bold text-primary"
                  )}
                >
                  <span>{item.label}</span>
                  <span>৳ {formatNumber(item.value)}</span>
                </div>
                <Separator
                  orientation="horizontal"
                  className="my-1 h-[1px] w-full dark:bg-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FareDetails
