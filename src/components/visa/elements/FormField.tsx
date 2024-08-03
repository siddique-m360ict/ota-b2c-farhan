"use client"
import { useEffect, useState } from "react"
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form"
import { format } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader } from "@/components/ui/card"
import { Travelers } from "@/components/Dashboard/traveler/addTravelerForm"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import City from "@/components/flight-revalidate/elements/PNRForm/City"
import PassengerReference from "@/components/flight-revalidate/elements/PassengerReference"
import { Icons } from "@/components/icons"
import PassportType from "./PassportType"

type Props = {
  index: number
  name: "Adult" | "Child" | "Infant" | "Kids"
  passengerType: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  control: Control<any, any>
  setValue: any
  clearErrors: any
  token: string
}
export type referenceType = "MR" | "MS" | "MRS" | "MASTER" | "MISS"
export type passportType = "Ordinary" | "Diplomatic" | "Official"

export const RequiredLabel = ({ htmlFor, children }) => (
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
  setValue,
  clearErrors,
  token,
}: Props) => {
  const [reference, setReference] = useState<referenceType>("MR")
  const [passportType, setPassportType] = useState<passportType>("Ordinary")
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

  const is_contact_number =
    errors.hasOwnProperty("passengers") &&
    errors?.passengers[index]?.contact_number

  const is_gender =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.gender

  const is_contact_email =
    errors.hasOwnProperty("passengers") &&
    errors?.passengers[index]?.contact_email

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
      setValue(`${passengerType}.city`, selectedCity.name || "data nai")
    }
    if (reference) {
      setValue(`${passengerType}.title`, reference || "data nai")
    }
    if (passportType) {
      setValue(`${passengerType}.passport_type`, passportType || "data nai")
    }
    if (selectedCountry) {
      setValue(`${passengerType}.country_id`, selectedCountry.id || "data nai")
    }
  }, [selectedCity, selectedCountry, reference, passportType])

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

              <div className="mt-5 grid grid-cols-2 items-center justify-center gap-5 text-sm md:grid-cols-3">
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
                      First Name is Required
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
                      Last Name is Required
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
                      required: "Date of Birth is required",
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
                    {...register(`${passengerType}.city`)}
                    className="booking_input"
                  />
                </div>

                {/* country */}
                <div className="relative hidden flex-col text-sm">
                  <label htmlFor="city">Country</label>
                  <input
                    readOnly
                    type="number"
                    {...register(`${passengerType}.country_id`)}
                    className="booking_input"
                    value={selectedCountry.id}
                  />
                </div>

                {/* country */}
                <div className="relative flex-col text-sm">
                  <label htmlFor="address">Address</label>
                  <Input
                    type="text"
                    {...register(`${passengerType}.address`)}
                    placeholder="Address"
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
                      Passport Expiry Date is Required
                    </p>
                  )}
                </div>

                <div className="relative flex flex-col">
                  <PassportType
                    setPassportType={setPassportType}
                    passportType={passportType}
                  />
                  <div className=" relative hidden flex-col text-sm">
                    <label htmlFor="passport_type">passport_type</label>
                    <input
                      readOnly
                      type="text"
                      {...register(`${passengerType}.passport_type`, {
                        required: "This is a required field",
                      })}
                      className="booking_input"
                      value={passportType}
                    />
                  </div>
                </div>
              </div>

              {/* only first form */}
              {index.toString() + name === "0Adult" && (
                <div className="mb-4 mt-12">
                  <div>
                    <h1 className="font-heading text-2xl">Contact Details</h1>
                    <p className="my-2 flex items-center gap-2">
                      <Icons.Info className="h-4 w-4 text-destructive" />{" "}
                      Receive booking confirmation & updates
                    </p>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-5 md:grid-cols-3">
                    {/* contact_email  */}
                    <div className=" relative flex flex-col">
                      <RequiredLabel
                        htmlFor={`passengers.${index}.contact_email`}
                      >
                        Contact Email
                      </RequiredLabel>

                      <Input
                        id="email"
                        placeholder="Email Address"
                        type="email"
                        {...register(`${passengerType}.contact_email`, {
                          required: " Contact Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email",
                          },
                        })}
                      />
                      {is_contact_email && (
                        <p className="absolute -bottom-4 text-xs text-red-500">
                          Contact email is Required
                        </p>
                      )}
                    </div>

                    {/* contact_number */}
                    <div className="relative flex flex-col">
                      <RequiredLabel
                        htmlFor={`passengers.${index}.contact_number`}
                      >
                        Contact Number
                      </RequiredLabel>
                      <Input
                        type="number"
                        {...register(`${passengerType}.contact_number`, {
                          required: "this is a required",
                        })}
                        className="mt-1 p-2"
                        placeholder="Contact Number"
                      />
                      {is_contact_number && (
                        <p className="absolute -bottom-4 text-xs text-red-500">
                          Contact Number is Required
                        </p>
                      )}
                    </div>

                    {/* whatsapp_number */}
                    <div className="relative flex flex-col">
                      <label htmlFor={`passengers.${index}.whatsapp_number`}>
                        Whatsapp number
                      </label>
                      <Input
                        type="number"
                        {...register(`${passengerType}.whatsapp_number`)}
                        className="mt-1 p-2"
                        placeholder="Whatsapp number"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FormField
