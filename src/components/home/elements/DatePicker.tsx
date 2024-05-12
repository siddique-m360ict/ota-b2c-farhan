import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PopoverClose } from "@radix-ui/react-popover"
import { useState } from "react"

type Props = {
  setDate: (date: Date) => void
  date: Date | undefined | null
}

function DatePicker({ date, setDate }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleDateSelect = (selectedDate: Date) => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd")
    setDate(new Date(formattedDate))
    setIsCalendarOpen(false)
  }

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "h h-[5.4vh] w-full justify-start rounded text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Departure Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col space-y-2 p-2">
        <div className="hidden md:flex">
          <Select
            onValueChange={(value) => {
              setDate(addDays(new Date(), parseInt(value)))
              setIsCalendarOpen(false)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="1">Tomorrow</SelectItem>
              <SelectItem value="3">In 3 days</SelectItem>
              <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full rounded-md border">
          <PopoverClose>
            <Calendar mode="single" selected={date!} onSelect={setDate} />
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
