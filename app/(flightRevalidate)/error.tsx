"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

const ErrorBoundary = ({ error }: { error: Error }) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex-[2.5] space-y-5 rounded">
        <div className="flex h-[56vh] items-center justify-center bg-white p-4">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold">
              This flight is already booked
            </h1>
            <p className="mb-5 text-gray-600">
              <span className="block">Please search again.</span>
            </p>
            <Link
              href="/"
              className=" rounded bg-primary p-2 px-4 text-white hover:underline"
              onClick={() => router.refresh()}
            >
              Go back to search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
