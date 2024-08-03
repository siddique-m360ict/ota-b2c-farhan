"use client"
import {
  CreatePNR,
  Passenger,
  paymentAfterBooking,
  submitPnr,
} from "@/app/(flightRevalidate)/actions"
import FlightCard from "@/components/flight-search/elements/FlightCard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import FormField from "./FormField"
import { toast } from "@/components/ui/use-toast"
import { useAppSelector } from "@/lib/redux/hooks"
import LoginModal from "./LoginModal"
import { redirect, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Travelers } from "@/components/Dashboard/traveler/addTravelerForm"
import { serverUrl } from "@/lib/utils"

type Props = {
  passengers: Passenger[]
  ticketID: string
  token: string
  travelers: Travelers[]
}
type passengerCounts = {
  Adult: number
  Child: number
  Infant: number
  Kids: number
}

export interface SelectedTraveler {
  [key: string]: Travelers
}

const TravelerForm = ({
  passengers,
  ticketID,
  token,
  travelers: travelerList,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const user = useAppSelector((state) => state.user)
  const [isPayNow, setIsPayNow] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const router = useRouter()
  // Formatting Passenger Count
  const passengerCounts: passengerCounts = {
    Adult: 0,
    Child: 0,
    Infant: 0,
    Kids: 0,
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
      } else if (passengerType === "C05") {
        passengerCounts.Kids = passenger.number
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
    if (!token) {
      setIsLoginModalOpen(true)
      return toast({
        title: "Please login again",
        description: "User not found, Please login again",
        variant: "destructive",
        className: "bg-[#ff0000]",
        duration: 2000,
      })
    }
    if (!user?.data.email) {
      setIsLoginModalOpen(true)
      return toast({
        title: "Please login again",
        description: "User not found, Please login again",
        variant: "destructive",
        className: "bg-[#ff0000]",
        duration: 2000,
      })
    }

    const body: submitPnr = {
      passengers: data.passengers.map(
        (item: { [s: string]: unknown } | ArrayLike<unknown>) =>
          Object.fromEntries(
            Object.entries(item).filter(([key, value]) => value)
          )
      ) as any,
      flight_id: ticketID,
    }

    setLoading(true)

    try {
      const res = await CreatePNR(body, token)
      console.log(body, res)

      if (!res.success) {
        setLoading(false)
        return toast({
          title: res.message,
          description: "Your booking request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
          duration: 1000,
        })
      } else {
        if (isPayNow) {
          const response = await paymentAfterBooking(res?.booking_id, token)
          router.push(response?.redirect_url)
        } else {
          toast({
            title: res.message,
            duration: 1000,
          })
          router.push("/dashboard/booking")
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const [selectedTraveler, setSelectedTraveler] = useState<
    SelectedTraveler | {}
  >({})

  const handleTravelerSelect = (travelerId: number, passengerType: string) => {
    const traveler = {
      [passengerType]: travelerList.filter(
        (traveler) => traveler.id == travelerId
      )[0],
    }
    setSelectedTraveler(traveler)
  }

  useEffect(() => {
    if (token) {
      setIsLoginModalOpen(false)
    } else {
      setIsLoginModalOpen(true)
    }
  }, [token])

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
              token={token}
            />
          ))}

        {Array(passengerCounts.Child)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index + passengerCounts.Adult}
              index={index + passengerCounts.Adult}
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
              token={token}
            />
          ))}

        {Array(passengerCounts.Infant)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index + passengerCounts.Adult + passengerCounts.Child}
              index={index + passengerCounts.Adult + passengerCounts.Child}
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
              token={token}
            />
          ))}
        {Array(passengerCounts.Kids)
          .fill("")
          .map((item, index) => (
            <FormField
              key={
                index +
                passengerCounts.Adult +
                passengerCounts.Child +
                passengerCounts.Infant
              }
              index={
                index +
                passengerCounts.Adult +
                passengerCounts.Child +
                passengerCounts.Infant
              }
              name="Kids"
              passengerType={`passengers[${
                index +
                passengerCounts.Adult +
                passengerCounts.Child +
                passengerCounts.Infant
              }]`}
              register={control.register}
              errors={errors}
              control={control}
              onTravelerSelect={handleTravelerSelect}
              selectedTraveler={selectedTraveler}
              setValue={setValue}
              travelerList={travelerList}
              clearErrors={clearErrors}
              token={token}
            />
          ))}

        <div className="flex items-center justify-between gap-6">
          <Button
            type="submit"
            className="mt-5 w-full cursor-pointer rounded border border-primary bg-transparent p-2 text-center text-sm font-semibold text-destructive hover:bg-primary hover:text-white "
            onClick={() => setIsPayNow(false)}
          >
            {!isPayNow && loading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Book Now (Pay Later)
          </Button>
          <Button
            type="submit"
            className="mt-5 w-full cursor-pointer rounded border bg-primary p-2 text-center text-sm font-semibold text-white hover:border-primary hover:bg-transparent hover:text-black"
            onClick={() => setIsPayNow(true)}
          >
            {isPayNow && loading && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            Pay Now
          </Button>
        </div>
      </form>
      <LoginModal open={isLoginModalOpen} setOpen={setIsLoginModalOpen} />
    </div>
  )
}

export default TravelerForm
