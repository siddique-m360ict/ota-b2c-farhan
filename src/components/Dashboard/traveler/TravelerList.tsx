import Link from "next/link"
import React from "react"
import { Travelers } from "./addTravelerForm"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import DeleteTraveler from "./elements/DeleteTraveler"

type Props = {
  travelers: Travelers[]
  token: string
}

const TravelersList = async ({ travelers, token }: Props) => {
  return (
    <div>
      <div className="mt-6 md:mt-0">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-700 rtl:text-right ">
            <thead className="bg-blue-100 text-xs uppercase text-gray-700 dark:bg-[#222] dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-2">
                  No
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-2">
                  Reference
                </th>
                <th scope="col" className="px-6 py-2">
                  Phone
                </th>

                <th scope="col" className="px-4 py-2">
                  Passport No
                </th>
                <th scope="col" className="px-6 py-2">
                  Passport Expire Date
                </th>
                <th scope="col" className="px-6 py-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {travelers?.map((traveler) => (
                <tr
                  key={traveler.id}
                  className="border-b bg-white hover:bg-gray-50  dark:bg-transparent dark:text-white "
                >
                  <td className="px-6 py-2">{traveler.id}</td>
                  <td className="px-6 py-2">
                    {traveler.first_name + " " + traveler.last_name}
                  </td>
                  <td className="px-6 py-2">{traveler.title}</td>
                  <td className="px-6 py-2">{traveler.phone}</td>

                  <td className="px-6 py-2"> {traveler.passport_number} </td>
                  <td className="px-6 py-2">
                    {traveler.date_of_birth
                      ? format(new Date(traveler.date_of_birth), "yyyy-MM-dd")
                      : ""}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/updateTraveler/${traveler.id}`}>
                        <div className="rounded border  border-blue-100 px-2 py-1 text-center text-xs text-blue-500 transition-all duration-300 dark:border-[#222]">
                          Edit
                        </div>
                      </Link>
                      <DeleteTraveler travelerID={traveler.id} token={token} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {travelers.length === 0 && (
            <h1 className="text-center">No Data Found</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default TravelersList
