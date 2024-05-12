import { Icons } from "@/components/icons"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
