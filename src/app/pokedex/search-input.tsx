"use client"

import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

export type SearchInputProps = {}

export function SearchInput({}: SearchInputProps) {
  const router = useRouter()
  const sParams = useSearchParams()
  const path = usePathname()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        router.push(
          `${path}?${new URLSearchParams(
            // @ts-expect-error URLSearchParams can accept FormData
            new FormData(e.currentTarget)
          ).toString()}`
        )
      }}
      className="flex flex-col justify-center gap-4 md:flex-row md:items-center"
    >
      <fieldset>
        <label htmlFor="wait" className="flex items-center gap-2">
          <input
            type="checkbox"
            name="wait"
            id="wait"
            className="peer sr-only"
            defaultChecked={sParams.get("wait") === "on"}
          />

          <div
            className={cn(
              "inline-flex h-4 w-4 flex-col items-center justify-center",
              "rounded-sm border-[1.5px]  border-black bg-white text-black",
              "ring-primary peer-focus:ring-2 [&>svg]:hidden peer-checked:[&>svg]:block"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <rect width="256" height="256" fill="none" />
              <polyline
                points="40 144 96 200 224 72"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              />
            </svg>
          </div>
          <span>Wait ?</span>
        </label>
      </fieldset>

      <fieldset>
        <label htmlFor="search" className="sr-only">
          The name of the pokemon you are searching
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="ex: pikachu"
          className="dark:highlight-white/5 flex h-12 w-full max-w-72 items-center space-x-3 rounded-lg bg-white px-4 text-left text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-slate-800 dark:text-slate-300 dark:ring-0 dark:hover:bg-slate-700"
          defaultValue={sParams.get("search") ?? ""}
        />
      </fieldset>

      <button className="dark:highlight-white/20 flex h-12 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto">
        Submit
      </button>
    </form>
  )
}
