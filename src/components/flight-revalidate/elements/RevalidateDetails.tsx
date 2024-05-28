import { Passenger } from "@/lib/server/flights/RevalidateFlightEndpoint"
import React from "react"
import TicketFare from "./TicketFare"

type Props = {
  passengers: Passenger[]
}
const RevalidateDetails = ({ passengers }: Props) => {
  return (
    <div>
      <TicketFare passengers={passengers} />
    </div>
  )
}

export default RevalidateDetails
