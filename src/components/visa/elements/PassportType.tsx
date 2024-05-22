import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import React, { useState } from "react"

type Props = {
  setPassportType?: React.Dispatch<React.SetStateAction<string>>
  passportType?: string
}
const PassportType = ({ setPassportType, passportType }: Props) => {
  const [open, setOpen] = useState(false)

  const handleChange = (value: string) => {
    setPassportType(value)
    setOpen(false)
  }
  return (
    <div>
      {/* country */}
      <div className="flex flex-col">
        <p className="mb-1 text-sm">
          Passport Type <span className="text-red-500">*</span>
        </p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {passportType ? passportType : "Select Passport Type"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search country..." />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup className="max-h-[35vh] overflow-auto">
                <CommandItem
                  key={"Ordinary"}
                  value={"Ordinary"}
                  onSelect={() => handleChange("Ordinary")}
                  className="cursor-pointer"
                >
                  Ordinary
                </CommandItem>
                <CommandItem
                  key={"Diplomatic"}
                  value={"Diplomatic"}
                  onSelect={() => handleChange("Diplomatic")}
                  className="cursor-pointer"
                >
                  Diplomatic
                </CommandItem>
                <CommandItem
                  key={"Official"}
                  value={"Official"}
                  onSelect={() => handleChange("Official")}
                  className="cursor-pointer"
                >
                  Official
                </CommandItem>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default PassportType
