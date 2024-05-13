"use client"

import { useEffect, useState } from "react"
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import PassengerReference from "./PassengerReference"
import { SelectedTraveler, Traveler } from "./TravelerForm"
import { format } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Props = {
  index: number
  name: "Adult" | "Child" | "Infant"
  passengerType: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  control: Control<any, any>
  onTravelerSelect: (index: number, passengerType: string) => void
  selectedTraveler?: SelectedTraveler | {}
  setValue: any
  travelerList: any
  clearErrors: any
}
export type referenceType = "MR" | "MS" | "MRS" | "MASTER" | "MISS"

const FormField = ({
  index,
  name,
  passengerType,
  errors: err,
  register,
  control,
  onTravelerSelect,
  selectedTraveler,
  setValue,
  travelerList,
  clearErrors,
}: Props) => {
  const [reference, setReference] = useState<referenceType>("MR")
  const [travelerListFilter, setTravelerListFilter] = useState<Traveler[]>([])

  // FILTER TRAVELER DATA
  useEffect(() => {
    if (name === "Adult") {
      setTravelerListFilter(
        travelerList?.filter((traveler: any) => traveler.type === "ADT")
      )
      console.log(
        travelerList?.filter((traveler: any) => traveler.type === "ADT")
      )
    } else if (name === "Child") {
      setTravelerListFilter(
        travelerList?.filter((traveler: any) => traveler.type === "C11")
      )
    } else if (name === "Infant") {
      setTravelerListFilter(
        travelerList?.filter((traveler: any) => traveler.type === "INF")
      )
    }
  }, [travelerList])

  const handleTravelerSelect = (index: number) => {
    onTravelerSelect(index, passengerType)
  }

  useEffect(() => {
    if (passengerType === Object.keys(selectedTraveler)[0]) {
      const travelerData = Object.entries(selectedTraveler)[0][1]

      setReference(travelerData.reference as referenceType)
      setValue(`${passengerType}.mid_name`, travelerData.mid_name || "data nai")
      setValue(`${passengerType}.sur_name`, travelerData.sur_name || "data nai")

      setValue(`${passengerType}.gender`, travelerData.gender || "data nai")
      setValue(`${passengerType}.address`, travelerData.address || "data nai")
      setValue(
        `${passengerType}.post_code`,
        travelerData.post_code || "data nai"
      )
      setValue(`${passengerType}.city`, travelerData.city || "data nai")
      setValue(`${passengerType}.country`, travelerData.country || "data nai")
      setValue(`${passengerType}.phone`, travelerData.phone || "data nai")
      setValue(`${passengerType}.email`, travelerData.email || "data nai")
      setValue(
        `${passengerType}.reference`,
        travelerData.reference || "data nai"
      )
      setValue(
        `${passengerType}.date_of_birth`,
        travelerData.date_of_birth
          ? format(new Date(travelerData.date_of_birth), "yyyy-MM-dd")
          : ""
      )

      clearErrors(`${passengerType}.mid_name`)
      clearErrors(`${passengerType}.sur_name`)
      clearErrors(`${passengerType}.gender`)
      clearErrors(`${passengerType}.address`)
      clearErrors(`${passengerType}.post_code`)
      clearErrors(`${passengerType}.city`)
      clearErrors(`${passengerType}.country`)
      clearErrors(`${passengerType}.phone`)
      clearErrors(`${passengerType}.email`)
      clearErrors(`${passengerType}.date_of_birth`)
    }
  }, [selectedTraveler, setValue, clearErrors])

  let errors: any = err
  const is_mid_name =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.mid_name

  const is_sur_name =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.sur_name

  const is_address =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.address

  const is_phone =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.phone

  const is_gender =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.gender

  const is_email =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.email

  const is_date_of_birth =
    errors.hasOwnProperty("passengers") &&
    errors?.passengers[index]?.date_of_birth

  const is_post_code =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.post_code

  const is_city =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.city

  const is_country =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.country

  return (
    <Accordion type="single" collapsible defaultValue={"0Adult"}>
      <AccordionItem value={index.toString() + name} className="border-0">
        <Card className="shadow-2xlo my-1 w-full rounded-none border-none">
          <CardHeader className="px-5 py-0">
            <AccordionTrigger className="top-0 hover:no-underline" key={1}>
              Passenger {name} {index + 1}
            </AccordionTrigger>
          </CardHeader>
        </Card>

        <AccordionContent>
          <div
            className="p-4 pb-8"
            style={{
              background:
                "url(data:image/png;base64,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) right 24px top 4px no-repeat, radial-gradient(30% 26% at 80% 0px, rgb(255 255 255 / 72%), transparent), radial-gradient(30% 26% at left bottom, rgb(255 255 255 / 72%), transparent), rgb(241 250 255)",
            }}
          >
            <div>
              <PassengerReference
                setReference={setReference}
                type={name}
                reference={reference}
              />

              {/* --------------------------------------- */}

              <div className="relative mt-6 flex flex-col">
                <label htmlFor="travelerList">Select Traveler</label>
                <select
                  onChange={(e) =>
                    handleTravelerSelect(parseInt(e.target.value, 10))
                  }
                  className="mt-2 p-3"
                  name={`${passengerType}.traveler_select`}
                >
                  <option value="" disabled selected>
                    Select a Traveler
                  </option>
                  {travelerListFilter?.map((traveler, idx: number) => (
                    <option
                      key={traveler.passenger_id}
                      value={traveler.passenger_id}
                      data-passenger-type={passengerType}
                    >
                      {`${traveler.reference} - ${traveler.mid_name} ${traveler.sur_name}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 grid grid-cols-2 items-center justify-center gap-5 text-sm md:grid-cols-3">
                <div className=" relative hidden flex-col text-sm">
                  <label htmlFor="reference">reference</label>
                  <input
                    readOnly
                    type="text"
                    {...register(`${passengerType}.reference`, {
                      required: "This is a required field",
                    })}
                    className="booking_input"
                    value={reference}
                  />
                </div>

                <div className="relative hidden flex-col">
                  <label htmlFor="type">Type</label>
                  <input
                    readOnly
                    type="text"
                    {...register(`${passengerType}.type`)}
                    className="booking_input"
                    value={
                      (name === "Adult" && "ADT") ||
                      (name === "Child" && "C11") ||
                      (name === "Infant" && "INF") ||
                      ""
                    }
                  />
                </div>

                <div className="relative flex flex-col">
                  <label htmlFor="mid_name">Given Name</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.mid_name`, {
                      required: "This is a required field",
                    })}
                    className="mt-1 p-2"
                  />

                  {is_mid_name && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Given Name Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="sur_name">Sur Name</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.sur_name`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_sur_name && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Sur Name Required
                    </p>
                  )}
                </div>

                <Controller
                  name={`passengers[${index}].gender`}
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <div className="relative flex flex-col">
                      <label htmlFor={`gender-${index}`}>Gender</label>
                      <div>
                        <select className="w-full p-3" {...field}>
                          <option value="" disabled selected>
                            Select a gender
                          </option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                      {is_gender && (
                        <p className="absolute -bottom-4 text-xs text-red-500">
                          Gender Required
                        </p>
                      )}
                    </div>
                  )}
                />

                <div className=" relative flex flex-col">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.address`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_address && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Address Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="post_code">Post code</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.post_code`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_post_code && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Post code Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.city`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_city && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      City Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.country`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_country && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Country Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.phone`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_phone && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Phone No. Required
                    </p>
                  )}
                </div>

                <div className=" relative flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    {...register(`${passengerType}.email`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                  />
                  {is_email && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Email Required
                    </p>
                  )}
                </div>

                <div className="relative flex flex-col">
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input
                    type="date"
                    {...register(`${passengerType}.date_of_birth`, {
                      required: "DOB required",
                      validate: {
                        dateValidation: (value) => {
                          const birthdate = new Date(value)
                          const today = new Date()
                          const age =
                            today.getFullYear() - birthdate.getFullYear()

                          if (name === "Adult") {
                            return true
                          } else if (name === "Child") {
                            if (age > 11)
                              return "Age muse be older than 11 years"
                          } else if (name === "Infant") {
                            if (age > 1) {
                              return "Age must older that 1 years."
                            }
                          }
                          return true
                        },
                      },
                    })}
                    className="mt-1 p-2"
                  />
                  {is_date_of_birth && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      {is_date_of_birth?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FormField
