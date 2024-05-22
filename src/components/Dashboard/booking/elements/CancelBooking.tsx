"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { serverUrl } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

const CancelBooking = ({ id, token }: { id: number; token: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    setLoading(true)
    const customHeaders = new Headers()
    customHeaders.append("Content-Type", "application/json")
    customHeaders.append("Authorization", `Bearer ${token}`)
    const apiUrl = serverUrl(`/booking/booking-request/${id}`)

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: customHeaders,
      })
      const result = await response.json()
      if (!response.ok) {
        setLoading(false)
        return toast({
          title: result.message,
          description: "Your Delete request failed. Please try again.",
          variant: "destructive",
          className: "bg-[#ff0000]",
          duration: 1000,
        })
      } else {
        toast({
          title: result.message,
          duration: 1000,
        })
        setOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error("Error canceling booking request:", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mb-4 flex justify-end">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="danger" size="sm" className="h-6">
            Cancel Request
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" w-full">
          <p className="text-xs">
            Are you sure? you want to cancel this request
          </p>
          <div className="mt-4 flex  justify-end gap-2">
            <Button
              size="sm"
              className="h-7"
              variant="destructive"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="h-7"
              onClick={handleDelete}
            >
              {loading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Yes"
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CancelBooking
