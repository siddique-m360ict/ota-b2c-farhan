"use client"
import { useEffect, useState } from "react"
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import PassengerReference from "./PassengerReference"
import { SelectedTraveler } from "./TravelerForm"
import { format } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader } from "@/components/ui/card"
import City from "./PNRForm/City"
import { Travelers } from "@/components/Dashboard/traveler/addTravelerForm"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

type Props = {
  index: number
  name: "Adult" | "Child" | "Infant" | "Kids"
  passengerType: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  control: Control<any, any>
  onTravelerSelect: (index: number, passengerType: string) => void
  selectedTraveler?: SelectedTraveler | {}
  setValue: any
  travelerList: any
  clearErrors: any
  token: string
}
export type referenceType = "MR" | "MS" | "MRS" | "MASTER" | "MISS"

const RequiredLabel = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor}>
    {children} <span className="text-red-500">*</span>
  </label>
)

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
  token,
}: Props) => {
  const [reference, setReference] = useState<referenceType>("MR")
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

  const { theme } = useTheme()
  const [travelerListFilter, setTravelerListFilter] = useState<Travelers[]>([])
  // FILTER TRAVELER DATA
  useEffect(() => {
    if (name === "Adult") {
      setTravelerListFilter(
        travelerList?.filter((traveler) => traveler.type === "ADT")
      )
      // console.log(travelerList?.filter((traveler) => traveler.type === "ADT"))
    } else if (name === "Child") {
      setTravelerListFilter(
        travelerList?.filter((traveler) => traveler.type === "C11")
      )
    } else if (name === "Infant") {
      setTravelerListFilter(
        travelerList?.filter((traveler) => traveler.type === "INF")
      )
    }
  }, [travelerList])

  const handleTravelerSelect = (index: number) => {
    onTravelerSelect(index, passengerType)
  }

  useEffect(() => {
    if (passengerType === Object.keys(selectedTraveler)[0]) {
      const travelerData = Object.entries(selectedTraveler)[0][1]

      setReference(travelerData?.title as referenceType)
      setValue(
        `${passengerType}.first_name`,
        travelerData.first_name || "data nai"
      )
      setValue(
        `${passengerType}.last_name`,
        travelerData.last_name || "data nai"
      )

      setSelectedCountry({
        id: travelerData.country_id,
        name: travelerData.country,
      })
      setSelectedCity({ id: travelerData.city_id, name: travelerData.city })

      setValue(`${passengerType}.phone`, travelerData.phone || "data nai")
      setValue(`${passengerType}.email`, travelerData.email || "data nai")
      setValue(`${passengerType}.title`, travelerData.title || "data nai")
      setValue(
        `${passengerType}.passport_number`,
        travelerData.passport_number || "data nai"
      )
      setValue(
        `${passengerType}.passport_expiry_date`,
        travelerData.passport_expiry_date
          ? format(new Date(travelerData.passport_expiry_date), "yyyy-MM-dd")
          : ""
      )

      setValue(
        `${passengerType}.date_of_birth`,
        travelerData.date_of_birth
          ? format(new Date(travelerData.date_of_birth), "yyyy-MM-dd")
          : ""
      )
      setValue(
        `${passengerType}.frequent_flyer_number`,
        travelerData.frequent_flyer_number || "data nai"
      )
      setValue(
        `${passengerType}.frequent_flyer_airline`,
        travelerData.frequent_flyer_airline || "data nai"
      )

      clearErrors(`${passengerType}.first_name`)
      clearErrors(`${passengerType}.last_name`)
      clearErrors(`${passengerType}.phone`)
      clearErrors(`${passengerType}.email`)
      clearErrors(`${passengerType}.date_of_birth`)
    }
  }, [selectedTraveler, setValue, clearErrors])

  let errors: any = err
  const is_first_name =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.first_name

  const is_last_name =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.last_name

  const is_passport_number =
    errors.hasOwnProperty("passengers") &&
    errors?.passengers[index]?.passport_number
  const is_passport_expiry_date =
    errors.hasOwnProperty("passengers") &&
    errors?.passengers[index]?.passport_expiry_date

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

  useEffect(() => {
    if (selectedCity) {
      setValue(`${passengerType}.city_id`, selectedCity.id || "data nai")
    }
    if (reference) {
      setValue(`${passengerType}.title`, reference || "data nai")
    }
  }, [selectedCity, reference])

  // first default open
  // defaultValue:  0Adult and  value: index.toString() + name
  return (
    <Accordion type="single" collapsible defaultValue={name}>
      <AccordionItem value={name} className="border-0">
        <Card className="shadow-2xlo my-1 w-full rounded-none border-none">
          <CardHeader className="px-5 py-0 dark:bg-[#191f27]">
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
                theme === "light"
                  ? "url('/images/bg/plane.jpg') right 24px top 4px no-repeat, radial-gradient(30% 26% at 80% 0px, rgb(255 255 255 / 72%), transparent), radial-gradient(30% 26% at left bottom, rgb(255 255 255 / 72%), transparent), rgb(241 250 255)"
                  : "url(/images/bg/plane.jpg) right 24px top 4px no-repeat, radial-gradient(30% 26% at 80% 0px, #193255, transparent), radial-gradient(30% 26% at left bottom, #062f69, transparent), #011127",
            }}
          >
            <div>
              <PassengerReference
                setReference={setReference}
                type={name}
                reference={reference}
                index={index}
              />

              {/* --------------------------------------- */}
              {/* selected travelers */}
              {token && (
                <div className="relative mt-6 flex flex-col">
                  <label htmlFor="travelerList">Select Traveler</label>
                  <select
                    onChange={(e) =>
                      handleTravelerSelect(parseInt(e.target.value, 10))
                    }
                    className="mt-2 p-3 dark:border dark:bg-transparent"
                    name={`${passengerType}.traveler_select`}
                  >
                    <option value="" disabled selected className="bg-[#222]">
                      Select a Traveler
                    </option>
                    {travelerListFilter?.map((traveler, idx: number) => (
                      <option
                        key={traveler.id}
                        value={traveler.id}
                        data-passenger-type={passengerType}
                        className="dark:bg-black"
                      >
                        {`${traveler.title} - ${traveler.first_name} ${traveler.last_name}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 items-center justify-center gap-5 text-sm md:grid-cols-3  ">
                {/* reference */}
                <div className=" relative hidden flex-col text-sm">
                  <label htmlFor="reference">reference</label>
                  <input
                    readOnly
                    type="text"
                    {...register(`${passengerType}.title`, {
                      required: "This is a required field",
                    })}
                    className="booking_input"
                    value={reference}
                  />
                </div>

                {/* type  */}
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
                      (name === "Kids" && "C05") ||
                      ""
                    }
                  />
                </div>

                {/* first_name */}
                <div className="relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.first_name`}>
                    First Name
                  </RequiredLabel>
                  <Input
                    type="text"
                    {...register(`${passengerType}.first_name`, {
                      required: "This is a required field",
                    })}
                    placeholder="First name"
                    className="mt-1 p-2"
                  />

                  {is_first_name && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Given Name Required
                    </p>
                  )}
                </div>

                {/* Last Name  */}
                <div className=" relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.last_name`}>
                    Last Name
                  </RequiredLabel>
                  <Input
                    type="text"
                    {...register(`${passengerType}.last_name`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                    placeholder="Last name"
                  />
                  {is_last_name && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Last Name Required
                    </p>
                  )}
                </div>

                {/* date of birth */}
                <div className="relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.date_of_birth`}>
                    Date of Birth
                  </RequiredLabel>
                  <Input
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
                    className="mt-1 block p-2"
                  />
                  {is_date_of_birth && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      {is_date_of_birth?.message}
                    </p>
                  )}
                </div>

                {/* email  */}
                <div className=" relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.email`}>
                    Email
                  </RequiredLabel>

                  <Input
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    {...register(`${passengerType}.email`, {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email",
                      },
                    })}
                  />
                  {is_email && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Email Required
                    </p>
                  )}
                </div>

                {/* phone */}
                <div className="relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.phone`}>
                    Phone Number
                  </RequiredLabel>
                  <Input
                    type="number"
                    {...register(`${passengerType}.phone`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                    placeholder="Phone Number"
                  />
                  {is_phone && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Phone No. Required
                    </p>
                  )}
                </div>
                {/* ------------------------------- for city */}
                <City
                  setSelectedCity={setSelectedCity}
                  selectedCity={selectedCity}
                  setSelectedCountry={setSelectedCountry}
                  selectedCountry={selectedCountry}
                />
                {!selectedCity && (
                  <p className="absolute -bottom-4 text-xs text-red-500">
                    City is Required
                  </p>
                )}

                {/* city */}
                <div className="relative hidden flex-col text-sm">
                  <label htmlFor="city">City</label>
                  <input
                    readOnly
                    type="number"
                    {...register(`${passengerType}.city_id`)}
                    className="booking_input"
                  />
                </div>
                {/* ------------------------------- for city */}

                {/* passport number  */}
                <div className=" relative flex flex-col">
                  <RequiredLabel
                    htmlFor={`passengers.${index}.passport_number`}
                  >
                    Passport Number
                  </RequiredLabel>
                  <Input
                    type="text"
                    {...register(`${passengerType}.passport_number`, {
                      required: "this is a required",
                    })}
                    placeholder="Passport Number "
                    className="mt-1 p-2"
                  />
                  {is_passport_number && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Passport number is Required
                    </p>
                  )}
                </div>

                {/*  passport_expiry_date  */}
                <div className=" relative flex flex-col">
                  <RequiredLabel
                    htmlFor={`passengers.${index}.passport_expiry_date`}
                  >
                    Passport Expiry Date
                  </RequiredLabel>

                  <Input
                    type="date"
                    {...register(`${passengerType}.passport_expiry_date`, {
                      required: "this is a required",
                    })}
                    className="mt-1 block p-2"
                  />
                  {is_passport_expiry_date && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Passport Expiry Date Required
                    </p>
                  )}
                </div>

                {/* frequent_flyer_airline */}
                <div className=" relative flex flex-col">
                  <label htmlFor="phone">Frequent Flyer Airline</label>
                  <Input
                    type="text"
                    {...register(`${passengerType}.frequent_flyer_airline`)}
                    className="mt-1 p-2"
                    placeholder="Flyer Airline"
                  />
                </div>

                {/* frequent_flyer_number */}
                <div className=" relative flex flex-col">
                  <label htmlFor="phone">Frequent Flyer Number</label>
                  <Input
                    type="text"
                    {...register(`${passengerType}.frequent_flyer_number`)}
                    className="mt-1 p-2"
                    placeholder="Flyer Number"
                  />
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
