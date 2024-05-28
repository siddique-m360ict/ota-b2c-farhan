"use client"
import React, { useState } from "react"
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation"
import { useTimer } from "react-timer-hook"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Icons } from "../icons"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

function Timer({ expiryTimestamp, onExpire, className, isDesktop }) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire,
  })
  const zeroPadTime = (time) => {
    return time < 10 ? `0${time}` : time
  }
  const pathName = usePathname()
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between gap-2 rounded   bg-card px-4 py-[1.6vh] shadow",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Icons.Timer
          size={isDesktop ? 23 : 20}
          className={cn(
            "font-bold  md:text-primary",
            pathName !== "/flight-revalidate" && "text-white"
          )}
        />
        <p className="text-sm">Time Remaining</p>
      </div>
      <div className={cn("text-sm font-bold md:text-primary")}>
        <span>{zeroPadTime(minutes)}</span>:<span>{zeroPadTime(seconds)}</span>
      </div>
    </div>
  )
}

const TimeCounter = ({ className }: { className?: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const targetTime = new Date(Date.now() + 15 * 60 * 1000)
  const pathName = usePathname()
  const handleExpire = () => {
    setIsModalOpen(true)
  }
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const closeModal = () => {
    setIsModalOpen(false)
    if (pathName === "/flightsearch") {
      window.location.reload()
    } else {
      router.push("/")
    }
  }

  return (
    <div>
      <Timer
        expiryTimestamp={targetTime}
        onExpire={handleExpire}
        className={className}
        isDesktop={isDesktop}
      />
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="bg-secondaryBg [&>button]:hidden">
            <DialogHeader>
              <DialogTitle>Session Expired!</DialogTitle>
            </DialogHeader>
            <DialogDescription>Your session has expired.</DialogDescription>
            <DialogFooter>
              <Button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Search Again
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default TimeCounter
