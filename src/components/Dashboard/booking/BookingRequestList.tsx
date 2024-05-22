import { BookingRequest } from "@/app/(dashboard)/dashboard/(booking)/actions"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"

type Props = {
  bookingRequestData: BookingRequest[]
}
const BookingRequestList = ({ bookingRequestData }: Props) => {
  return (
    <div>
      <div className="mt-6 md:mt-0">
        <div className="relative shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white">
              <tr>
                <th scope="col" className="px-2 py-4 md:px-6">
                  Journey Type
                </th>
                <th scope="col" className="px-3 py-2 md:px-6">
                  Status
                </th>

                <th scope="col" className="px-3 py-2 md:px-6">
                  Total Amount
                </th>
                <th scope="col" className="px-3 py-2 md:px-6">
                  Created Date
                </th>

                <th scope="col" className="py-2  md:ps-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingRequestData?.map((request) => (
                <tr
                  key={request.id}
                  className="border-b bg-white hover:bg-gray-50  dark:bg-transparent dark:text-white "
                >
                  <td className="px-6 py-2">{request.journey_type}</td>
                  <td className="px-6 py-2">{request.status}</td>
                  <td className="px-6 py-2">{request.payable}</td>
                  <td className="px-6 py-2">
                    {request.created_date
                      ? format(new Date(request.created_date), "yyyy-MM-dd")
                      : ""}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/viewBookingRequest/${request.id}`}
                      >
                        <div className="rounded border  border-blue-100 px-2 py-1 text-center text-xs text-blue-500 transition-all duration-300 dark:border-[#222]">
                          View
                        </div>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookingRequestList
