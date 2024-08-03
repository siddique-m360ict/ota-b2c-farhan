import React, { useEffect, useState } from "react"
import { Passenger } from "../VisaSearchBox"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import FormField from "./FormField"
import { toast } from "@/components/ui/use-toast"
import { useAppSelector } from "@/lib/redux/hooks"
import LoginModal from "@/components/flight-revalidate/elements/LoginModal"
import { Icons } from "@/components/icons"
import { visaApplicationPost } from "@/app/(visaSearch)/actions"
import { useRouter } from "next/navigation"

type Props = {
  passengers: Passenger
  token: string
  visa_id: string
}
type passengerCounts = {
  Adult: number
  Child: number
  Infant: number
  Kids: number
}
const VisaForm = ({ passengers, token, visa_id }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<any>()
  const [loading, setLoading] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

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
    setLoading(true)
    const searchVisa = JSON.parse(localStorage.getItem("visaSearch"))
    try {
      const res = await visaApplicationPost(
        data,
        token,
        visa_id,
        searchVisa.date.from,
        searchVisa.date.to
      )
      console.log(res)

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
        toast({
          title: res.message,
          duration: 1000,
        })
        router.push("/dashboard/visaApplication")
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
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
        {Array(passengers.adult)
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
              setValue={setValue}
              clearErrors={clearErrors}
              token={token}
            />
          ))}
        {Array(passengers.children)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index}
              index={index + passengers.adult}
              name="Child"
              passengerType={`passengers[${index + passengers.adult}]`}
              register={control.register}
              errors={errors}
              control={control}
              setValue={setValue}
              clearErrors={clearErrors}
              token={token}
            />
          ))}
        {Array(passengers.infant)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index}
              index={index + passengers.adult + passengers.children}
              name="Infant"
              passengerType={`passengers[${
                index + passengers.adult + passengers.children
              }]`}
              register={control.register}
              errors={errors}
              control={control}
              setValue={setValue}
              clearErrors={clearErrors}
              token={token}
            />
          ))}
        {Array(passengers.kids)
          .fill("")
          .map((item, index) => (
            <FormField
              key={index}
              index={
                index +
                passengers.adult +
                passengers.children +
                passengers.infant
              }
              name="Kids"
              passengerType={`passengers[${
                index +
                passengers.adult +
                passengers.children +
                passengers.infant
              }]`}
              register={control.register}
              errors={errors}
              control={control}
              setValue={setValue}
              clearErrors={clearErrors}
              token={token}
            />
          ))}

        <Button
          type="submit"
          className="mt-5 w-full cursor-pointer rounded border bg-primary p-2 text-center text-sm font-semibold text-white"
        >
          {loading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Submit
        </Button>
      </form>
      <LoginModal open={isLoginModalOpen} setOpen={setIsLoginModalOpen} />
    </div>
  )
}

export default VisaForm
