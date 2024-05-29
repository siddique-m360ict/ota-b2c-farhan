import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Passenger as PassengerType } from "@/components/home/elements/types/flightSearchType"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

type Props = {
  passengers: PassengerType[]
}

const typeMapping = {
  ADT: "Adult",
  C10: "Children",
  C05: "Kids",
  INF: "Infant",
}

const Passenger = ({ passengers }: Props) => {
  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 md:p-4">
      <Accordion type="single" collapsible defaultValue="passenger-0">
        {passengers.map((passenger, pIndex) => (
          <AccordionItem key={pIndex} value={`passenger-${pIndex}`}>
            <AccordionTrigger className="bg-card px-4">
              <div className="flex w-full justify-between">
                <p>
                  {typeMapping[passenger.type] || passenger.type}
                  <span> ({passenger.number})</span>
                </p>
                <p className="text-destructive">
                  {!passenger.non_refundable ? "Refundable" : "nonrefundable"}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {passenger.availability.map((availability, aIndex) => (
                <Card key={aIndex} className="mt-2 border-t pt-2">
                  <CardHeader>
                    <h4 className="text-sm font-medium">
                      Flight from {availability.from_airport} to{" "}
                      {availability.to_airport}
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="mt-2 min-w-full border">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">Segment</th>
                            <th className="border px-4 py-2">Cabin Type</th>
                            <th className="border px-4 py-2">Meal Type</th>
                            <th className="border px-4 py-2">
                              Available Seats
                            </th>
                            <th className="border px-4 py-2">
                              Break Available
                            </th>
                            <th className="border px-4 py-2">
                              Fare Break Available
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {availability.segments.map((segment, sIndex) => (
                            <tr key={sIndex}>
                              <td className="border px-4 py-2">
                                {segment.name}
                              </td>
                              <td className="border px-4 py-2">
                                {segment.cabin_type} ({segment.booking_code})
                              </td>
                              <td className="border px-4 py-2">
                                {segment.meal_type}{" "}
                                {segment.meal_code && (
                                  <span>({segment.meal_code})</span>
                                )}
                              </td>

                              <td className="border px-4 py-2">
                                {segment.available_seat}
                              </td>
                              <td className="border px-4 py-2">
                                {segment.available_break ? "Yes" : "No"}
                              </td>
                              <td className="border px-4 py-2">
                                {segment.available_fare_break ? "Yes" : "No"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default Passenger
