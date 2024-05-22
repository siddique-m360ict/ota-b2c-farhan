import { IGetVisaApplicationList } from "@/app/(visaSearch)/actions"
import { formatNumber } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import React from "react"

type Props = {
  visaApplication: IGetVisaApplicationList[]
}
const VisaApplicationList = ({ visaApplication }: Props) => {
  return (
    <div>
      <div className="mt-6 md:mt-0">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white">
              <tr>
                <th scope="col" className="px-2 py-4 md:px-6">
                  Visa Type
                </th>
                <th scope="col" className="px-3 py-2 md:px-6">
                  Visa Fee
                </th>

                <th scope="col" className="px-3 py-2 md:px-6">
                  Processing Fee
                </th>
                <th scope="col" className="px-3 py-2 md:px-6">
                  Traveler
                </th>
                <th scope="col" className="px-3 py-2 md:px-6">
                  Application Date
                </th>

                <th scope="col" className="px-3 py-2 md:px-6">
                  Payable Amount
                </th>

                <th scope="col" className="py-2  md:ps-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {visaApplication?.map((visa) => (
                <tr
                  key={visa.id}
                  className="border-b bg-white hover:bg-gray-50  dark:bg-transparent dark:text-white "
                >
                  <td className="px-6 py-2">{visa.type}</td>
                  <td className="flex items-center gap-[3px] px-6 py-2">
                    <span className="font-mono text-xs">৳</span>{" "}
                    {formatNumber(visa.visa_fee)}
                  </td>
                  <td className="px-7 py-2">
                    <span className="font-mono text-xs">৳</span>{" "}
                    {formatNumber(visa.processing_fee)}
                  </td>
                  <td className="px-6 py-2">{visa.traveler}</td>
                  <td className="px-6 py-2">
                    {visa.application_date
                      ? format(new Date(visa.application_date), "yyyy-MM-dd")
                      : ""}
                  </td>

                  <td className="flex items-center gap-[2px] px-6 py-2">
                    <span className="font-mono text-xs">৳</span>
                    {formatNumber(visa.payable)}
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/visaApplicationDetails/${visa.id}`}
                      >
                        <div className="z-50 cursor-pointer rounded border border-blue-100 px-2 py-1 text-center text-xs text-blue-500 transition-all duration-300 dark:border-[#222]">
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

export default VisaApplicationList
