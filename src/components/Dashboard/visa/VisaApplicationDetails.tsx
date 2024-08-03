import {
  IVisaApplicationDetails,
  TrackingDatum,
  TravelerDatum,
} from "@/app/(visaSearch)/actions"
import { Icons } from "@/components/icons"
import { Card, CardContent } from "@/components/ui/card"
import { formatGlobalTime, formatNumber, hostedImage } from "@/lib/utils"
import { format } from "date-fns"
import Image from "next/image"
import React from "react"

type Props = {
  data: IVisaApplicationDetails
  token: string
}
const VisaApplicationDetails = ({ data, token }: Props) => {
  return (
    <div>
      {/*-------------- Header -------------- */}
      <Card>
        <CardContent className="grid items-center py-6 lg:grid-cols-[20%_1fr]">
          <div className="mx-auto">
            <Icons.User className="text-xs text-gray-600" size={100} />
          </div>
          <div className="grid grid-cols-[78%_1fr]">
            <div>
              <div>
                <h1 className="mb-1 text-xl font-bold">
                  {" "}
                  {data.max_validity} Day {data.type} Visa
                </h1>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <Icons.checkRound className="h-4 w-4" /> Visa issuance rights
                  reserved by the embassy.
                </p>
              </div>
              <div className="mt-4 grid  grid-cols-2">
                <div>
                  <p className="mb-1 text-sm">
                    Processing Type : {data.processing_fee}
                  </p>
                  <p className="mb-1 text-sm">
                    Processing Fee : {formatNumber(data.processing_fee)}
                  </p>
                  <p className="mb-1 text-sm">Visa Type : {data.type}</p>
                  <p className="mb-1 text-sm">
                    Visa Fee : {formatNumber(data.visa_fee)}
                  </p>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="mb-1 text-sm">
                    Max Validity : {data.max_validity} Days
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-4">
                <h1 className="text-destructive">Total Price</h1>
                <p className="text-sm">
                  BDT{" "}
                  {data
                    ? formatNumber(
                        (parseInt(data?.visa_fee) +
                          parseInt(data?.processing_fee)) *
                          data.traveler
                      )
                    : 0}
                </p>
                <p className="text-xs text-destructive">
                  {" "}
                  ({data && data.traveler}{" "}
                  {data.traveler > 1 ? "Travelers" : "Traveler"})
                </p>
              </div>
              <div>
                <h1 className="text-destructive">Price per person</h1>
                <p className="text-xs">
                  BDT{" "}
                  {data
                    ? formatNumber(
                        parseInt(data?.visa_fee) +
                          parseInt(data?.processing_fee)
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TRAVEL SEGMENTS */}
      <div className="bg-bgMuted  mt-4 py-4">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          TRAVEL SEGMENTS
        </h4>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white ">
              <tr>
                <th scope="col" className="px-2 py-4 text-xs md:px-6">
                  title
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  name
                </th>

                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  type
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  date_of_birth
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  passport_number
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  passport_expiry_date
                </th>

                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  address
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  passport_type
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.traveler_data?.map((traveler: TravelerDatum) => (
                <tr
                  key={traveler.id}
                  className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white "
                >
                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler.title}
                  </td>
                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler?.first_name + " " + traveler?.last_name}
                  </td>

                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler?.type}
                  </td>
                  <td className="py-2 text-xs md:ps-6">
                    {traveler?.date_of_birth
                      ? format(new Date(traveler.date_of_birth), "yyyy-MM-dd")
                      : ""}
                  </td>
                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler?.passport_number}
                  </td>
                  <td className="py-2 text-xs md:ps-6">
                    {traveler?.passport_expiry_date
                      ? format(
                          new Date(traveler.passport_expiry_date),
                          "yyyy-MM-dd"
                        )
                      : ""}
                  </td>

                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler?.address
                      ? traveler?.address
                      : traveler.city + "," + " " + traveler.country_name}
                  </td>
                  <td className="px-3 py-2 text-xs md:px-6">
                    {traveler?.passport_type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* tracking_data */}
      <div className="bg-bgMuted  py-4">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Tracking Visa{" "}
        </h4>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white ">
              <tr>
                <th scope="col" className="px-2 py-4 text-xs md:px-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  status
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  details
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.tracking_data?.map((tracking: TrackingDatum) => (
                <tr
                  key={tracking.id}
                  className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white "
                >
                  <td className="px-2 py-4 md:px-6">
                    {tracking?.created_date
                      ? format(new Date(tracking.created_date), "yyyy-MM-dd")
                      : ""}
                  </td>
                  <td className="px-2 py-4 capitalize md:px-6">
                    {tracking.status}
                  </td>
                  <td className="px-2 py-4 md:px-6">{tracking.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default VisaApplicationDetails
