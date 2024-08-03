import { Icons } from "@/components/icons"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectFilterOption,
  setFilterOption,
} from "@/lib/redux/slice/filterOptions"
import { selectFilterItem } from "@/lib/redux/slice/flight_filter"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import React, { useState, useEffect } from "react"

const DepartureTime = ({ route }) => {
  const filterItem = useAppSelector(selectFilterItem)
  const departsFilterItems = filterItem?.departure_time
  const filterOption = useAppSelector(selectFilterOption)
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const departureDate = searchParams.get("departuredate")
  const returnDate = searchParams.get("returndate")
  const [activeBoxes, setActiveBoxes] = useState<string[]>(
    new Array(departsFilterItems?.length).fill(null)
  )

  const boxContent = [
    {
      id: "1",
      label: "00 - 06 AM",
      icon: <Icons.moonNight />,
      activeIcon: <Icons.activeMoonNight />,
      minTime: "00:00:00",
      maxTime: "06:00:00",
    },
    {
      id: "2",
      label: "06 - 12 PM",
      icon: <Icons.afterMoonNight />,
      activeIcon: <Icons.ActiveAfterMoonNight />,
      minTime: "06:00:00",
      maxTime: "12:00:00",
    },
    {
      id: "3",
      label: "12 - 06 PM",
      icon: <Icons.daySun />,
      activeIcon: <Icons.ActiveDaySun />,
      minTime: "12:00:00",
      maxTime: "18:00:00",
    },
    {
      id: "4",
      label: "06 - 12 AM",
      icon: <Icons.afterSun />,
      activeIcon: <Icons.ActiveAfterSun />,
      minTime: "18:00:00",
      maxTime: "00:00:00",
    },
  ]

  useEffect(() => {
    const minDepartureTimes = []
    const maxDepartureTimes = []

    activeBoxes.forEach((activeBox, index) => {
      if (activeBox) {
        const departureTime = boxContent.find((box) => box.id === activeBox)
        const departureFilterTime = departsFilterItems[index]
        if (departureFilterTime) {
          minDepartureTimes.push(
            `${departureFilterTime.min.split("T")[0]}T${
              departureTime.minTime
            }+${departureFilterTime.min.split("+")[1]}`
          )
          maxDepartureTimes.push(
            `${departureFilterTime.min.split("T")[0]}T${
              departureTime.maxTime
            }+${departureFilterTime.min.split("+")[1]}`
          )
        }
      } else {
        minDepartureTimes.push("null")
        maxDepartureTimes.push("null")
      }
    })
    console.log(minDepartureTimes, maxDepartureTimes)

    const min_departure_time = minDepartureTimes.join(",")
    const max_departure_time = maxDepartureTimes.join(",")

    dispatch(
      setFilterOption({
        min_departure_time: min_departure_time,
        max_departure_time: max_departure_time,
      })
    )
  }, [
    activeBoxes,
    route,
    departureDate,
    returnDate,
    departsFilterItems,
    dispatch,
  ])

  const handleBox = (index, id) => {
    const newActiveBoxes = [...activeBoxes]
    if (newActiveBoxes[index] === id) {
      newActiveBoxes[index] = null
    } else {
      newActiveBoxes[index] = id
    }
    setActiveBoxes(newActiveBoxes)
  }

  return (
    <div>
      {departsFilterItems?.map((filterItem, index) => (
        <div key={index} className="my-4">
          <p className="text-start text-sm font-bold">
            Departure {filterItem?.airport?.split("-")[0]}: Anytime
          </p>
          <div className="mt-2 flex items-center justify-between gap-0 border p-1">
            {boxContent.map((content) => (
              <div
                key={content.id}
                className={cn(
                  "cursor-pointer rounded bg-[#f9fafc] shadow-sm dark:bg-[#141414]",
                  activeBoxes[index] === content.id &&
                    "bg-[#D4E8FF] dark:bg-[#D4E8FF]"
                )}
                onClick={() => handleBox(index, content.id)}
              >
                <div className="flex flex-col items-center gap-1 px-1.5 py-2">
                  <p>
                    {activeBoxes[index] === content.id
                      ? content.activeIcon
                      : content.icon}
                  </p>
                  <p className="text-[10px] text-[#77818C]"> {content.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DepartureTime
