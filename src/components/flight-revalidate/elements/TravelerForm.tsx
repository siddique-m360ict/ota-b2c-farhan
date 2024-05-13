"use client"
import { Passenger } from "@/app/(flightRevalidate)/actions"
import FlightCard from "@/components/flight-search/elements/FlightCard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import FormField from "./FormField"
import { toast } from "@/components/ui/use-toast"

type Props = {
  passengers: Passenger[]
}
type passengerCounts = {
  Adult: number
  Child: number
  Infant: number
}
export type Traveler = {
  address: string
  city: string
  country: string
  date_of_birth: string
  email: string
  gender: string
  mid_name: string
  phone: string
  post_code: string
  reference: string
  sur_name: string
  type: string
  passenger_id: string
}

const travelerList: Traveler[] = [
  {
    passenger_id: "1",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    date_of_birth: "1990-01-01",
    email: "amanullah.mirob2@example.com",
    gender: "Male",
    mid_name: "Amanullah",
    phone: "01725502623",
    post_code: "10001",
    reference: "MR",
    sur_name: "Aman",
    type: "ADT",
  },
  {
    passenger_id: "2",
    address: "456 Elm St",
    city: "Los Angeles",
    country: "USA",
    date_of_birth: "1995-05-05",
    email: "mahanor@example.com",
    gender: "Female",
    mid_name: "mahanor",
    phone: "9876543210",
    post_code: "90001",
    reference: "MS",
    sur_name: "Akter",
    type: "ADT",
  },
  {
    passenger_id: "4",
    address: "456 Elm St",
    city: "Los Angeles",
    country: "USA",
    date_of_birth: "2019-05-05",
    email: "binteAman@example.com",
    gender: "Female",
    mid_name: "binte ",
    phone: "9876543210",
    post_code: "90001",
    reference: "MISS",
    sur_name: "Aman",
    type: "C11",
  },
  {
    passenger_id: "5",
    address: "456 Elm St",
    city: "Los Angeles",
    country: "USA",
    date_of_birth: "2020-05-05",
    email: "ibneAman@example.com",
    gender: "Female",
    mid_name: "ibne",
    phone: "9876543210",
    post_code: "90001",
    reference: "MASTER",
    sur_name: "Aman",
    type: "C11",
  },
]

export interface SelectedTraveler {
  [key: string]: {
    address: string
    city: string
    country: string
    date_of_birth: string
    email: string
    gender: string
    mid_name: string
    passenger_id: string
    phone: string
    post_code: string
    reference: string
    sur_name: string
    type: string
  }
}

const TravelerForm = ({ passengers }: Props) => {
  // Formatting Passenger Count
  const passengerCounts: passengerCounts = {
    Adult: 0,
    Child: 0,
    Infant: 0,
  }
  passengers?.length &&
    passengers.forEach((passenger: any) => {
      const passengerType = passenger?.type
      if (passengerType === "ADT") {
        passengerCounts.Adult = passenger?.number
      } else if (passengerType === "C11") {
        passengerCounts.Child = passenger.number
      } else if (passengerType === "INF") {
        passengerCounts.Infant = passenger.number
      }
    })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<any>()

  const onSubmit = async (data: any) => {
    console.log(data)
    toast({
      title: "PNR create coming soon",
      duration: 2000,
    })
  }

  const [selectedTraveler, setSelectedTraveler] = useState<
    SelectedTraveler | {}
  >({})

  const handleTravelerSelect = (travelerId: number, passengerType: string) => {
    const traveler = {
      [passengerType]: travelerList.filter(
        (traveler: any) => traveler.passenger_id == travelerId
      )[0],
    }
    setSelectedTraveler(traveler)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
        {Array(passengerCounts.Adult)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index}
              index={index}
              name="Adult"
              passengerType={`passengers[${index}]`}
              register={control.register}
              errors={errors}
              control={control}
              onTravelerSelect={handleTravelerSelect}
              selectedTraveler={selectedTraveler}
              setValue={setValue}
              travelerList={travelerList}
              clearErrors={clearErrors}
            />
          ))}

        {Array(passengerCounts.Child)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index + passengerCounts.Adult}
              index={index}
              name="Child"
              passengerType={`passengers[${index + passengerCounts.Adult}]`}
              register={control.register}
              errors={errors}
              control={control}
              onTravelerSelect={handleTravelerSelect}
              selectedTraveler={selectedTraveler}
              setValue={setValue}
              travelerList={travelerList}
              clearErrors={clearErrors}
            />
          ))}

        {Array(passengerCounts.Infant)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index + passengerCounts.Adult + passengerCounts.Child}
              index={index}
              name="Infant"
              passengerType={`passengers[${
                index + passengerCounts.Adult + passengerCounts.Child
              }]`}
              register={control.register}
              errors={errors}
              control={control}
              onTravelerSelect={handleTravelerSelect}
              selectedTraveler={selectedTraveler}
              setValue={setValue}
              travelerList={travelerList}
              clearErrors={clearErrors}
            />
          ))}
        <button
          type="submit"
          className="mt-5 w-full cursor-pointer rounded border bg-primary p-2 text-center text-sm font-semibold text-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default TravelerForm
