"use client"
import {
  IBookingDetails,
  Segment,
  Traveler,
} from "@/app/(dashboard)/dashboard/(booking)/actions"
import { formatGlobalTime, formatNumber, hostedImage } from "@/lib/utils"
import { format } from "date-fns"
import Image from "next/image"
import React from "react"
import CancelBooking from "./elements/CancelBooking"
import { formatFlightDate, timeSlice } from "@/lib/formatter/dateTimeFormatter"
import { Icons } from "@/components/icons"
import DownloadBookingPDF from "./elements/DownloadBookingPDF"

type Props = {
  data: IBookingDetails
  token: string
}

const CommonTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-4 flex items-end gap-3">
      <div className="flex items-end gap-2">
        <div
          className="h-px w-10 "
          style={{
            background: "rgba(5, 5, 5, 0.06)",
          }}
        ></div>
        <h4 className=" text-[14px] font-semibold uppercase text-gray-800 dark:text-white">
          {title}
        </h4>
      </div>
      <div
        className=" h-px w-[72%] "
        style={{
          background: "rgba(5, 5, 5, 0.06)",
        }}
      ></div>
    </div>
  )
}
const BookingDetails = ({ data, token }: Props) => {
  return (
    <>
      <div
        className="shadow-2xl md:px-[20px] md:py-[26px] 2xl:w-[8.27in]"
        style={{
          minHeight: "11.5in",
          fontSize: "11px",
          background: "rgb(255, 255, 255)",
          margin: "0px auto",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/*-------------- Header -------------- */}
        <div className="flex items-center justify-between border-b border-[#F9F5F6] pb-3">
          <div className="">
            <Image
              className="object-contain"
              src={"/be.png"}
              alt="logo"
              height={250}
              width={250}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className=" text-blue-gray-900 ml-1 mt-2 text-xs">
              <h5 className="mb-2 text-[20px]">Booking Expert</h5>
              <h5>Road# 7, Block# H, Banani, Dhaka-1213</h5>
              <div className="flex justify-end gap-1 text-[#3E4957]">
                <div className="flex items-center gap-[2px]">
                  <Icons.Phone className="text-[15px]" />
                  <span>phone: </span>
                </div>
                <p className="text-xs">+8809638336699</p>
              </div>

              <div className="flex justify-end gap-1 text-[#3E4957]">
                <Icons.Mail />
                <p className="text-xs">reservation@bookingexpert.world</p>
              </div>
            </div>
          </div>
        </div>

        {/* ------------- body ---------------*/}
        <div className="text-center">
          <h1 className="mt-8 inline-block rounded border border-black/60 px-6 py-[2px] text-center text-[15px] font-bold uppercase text-destructive">
            E-Book
          </h1>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="mb-[3px] flex items-center gap-1">
              <h1 className="font-bold">Booking Date :</h1>
              <p className="">{formatFlightDate(data.booking_created_at)}</p>
            </div>
            <div className="mb-[3px] flex items-center gap-1">
              <h1 className="font-bold">Booking Status :</h1>
              <p>{data.booking_status}</p>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="font-bold">PNR :</h1>
              <p>{data.pnr_code}</p>
            </div>
          </div>

          <div>
            <div className="mb-[3px] flex items-center gap-1">
              <h1 className="font-bold">Booking ID :</h1>
              <p className="">BEI-{data.booking_id}</p>
            </div>
            <div className="mb-[3px] flex items-center gap-1">
              <h1 className="font-bold">Booked By :</h1>
              <p>{data.created_by}</p>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="font-bold">Total Passenger :</h1>
              <p>{data.total_passenger}</p>
            </div>
          </div>
        </div>

        {/* TRAVELER DETAILS */}
        <div className="bg-bgMuted mt-8 py-4">
          <CommonTitle title="Passenger Details" />
          <div className="relative overflow-x-auto rounded-t-lg">
            <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
              <thead className="  bg-[#ebf5ff] text-xs text-gray-700 dark:bg-[#222] dark:text-white ">
                <tr>
                  <th scope="col" className="p-2 text-xs md:px-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs md:px-6">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs md:px-6">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs md:px-6">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-2 text-xs md:px-6">
                    Passport No
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.traveler?.map((traveler: Traveler) => (
                  <tr
                    key={traveler.id}
                    className=" bg-white text-[11px] hover:bg-gray-50 dark:bg-transparent dark:text-white "
                  >
                    <td className="border border-gray-100 p-2 md:px-6 ">{`${traveler.reference} ${traveler.mid_name} ${traveler.sur_name}`}</td>
                    <td className="border border-gray-100 px-3 py-2 md:px-6">
                      {traveler.type}
                    </td>
                    <td className="border border-gray-100 px-3 py-2 md:px-6">
                      {traveler.phone}
                    </td>
                    <td className="border border-gray-100 px-3 py-2 md:px-6">
                      {traveler.email}
                    </td>
                    <td className="border border-gray-100 px-3 py-2 md:px-6">
                      {traveler.passport_number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TRAVEL SEGMENTS */}
        <div className="mt-6 py-4">
          <CommonTitle title="TRAVEL SEGMENTS" />
          <div className="relative overflow-x-auto  rounded-t-lg">
            <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
              <thead className="bg-[#f1f8ff]  uppercase text-gray-700     ">
                <tr>
                  <th scope="col" className="py-2 text-[10px] md:ps-4">
                    Airline
                  </th>
                  <th scope="col" className="text-[10px] md:ps-4">
                    Flight
                  </th>
                  <th scope="col" className="text-[10px] md:ps-4">
                    Departs
                  </th>
                  <th scope="col" className=" text-[10px] leading-3 md:ps-2">
                    Date/Time
                  </th>
                  <th scope="col" className=" ps-3 text-[10px]">
                    Arrives
                  </th>
                  <th scope="col" className=" text-[10px] leading-3">
                    Date/Time
                  </th>
                  <th scope="col" className=" px-4 text-[10px] md:px-0 md:ps-2">
                    Baggage
                  </th>
                  <th scope="col" className="text-[10px] md:ps-2">
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
                    <td className="border border-gray-100 p-4 ps-2 text-center md:px-0">
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          src={hostedImage(`/${segment.airline_logo}`)}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <p className="flex flex-col gap-1 text-[10px] leading-3">
                          {segment?.airline}
                        </p>
                      </div>
                    </td>

                    <td className=" border border-gray-100 py-2 text-center text-[10px]  leading-3">
                      <p> {segment.flight_number}</p>
                    </td>

                    <td className="w-[18%] border border-gray-100 py-2 text-center text-[10px]   leading-3">
                      <p>{segment?.origin}</p>
                    </td>
                    <td className="gap-1 border border-gray-100 py-2 text-center text-[10px] leading-3 ">
                      <p>{formatFlightDate(segment.departure_date)},</p>
                      <p>{timeSlice(segment?.departure_time)}</p>
                    </td>

                    <td className="w-[18%] border border-gray-100 py-2 text-center text-[10px]  leading-3">
                      <p> {segment?.destination}</p>
                    </td>

                    <td className="border border-gray-100 py-2 text-center text-[10px] leading-3">
                      <p>{formatFlightDate(segment.arrival_date)},</p>
                      <p>
                        {timeSlice(
                          segment.arrival_time ? segment.arrival_time : ""
                        )}
                      </p>
                    </td>
                    <td className="border border-gray-100 py-2 ps-2 text-[10px] leading-3">
                      {segment?.baggage}
                    </td>
                    <td className="border border-gray-100 py-2 ps-2 text-[10px] leading-3">
                      {segment?.class}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FARE DETAILS */}
        <div className="mt-4 py-4">
          <CommonTitle title="FARE DETAILS" />
          <div className="relative overflow-x-auto   rounded-t-lg">
            <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
              <thead className="bg-[#ebf5ff]  uppercase text-gray-700     ">
                <tr>
                  <th scope="col" className="p-2 text-xs md:px-6">
                    Total Price
                  </th>
                  <th scope="col" className="px-3 text-xs md:px-6">
                    Tax
                  </th>
                  <th scope="col" className="px-3 text-xs md:px-6">
                    Discount
                  </th>
                  <th scope="col" className="px-3 text-xs md:px-6">
                    AIT
                  </th>

                  <th scope="col" className="px-3 text-xs md:px-6">
                    Customer Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white hover:bg-gray-50 dark:bg-transparent dark:text-white ">
                  <td className="border border-gray-100 p-2 text-[11px] md:px-6">
                    BDT {formatNumber(data?.ticket_price)}
                  </td>
                  <td className="border border-gray-100 px-3 text-[11px] md:px-6">
                    BDT {formatNumber(data?.total_tax)}
                  </td>
                  <td className="border border-gray-100 px-3 text-[11px] md:px-6">
                    BDT {data?.discount}
                  </td>
                  <td className="border border-gray-100 px-3 text-[11px] md:px-6">
                    BDT {data?.ait}
                  </td>
                  <td className="text-[11px] md:ps-6">
                    BDT {formatNumber(data?.payable_amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingDetails
