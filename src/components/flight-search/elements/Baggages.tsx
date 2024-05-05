import { Passenger } from "@/components/home/elements/types/flightSearchType"
import React from "react"

type Props = {
  passengers: Passenger[]
}

const Baggages = ({ passengers }: Props) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border ">
          <thead>
            <tr className="p-3">
              <th className="rounded border text-center">Passenger</th>
              <th className="rounded border text-center">Unit</th>
              <th className="rounded border text-center">Weight</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger, index) => (
              <tr key={index}>
                <td className="rounded border text-center">
                  {passenger.type}({passenger.number})
                </td>
                <td className="rounded border text-center">
                  {passenger.baggage?.unit && passenger.baggage?.unit}
                </td>
                <td className="rounded border text-center">
                  {passenger.baggage?.weight ? passenger.baggage.weight : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Baggages
