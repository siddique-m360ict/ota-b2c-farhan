import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import React from "react"

type Passenger = "adult" | "children" | "kids" | "infant"
type Props = {
  setPassenger: React.Dispatch<
    React.SetStateAction<{
      adult: number
      children: number
      infant: number
      kids: number
    }>
  >
  passenger: {
    adult: number
    children: number
    infant: number
    kids: number
  }
  type?: string
}

const SelectPassenger = ({ setPassenger, passenger, type }: Props) => {
  const [open, setOpen] = React.useState(false)
  const incrementPassenger = (type: Passenger) => {
    if (
      type === "adult" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return
    if (
      type === "children" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return
    if (
      type === "kids" &&
      passenger.adult + passenger.children + passenger.kids >= 9
    )
      return

    if (type === "infant" && passenger.infant >= passenger.adult) return

    setPassenger((prevPassenger) => ({
      ...prevPassenger,
      [type]: prevPassenger[type] + 1,
    }))
  }

  const decrementPassenger = (type: Passenger) => {
    if (type === "adult" && passenger[type] === 1) return
    if (type === "children" && passenger[type] === 0) return
    if (type === "infant" && passenger[type] === 0) return
    if (type === "kids" && passenger[type] === 0) return

    if (type === "adult" && passenger[type] <= passenger.infant) {
      setPassenger((prevPassenger) => ({
        ...prevPassenger,
        [type]: prevPassenger[type] - 1,
        ["infant"]: prevPassenger["infant"] - 1,
      }))
    } else {
      setPassenger((prevPassenger) => ({
        ...prevPassenger,
        [type]: prevPassenger[type] - 1,
      }))
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        title="Select Travelers"
        className={cn("m-0 p-0", type && "w-full")}
      >
        {!type ? (
          <div className="flex">
            <Icons.UserCheck size={18} className="me-1 hidden md:block" />

            <p className="text-sm">
              {passenger.adult +
                passenger.children +
                passenger.infant +
                passenger.kids}{" "}
              {passenger.adult +
                passenger.children +
                passenger.infant +
                passenger.kids >
              1
                ? "Travelers"
                : "Traveler"}
            </p>
            <Icons.ChevronDown className="ms-[1px] text-gray-800" size={20} />
          </div>
        ) : (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-auto w-full flex-col items-start justify-start rounded py-[5px] text-start"
          >
            <div className="flex w-full flex-col">
              <span className="text-sm text-destructive">Travelers</span>
              <div className="">
                <p className="flex text-sm">
                  {passenger.adult +
                    passenger.children +
                    passenger.infant +
                    passenger.kids}{" "}
                  {passenger.adult +
                    passenger.children +
                    passenger.infant +
                    passenger.kids >
                  1
                    ? "Travelers"
                    : "Traveler"}
                </p>
              </div>
            </div>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {/* ADULTS */}
          <div className="mb-2 mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Icons.adult className="text-xs text-gray-600" />
              <div className="ml-2 text-sm">
                <span>Adults</span>
                <p className="text-xs text-gray-500">12 years & above</p>
              </div>
            </div>
            <div className="flex items-center  gap-0">
              <Icons.Minus
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => decrementPassenger("adult")}
              />
              <span className="w-10 text-center text-sm">
                {passenger.adult}
              </span>

              <Icons.add
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => incrementPassenger("adult")}
              />
            </div>
          </div>
          {/* CHILD */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Icons.children className="text-2xl text-gray-600" />
              <div className="ml-2">
                <span className="text-sm">Children</span>
                <p className="text-xs text-gray-500">From 5 to under 11</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icons.Minus
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => decrementPassenger("children")}
              />
              <span className="w-10 text-center text-sm">
                {passenger.children}
              </span>
              <Icons.add
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => incrementPassenger("children")}
              />
            </div>
          </div>
          {/* KIDS */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Icons.kids className="text-2xl text-gray-600" />
              <div className="ml-2">
                <span className="text-sm">Kids</span>
                <p className="text-xs text-gray-500">From 2 to under 5</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icons.Minus
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => decrementPassenger("kids")}
              />

              <span className="w-10 text-center text-sm">{passenger.kids}</span>
              <Icons.add
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => incrementPassenger("kids")}
              />
            </div>
          </div>
          {/* INFANT */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <Icons.baby className="text-2xl text-gray-600" />
              <div className="ml-2">
                <span className="text-sm"> Infants</span>
                <p className="text-xs text-gray-500">Under 2 years</p>
              </div>
            </div>
            <div className="flex items-center">
              <Icons.Minus
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => decrementPassenger("infant")}
              />

              <span className="w-10 text-center text-sm">
                {passenger.infant}
              </span>
              <Icons.add
                className="h-6 w-6 cursor-pointer rounded-full border bg-[#EBF0F5] p-1.5"
                onClick={() => incrementPassenger("infant")}
              />
            </div>
          </div>
        </div>
        <div className="w-full text-end">
          <Button
            size={"sm"}
            className="m-0 px-2"
            onClick={() => setOpen(false)}
          >
            Ok
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default SelectPassenger
