import {
  IBookingRequestDetails,
  Segment,
} from "@/app/(dashboard)/dashboard/(booking)/actions"
import { formatGlobalTime, hostedImage } from "@/lib/utils"
import { format } from "date-fns"
import Image from "next/image"
import React from "react"
import CancelBooking from "./elements/CancelBooking"

type Props = {
  data: IBookingRequestDetails
  token: string
}
const BookingRequestDetails = ({ data, token }: Props) => {
  return (
    <div>
      {/*-------------- Header -------------- */}
      <div className="flex items-center justify-between ">
        <div>
          <h3 className="bg-blue-gray-100 rounded p-1.5 font-semibold text-primary">
            Status: {data?.status}
          </h3>
          <h3 className="rounded text-sm font-semibold">
            Journey Type : {data?.journey_type}
          </h3>
          <h3 className="mt-1 rounded text-sm font-semibold">
            Create Date :{" "}
            {data.created_date
              ? format(new Date(data.created_date), "yyyy-MM-dd")
              : ""}
          </h3>
        </div>
        <div className="">
          <Image
            className="object-contain"
            src={"/be.png"}
            alt="logo"
            height={150}
            width={150}
          />

          <div className=" text-blue-gray-900 ml-1 mt-4 text-sm">
            <h5>Dhaka - 1000</h5>
            <h5>01515151515</h5>
            <h5>info@BookingExpert.world</h5>
          </div>
        </div>
      </div>

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
                  Airline
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Flight
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Departs
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Departure Date/Time
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Arrives
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Arrival Date/Time
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Baggage
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Cabin
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.segments?.map((segment: Segment) => (
                <tr
                  key={segment.id}
                  className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white "
                >
                  <td className="px-2 py-4 md:px-6">
                    <div className="flex items-center gap-2">
                      <Image
                        src={hostedImage(`/${segment.airline_logo}`)}
                        alt=""
                        width={50}
                        height={50}
                      />
                      <p className="text-xs">{segment?.airline}</p>
                    </div>
                  </td>

                  <td className="px-3 py-2 text-xs md:px-6">
                    {segment.flight_number}
                  </td>
                  <td className="px-3 py-2 text-xs md:px-6">
                    {segment?.origin}
                  </td>
                  <td className="py-2 text-xs md:ps-6">
                    {segment?.departure_date
                      ? format(new Date(segment.departure_date), "yyyy-MM-dd")
                      : ""}
                  </td>
                  <td className="py-2 text-xs md:ps-6">
                    {segment?.destination}
                  </td>
                  <td className="py-2 text-xs md:ps-6">
                    {segment?.arrival_date
                      ? format(new Date(segment?.arrival_date), "yyyy-MM-dd")
                      : ""}
                    <br />
                    {formatGlobalTime(
                      segment.arrival_time ? segment.arrival_time : ""
                    )}
                  </td>
                  <td className=" py-2 text-xs">{segment?.baggage}</td>
                  <td className=" py-2 text-xs">{segment?.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FARE DETAILS */}
      <div className="bg-bgMuted  py-4">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          FARE DETAILS
        </h4>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white ">
              <tr>
                <th scope="col" className="px-2 py-4 text-xs md:px-6">
                  Total Price
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Tax
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Discount
                </th>

                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  Customer Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white ">
                <td className="px-2 py-4 md:px-6">{data?.total_price}</td>
                <td className="px-3 py-2 md:px-6">{data?.total_tax}</td>
                <td className="px-3 py-2 md:px-6">{data?.discount}</td>
                <td className="py-2 text-xs md:ps-6">{data?.payable}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TRAVELER DETAILS */}
      <div className="bg-bgMuted  py-4">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          TRAVELER DETAILS
        </h4>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white ">
              <tr>
                <th scope="col" className="px-2 py-4 text-xs md:px-6">
                  Adult
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  children
                </th>
                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  kids
                </th>

                <th scope="col" className="px-3 py-2 text-xs md:px-6">
                  infants
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white">
                <td className="px-2 py-4 md:px-6">{data?.traveler_adult}</td>
                <td className="px-3 py-2 md:px-6">{data?.traveler_children}</td>
                <td className="px-3 py-2 md:px-6">{data?.traveler_kids}</td>
                <td className="py-2 text-xs md:ps-6">
                  {data?.traveler_infants}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookingRequestDetails
