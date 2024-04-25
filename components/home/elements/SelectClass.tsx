"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { Icons } from "@/components/icons"

type Props = {
  setCabinClass: React.Dispatch<React.SetStateAction<string>>
  cabinClass: string | undefined
}

const cabinClassList = [
  {
    value: "Y",
    label: "Economy",
  },
  {
    value: "P",
    label: "Premium Economy",
  },
  {
    value: "J",
    label: "Business",
  },
  {
    value: "F",
    label: "First",
  },
]

function SelectClass({ cabinClass, setCabinClass }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="m-0 h-0 border-none p-0"
          aria-expanded={open}
        >
          <Icons.Armchair size={18} className="me-1" />
          <p className="text-sm ">
            {cabinClass
              ? cabinClassList.find(
                  (framework) => framework.value == cabinClass?.toUpperCase()
                )?.label
              : "Select Cabin"}
          </p>
          <Icons.ChevronDown className="ms-[1px] text-gray-800" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {cabinClassList.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setCabinClass(currentValue == cabinClass ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    framework.value == cabinClass?.toUpperCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default SelectClass
