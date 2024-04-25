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
  setActiveRoute: React.Dispatch<React.SetStateAction<string>>
  activeRoute: string | undefined
}

const routeList = [
  {
    id: "oneway",
    label: "One Way",
    element: <>hello</>,
  },
  { id: "roundtrip", label: "Round Trip", element: <>Round Trip</> },
  { id: "multicity", label: "Multi City", element: <>Multi City</> },
]

function SelectRoute({ activeRoute, setActiveRoute }: Props) {
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
          <Icons.Plane size={18} className="me-1" />
          <p className="text-sm ">
            {activeRoute
              ? routeList.find((framework) => framework.id == activeRoute)
                  ?.label
              : "Select Route"}
          </p>
          <Icons.ChevronDown className="ms-[1px] text-gray-800" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {routeList.map((framework) => (
              <CommandItem
                key={framework.id}
                value={framework.id}
                onSelect={(currentValue) => {
                  setActiveRoute(
                    currentValue == activeRoute ? "" : currentValue
                  )
                  setOpen(false)
                }}
              >
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
export default SelectRoute
