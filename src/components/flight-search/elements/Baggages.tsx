import React from "react"
import { Passenger as PassengerType } from "@/components/home/elements/types/flightSearchType"
import { cn } from "@/lib/utils"

type Props = {
  passengers: PassengerType[]
}

const typeMapping = {
  ADT: "Adult",
  C10: "Children",
  C05: "Kids",
  INF: "Infant",
}

const Baggages = ({ passengers }: Props) => {
  const routes = Array.from(
    new Set(
      passengers.flatMap((passenger) =>
        passenger.availability.map(
          (availability) =>
            `${availability.from_airport} TO ${availability.to_airport}`
        )
      )
    )
  )
  const columns = Math.min(routes.length, 3)

  return (
    <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-900 dark:text-gray-100">
      <div
        className={cn(
          `grid grid-cols-1 gap-4 md:grid-cols-2`,
          columns && `md:grid-cols-${columns}`
        )}
      >
        {routes.map((route) => {
          const [fromAirport, toAirport] = route.split(" TO ")
          return (
            <div key={route} className="overflow-x-auto">
              <h2 className="mb-4 text-lg font-semibold">{route}</h2>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Passenger
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {passengers.map((passenger, index) =>
                    passenger.availability
                      .filter(
                        (availability) =>
                          availability.from_airport === fromAirport &&
                          availability.to_airport === toAirport
                      )
                      .map((availability, aIndex) => (
                        <tr
                          key={`${index}-${aIndex}`}
                          className="hover:bg-gray-100 dark:hover:bg-gray-900"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {typeMapping[passenger.type] || passenger.type}
                            {passenger.number > 1 && (
                              <span> ({passenger.number})</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {availability.baggage.count}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                            {availability.baggage.unit}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Baggages
