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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
  const [saveInfo, setSaveInfo] = useState(false)
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
      setReference(travelerData?.reference as referenceType)
      setValue(`${passengerType}.mid_name`, travelerData.mid_name || "")
      setValue(`${passengerType}.sur_name`, travelerData.sur_name || "")

      setSelectedCountry({
        id: travelerData.country_id,
        name: travelerData.country,
      })
      setSelectedCity({ id: travelerData.city_id, name: travelerData.city })

      setValue(`${passengerType}.phone`, travelerData.phone || "")
      setValue(`${passengerType}.email`, travelerData.email || "")
      setValue(`${passengerType}.reference`, travelerData.reference || "")
      setValue(
        `${passengerType}.passport_number`,
        travelerData.passport_number || ""
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

      clearErrors(`${passengerType}.mid_name`)
      clearErrors(`${passengerType}.sur_name`)
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

  const is_city =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.city

  const is_country =
    errors.hasOwnProperty("passengers") && errors?.passengers[index]?.country

  useEffect(() => {
    if (selectedCity) {
      setValue(`${passengerType}.city_id`, selectedCity.id || "")
      setValue(`${passengerType}.country_id`, selectedCountry.id || "")
    }
    if (reference) {
      setValue(`${passengerType}.reference`, reference || "")
    }
  }, [selectedCity, reference])

  // first default open
  // defaultValue:  0Adult and  value: index.toString() + name
  const handleChangeSaveInfo = () => {
    let save: boolean

    if (saveInfo === true) {
      save = false
    } else {
      save = true
    }
    setSaveInfo(save)
  }

  useEffect(() => {
    setValue(`${passengerType}.save_information`, saveInfo)
  }, [saveInfo])

  return (
    <Accordion type="single" collapsible defaultValue={name}>
      <AccordionItem value={name} className="border-0 ">
        <Card className="shadow-2xlo  my-1 w-full rounded-none border-none">
          <CardHeader className="bg-background px-5 py-0 dark:bg-[#191f27]">
            <AccordionTrigger className="top-0  hover:no-underline" key={1}>
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
                        {`${traveler.reference} - ${traveler.mid_name} ${traveler.sur_name}`}
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
                    {...register(`${passengerType}.reference`, {
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

                {/* mid_name */}
                <div className="relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.mid_name`}>
                    First Name
                  </RequiredLabel>
                  <Input
                    type="text"
                    {...register(`${passengerType}.mid_name`, {
                      required: "This is a required field",
                    })}
                    placeholder="First name"
                    className="mt-1 p-2"
                  />

                  {is_mid_name && (
                    <p className="absolute -bottom-4 text-xs text-red-500">
                      Given Name Required
                    </p>
                  )}
                </div>

                {/* Last Name  */}
                <div className=" relative flex flex-col">
                  <RequiredLabel htmlFor={`passengers.${index}.sur_name`}>
                    Last Name
                  </RequiredLabel>
                  <Input
                    type="text"
                    {...register(`${passengerType}.sur_name`, {
                      required: "this is a required",
                    })}
                    className="mt-1 p-2"
                    placeholder="Last name"
                  />
                  {is_sur_name && (
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

                <Controller
                  name={`${passengerType}.gender`}
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <div className="relative flex flex-col">
                      <label htmlFor={`gender-${index}`}>Gender</label>
                      <div>
                        <select
                          className="w-full rounded border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="" disabled selected>
                            Select a Gender
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

                <div className="relative hidden flex-col text-sm">
                  <label htmlFor="Country">Country</label>
                  <input
                    readOnly
                    type="number"
                    {...register(`${passengerType}.country_id`)}
                    className="booking_input"
                  />
                </div>

                <div className="relative hidden flex-col text-sm">
                  <label htmlFor="city">save information</label>
                  <input
                    readOnly
                    type="number"
                    {...register(`${passengerType}.save_information`)}
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

                {/* passport_expiry_date  */}
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
              </div>

              <div
                className="mb-3 flex items-center justify-end space-x-2"
                key={index}
              >
                <Checkbox
                  id={passengerType}
                  checked={saveInfo}
                  onCheckedChange={(event) => handleChangeSaveInfo()}
                  className="text-primary"
                />
                <Label
                  htmlFor={passengerType}
                  className="flex cursor-pointer items-center gap-2 text-primary"
                >
                  Save this info
                </Label>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default FormField
