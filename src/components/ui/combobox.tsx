"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Circle, File, Laptop, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useDebounce } from "@/hooks/use-debounce"
import { useHotkeys } from "@/hooks/use-hotkeys"
import { Button } from "./button"
import { Icons } from "../icons"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"
import { Skeleton } from "./skeleton"
import { cn } from "@/lib/utils"
import { IAirportList } from "../home/elements/types/flightSearchType"

type RouteHref = never

export function Combobox({
  tSearchTitle = "Search...",
  tPlaceholder = "Type a command or search",
  tCmdTheme = "Theme",
  tCmdLight = "Light",
  tCmdDark = "Dark",
  tCmdSystem = "System",
}: {
  tSearchTitle?: string
  tPlaceholder?: string
  tCmdTheme?: string
  tCmdLight?: string
  tCmdDark?: string
  tCmdSystem?: string
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 300)
  const [data, setData] = useState<IAirportList[] | null>()
  const [isPending, startTransition] = useTransition()
  const [airport, setAirport] = useState<IAirportList | null>(null)

  const requestURL = process.env.NEXT_PUBLIC_BASE_SERVER_URL

  async function fetchAirportData(arg: string) {
    try {
      const res = await fetch(
        `${requestURL}/public/airport?skip=0&limit=20&name=${arg?.toLocaleUpperCase()}`
      )
      if (!res.ok) {
        throw new Error("Failed to fetch airport data")
      }
      const data = await res.json()
      setData(data?.data)
    } catch (error) {
      console.error("Error fetching airport data:", error)
      throw error
    }
  }

  useEffect(() => {
    if (debouncedQuery.length === 0) setData(null)

    if (debouncedQuery.length > 0) {
      fetchAirportData(debouncedQuery)
    }
  }, [debouncedQuery])

  useEffect(() => {
    fetchAirportData(query)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((isOpen) => !isOpen)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSelect = (group) => {
    setIsOpen(false)
    setAirport(group)
  }

  useEffect(() => {
    if (!isOpen) {
      setQuery("")
    }
  }, [isOpen])

  const { setTheme } = useTheme()

  useHotkeys([
    ["ctrl+K", () => setIsOpen((open) => !open)],
    ["meta+K", () => setIsOpen((open) => !open)],
  ])

  const runCommand = useCallback(
    (command: () => void) => () => {
      setIsOpen(false)
      command()
    },
    []
  )

  console.log(data)

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">{tSearchTitle}</span>
        <span className="sr-only">Search products</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title="Control">⌘</abbr>K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder={tPlaceholder}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty className={cn("py-6 text-center text-sm")}>
            No result found.
          </CommandEmpty>
          {isPending ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data?.map((group, index) => (
              <CommandGroup key={index} className="capitalize">
                <CommandItem
                  key={group.iata_code}
                  onSelect={() => handleSelect(group)}
                >
                  {group.name}
                </CommandItem>
              </CommandGroup>
            ))
          )}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
