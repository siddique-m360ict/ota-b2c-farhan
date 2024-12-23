"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useAppSelector } from "@/lib/redux/hooks"
import { referenceType } from "@/components/flight-revalidate/elements/FormField"
import PassengerReference from "@/components/flight-revalidate/elements/PassengerReference"
import { Card, CardContent } from "@/components/ui/card"
import PassengerTypes from "./elements/PassengerType"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import City from "@/components/flight-revalidate/elements/PNRForm/City"
import { CreateTravels } from "@/app/(dashboard)/dashboard/(travelers)/actions"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { removeEmptyProperties } from "@/lib/utils"

type Props = {}

export interface Travelers {
  id?: number
  reference?: string
  mid_name?: string
  sur_name?: string
  phone?: string
  type?: string
  date_of_birth?: Date
  email?: string
  city_id?: number
  passport_number?: string
  passport_expiry_date?: Date
  frequent_flyer_number?: string
  frequent_flyer_airline?: string
  country?: string
  country_id?: number
  city?: string
}

export type paxType = "ADT" | "INF" | "C11" | ""

const CreateTravelerForm = (props: Props) => {
  let [reference, setReference] = useState<referenceType>("MR")
  const [paxType, setPaxType] = useState<paxType>("")
  const [gender, setGender] = useState("Male")
  const [dob, setDob] = useState<Date>()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Travelers>()

  const token = useAppSelector((state) => state.user?.token)
  // city country
  const [selectedCity, setSelectedCity] = useState<{
    id: number
    name: string
  } | null>({ id: 14, name: "Dhaka" })
  const [selectedCountry, setSelectedCountry] = useState<{
    id: number
    name: string
  } | null>({
    id: 18,
    name: "BANGLADESH",
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: Travelers) => {
    setLoading(true)
    try {
      const sanitizeData = removeEmptyProperties(data)
      const body = {
        ...sanitizeData,
        type: paxType,
        reference: reference,
        city_id: selectedCity.id,
      }
      const result = await CreateTravels(body, token)
      if (!result.success) {
        setLoading(false)
        return toast({
          title: result.message,
          description: "Your request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
          duration: 1000,
        })
      } else {
        toast({
          title: result.message,
          duration: 1000,
        })
        router.push("/dashboard/traveler")
      }
    } catch (error) {
      console.error("Error creating traveler:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded pb-6">
          <div className="mb-10">
            <h3 className="mt-3.5 text-sm">Reference Type: </h3>
            <div className="-mt-3">
              <PassengerReference
                setReference={setReference}
                reference={reference}
                type="All"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="-mt-3">
              <PassengerTypes
                reference={reference}
                setPaxType={setPaxType}
                paxType={paxType}
              />
            </div>
          </div>

          <div className="grid-cols-3 gap-4  md:grid">
            {/* first name */}
            <div>
              <Label htmlFor="mid_name">First Name</Label>
              <Input
                id="mid_name"
                placeholder="Enter your first name"
                type="text"
                {...register("mid_name", {
                  required: "First name is required",
                })}
              />
              {errors.mid_name && (
                <p className="absolute text-xs text-red-500">
                  {errors.mid_name.message}
                </p>
              )}
            </div>

            {/* last name */}
            <div>
              <Label htmlFor="sur_name">Last Name</Label>
              <Input
                id="sur_name"
                placeholder="Enter your last name"
                type="text"
                {...register("sur_name", {
                  required: "last name is required",
                })}
              />
              {errors.sur_name && (
                <p className="absolute text-xs text-red-500">
                  {errors.sur_name.message}
                </p>
              )}
            </div>
            {/* email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && (
                <p className="absolute text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* phone */}
            <div className=" relative flex flex-col">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="number"
                placeholder="Enter Phone Number"
                {...register(`phone`, {
                  required: "phone is required",
                })}
                className="mt-2 p-2"
              />
              {errors.phone && (
                <p className="absolute -bottom-4 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <City
              setSelectedCity={setSelectedCity}
              selectedCity={selectedCity}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />

            <Controller
              name="date_of_birth"
              control={control}
              rules={{
                validate: {
                  dateValidation: (value: any) => {
                    const birth_date = new Date(value)
                    const today = new Date()
                    const age = today.getFullYear() - birth_date.getFullYear()
                    if (paxType === "ADT") {
                      return true
                    } else if (paxType === "C11") {
                      if (age > 11) return "Age muse be less than 11 years for"
                    } else if (paxType === "INF") {
                      if (age > 1) {
                        return "Age must less that 1 years."
                      }
                    }
                    return true
                  },
                },
              }}
              render={({ field }) => (
                <div className="relative mb-1.5 flex flex-col md:mb-0">
                  <label
                    htmlFor="date_of_birth"
                    className="block pb-1.5 text-sm"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register(`date_of_birth`, {
                      required: "date of birth required",
                    })}
                    className=" rounded-md border p-2 text-sm dark:bg-transparent"
                  />
                  {errors.date_of_birth && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      {errors.date_of_birth.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="mb-1.5 md:mb-0">
              <Label htmlFor="passport_number">Passport Number</Label>
              <Input
                id="passport_number"
                {...register("passport_number")}
                placeholder="Passport No"
              />
            </div>

            <div className="relative mb-1.5 flex flex-col md:mb-0">
              <label htmlFor="date_of_birth" className="block pb-1.5 text-sm">
                Passport Expire Date
              </label>
              <input
                type="date"
                {...register(`passport_expiry_date`)}
                className=" rounded-md border p-2 text-sm dark:bg-transparent"
              />
            </div>

            <div className="mb-1.5 md:mb-0">
              <Label htmlFor="frequent_flyer_number">
                Frequent Flyer Number
              </Label>
              <Input
                id="frequent_flyer_number"
                {...register("frequent_flyer_number")}
                placeholder="Frequent Flyer Number"
              />
            </div>

            <div>
              <Label htmlFor="frequent_flyer_airline">
                Frequent Flyer Airline
              </Label>
              <Input
                id="frequent_flyer_airline"
                placeholder="Frequent Flyer Airline"
                type="text"
                {...register("frequent_flyer_airline")}
              />
            </div>

            <Button
              type="submit"
              className="col-span-3 mt-5 w-full cursor-pointer rounded border bg-primary p-2 text-center text-xs font-bold text-white transition-all duration-200 hover:bg-secondary"
            >
              {loading && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateTravelerForm
