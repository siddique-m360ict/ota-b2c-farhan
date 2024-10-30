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
import { PopoverClose } from "@radix-ui/react-popover"
import { useMediaQuery } from "@/hooks/use-media-query"

type Props = {
  className?: React.HTMLAttributes<HTMLDivElement>
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  visaPage?: boolean
}
function DatePickerRange({ className, date, setDate, visaPage }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  return (
    <div className={cn("w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          {!visaPage ? (
            <div className=" flex  gap-2">
              <Button
                variant={"outline"}
                className={cn(
                  "h h-[5.5vh] w-full justify-start rounded text-left font-normal xl:h-[5.5vh] 2xl:h-[5.5vh]",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 size-4" />
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
                <CalendarIcon className="mr-2 size-4" />
                {date?.to ? (
                  format(date.to, "LLL dd, y")
                ) : (
                  <span>Return Date</span>
                )}
              </Button>
            </div>
          ) : (
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h flex h-[6.5vh] w-full flex-col items-start justify-start rounded font-normal md:h-[6.5vh] 2xl:h-[5.6vh]",
                !date && "text-muted-foreground"
              )}
            >
              <p className="mb-[2px] text-xs text-destructive">
                Intended Flying and return Date
              </p>
              {date?.from ? (
                date.to ? (
                  <div className="flex w-full justify-between">
                    <p>{format(date.from, "LLL dd, y")} </p>{" "}
                    <Separator
                      orientation="vertical"
                      className=" h-px w-[3vw] translate-y-3"
                    />
                    <p>{format(date.to, "LLL dd, y")}</p>
                  </div>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Select Departure and Return Date</span>
              )}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            disabled={(date) =>
              date < new Date() || date < new Date("1900-01-01")
            }
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onDayClick={(day) =>
              setDate((prev) => {
                if (!prev?.from || prev?.to) {
                  return { from: day, to: undefined }
                }
                const newRange = { from: prev.from, to: day }
                if (newRange.to < newRange.from) {
                  return { from: newRange.to, to: undefined }
                }
                return newRange
              })
            }
            numberOfMonths={isDesktop ? 2 : 1}
            weekStartsOn={1}
          />
          <div className="flex justify-end px-3 py-2">
            <PopoverClose>
              <Button
                size="sm"
                className="w-full text-xs"
                variant={"secondary"}
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerRange
