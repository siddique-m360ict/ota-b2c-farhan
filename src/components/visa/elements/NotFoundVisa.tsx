"use client"
import { Card, CardContent } from "@/components/ui/card"
import React from "react"

const NotFoundVisa = () => {
  return (
    <div className="">
      <Card className="pt-4 text-center">
        <CardContent>
          <h1>Visa Not Found </h1>
          <p>Please try changing your search details.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFoundVisa
