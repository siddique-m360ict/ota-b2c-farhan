"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}
function DatePickerRange({ className, date, setDate }: Props) {
  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className=" flex  gap-2">
            <Button
              variant={"outline"}
              className={cn(
                "h h-[5.5vh] w-full justify-start rounded text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                format(date.from, "LLL dd, y")
              ) : (
                <span>Departure Date</span>
              )}
            </Button>
            <Button
              variant={"outline"}
              className={cn(
                "h h-[5.5vh] w-full justify-start rounded text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.to ? (
                format(date.to, "LLL dd, y")
              ) : (
                <span>Return Date</span>
              )}
            </Button>
          </div>

          {/* <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h h-[5.5vh] w-full justify-start rounded text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div className="flex w-full justify-between">
                  <p>{format(date.from, "LLL dd, y")} </p>{" "}
                  <Separator
                    orientation="vertical"
                    className=" h-[1px] w-[3vw] translate-y-3"
                  />
                  <p>{format(date.to, "LLL dd, y")}</p>
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button> */}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerRange
