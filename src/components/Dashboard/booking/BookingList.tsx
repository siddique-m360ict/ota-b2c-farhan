"use client"
import { BookingRequest } from "@/app/(dashboard)/dashboard/(booking)/actions"
import { paymentAfterBooking } from "@/app/(flightRevalidate)/actions"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useAppSelector } from "@/lib/redux/hooks"
import { getCookies } from "@/lib/token/getCookies"
import { format } from "date-fns"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  bookingRequestData: BookingRequest[]
}
const BookingList = ({ bookingRequestData }: Props) => {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const handlePay = async (BookingID) => {
    const response = await paymentAfterBooking(BookingID, user.token)
    if (response.success) {
      router.push(response?.redirect_url)
    } else {
      console.log(response)
      toast({
        title: "Something happened wrong",
        variant: "destructive",
        className: "bg-red-500",
      })
    }
  }
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
                  PNR
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
              {bookingRequestData?.map((request, index) => (
                <tr
                  key={index}
                  className="border-b bg-white hover:bg-gray-50  dark:bg-transparent dark:text-white "
                >
                  <td className="px-6 py-2">{request.journey_type}</td>
                  <td className="px-6 py-2">{request.booking_status}</td>
                  <td className="px-6 py-2">{request.pnr_code}</td>
                  <td className="px-6 py-2">{request.payable_amount}</td>
                  <td className="px-6 py-2">
                    {request.booking_created_at
                      ? format(
                          new Date(request.booking_created_at),
                          "yyyy-MM-dd"
                        )
                      : ""}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/viewBooking/${request.booking_id}`}
                      >
                        <div className="rounded border  border-blue-100 px-2 py-1 text-center text-xs text-blue-500 transition-all duration-300 dark:border-[#222]">
                          View
                        </div>
                      </Link>
                      {/* {request.booking_status === "pending" && (
                        <button onClick={() => handlePay(request.booking_id)}>
                          <div className="rounded border border-blue-100 bg-primary px-2 py-1 text-center text-xs text-white transition-all duration-300 dark:border-[#222]">
                            Pay
                          </div>
                        </button>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookingRequestData.length === 0 && (
            <h1 className="text-center">No Data Found</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingList
