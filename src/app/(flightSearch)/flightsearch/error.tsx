"use client"

import Link from "next/link"

export default function Error({
  reset,
  error,
}: {
  reset: () => void
  error: Error
}) {
  return (
    <div className="mx-auto my-4 flex h-auto w-full flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12">
      <h2 className="text-xl font-bold">Flight Not Found {error.message}</h2>
      <p className="my-2">Please search your flight again.</p>
      <Link
        href="/"
        className="mx-auto mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
      >
        Try Again
      </Link>
    </div>
  )
}
