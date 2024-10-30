import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import Image from "next/image"
import { hostedImage, serverUrl } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import {
  selectSelectedAirlines,
  setSelectedAirlines,
} from "@/lib/redux/slice/cappingAirline"

export type CappingAirlines = {
  airline_code?: string
  airline_name?: string
  airline_logo?: string
  capping?: number
  soto_commission?: string
  from_dac_commission?: string
  to_dac_commission?: string
  soto_allowed?: number
  last_updated?: string
  domestic_commission?: string
  updated_by?: string
}

export function FancyMultiSelect() {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [airlines, setAirlines] = React.useState<CappingAirlines[]>([])
  const selected = useAppSelector(selectSelectedAirlines)
  const dispatch = useAppDispatch()

  const handleUnselect = (framework: CappingAirlines) => {
    dispatch(
      setSelectedAirlines(
        selected.filter((s) => s.airline_code !== framework.airline_code)
      )
    )
  }

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            dispatch(setSelectedAirlines(selected.slice(0, -1)))
          }
        }
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [dispatch, selected]
  )

  const selectables = airlines.filter(
    (framework) =>
      !selected?.some(
        (selectedFramework) =>
          selectedFramework.airline_code === framework.airline_code
      )
  )

  const debouncedQuery = useDebounce(inputValue, 400)
  async function fetchAirportData(arg: string) {
    try {
      const api = serverUrl(
        `/common/airlines-capping?name=${arg?.toLocaleUpperCase()}`
      )
      const res = await fetch(api, {
        cache: "no-store",
      })

      if (!res.ok) {
        throw new Error("Failed to fetch airline data")
      }
      const data = await res.json()
      setAirlines(data?.data)
    } catch (error) {
      console.error("Error fetching airline data:", error)
      throw error
    }
  }

  React.useEffect(() => {
    fetchAirportData(debouncedQuery)
  }, [debouncedQuery])

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="mt-2 w-auto overflow-visible bg-transparent md:mt-0"
      shouldFilter={false}
    >
      <div className="group rounded-md border border-input px-2 py-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected?.map((framework) => {
            return (
              <Badge key={framework.airline_code} variant="outline">
                <Image
                  src={hostedImage(`/${framework.airline_logo}`)}
                  alt={framework.airline_name}
                  width={15}
                  height={15}
                  className="me-2"
                />
                {framework.airline_name}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="size-3 text-muted hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select Airlines..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-[9999] w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.airline_code}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={(value) => {
                        setInputValue("")
                        dispatch(
                          setSelectedAirlines([...(selected || []), framework])
                        )
                      }}
                      className={"cursor-pointer"}
                    >
                      <Image
                        src={hostedImage(`/${framework.airline_logo}`)}
                        alt={framework.airline_name}
                        width={20}
                        height={20}
                        className="me-2"
                      />
                      {framework.airline_name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
