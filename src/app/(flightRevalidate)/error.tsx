"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons" // Assuming you have an Icons component for a back icon

const ErrorBoundary = ({ error }: { error: Error }) => {
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="flex justify-center">
          <Icons.TriangleAlert size={50} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          Flight Already Booked
        </h1>
        <p className="text-gray-600">
          The flight you selected is no longer available. Please search again to
          find another flight.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.back()}
            className="hover:bg-primary-dark flex items-center space-x-2 rounded bg-primary p-2 px-4 text-white transition duration-300"
          >
            <Icons.ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
