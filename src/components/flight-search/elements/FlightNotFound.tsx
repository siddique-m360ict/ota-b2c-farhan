"use client"
import { Card, CardContent } from "@/components/ui/card"
import React from "react"

type Props = {
  message: string
}
const FlightNotFound = ({ message }: Props) => {
  return (
    <div>
      <Card className="h-screen">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <h2 className="font-heading text-[22px] font-bold">{message}</h2>
            <p>Please try changing your search details.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlightNotFound
