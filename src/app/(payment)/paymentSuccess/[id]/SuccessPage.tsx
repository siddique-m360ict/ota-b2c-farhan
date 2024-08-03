"use client"

import { Icons } from "@/components/icons"
import confetti from "canvas-confetti"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IGetSingleTransaction } from "../../actions"
import { useAppSelector } from "@/lib/redux/hooks"

type Props = {
  paymentData: IGetSingleTransaction
}

const SuccessPage = ({ paymentData }: Props) => {
  useEffect(() => {
    triggerConfetti()

    const confettiCleanup = setTimeout(() => {
      confetti.reset()
    }, 15000)

    return () => clearTimeout(confettiCleanup)
  }, [])

  const triggerConfetti = () => {
    var end = Date.now() + 5 * 1000
    var colors = ["#2c59e5", "#ffffff"]

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return (
    <div className="bg-bgMuted">
      <div className="container mx-auto">
        <div className="flex min-h-screen items-start justify-center">
          <div className="rounded-lg px-12 py-8 shadow-xl">
            <div>
              <Image src={"/be.png"} alt="logo" height={200} width={200} />
            </div>
            <div className="mx-auto w-[13rem]">
              <Image
                src={"/payment.png"}
                alt="logo"
                height={100}
                width={100}
                className="w-full"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="mb-1 text-gray-700">
                Hi {paymentData.first_name} {paymentData.last_name},
                Congratulations!
              </p>
              <h1 className="text-3xl font-bold text-primary ">
                Payment Successful!{" "}
              </h1>
              <h2 className="mt-2 text-2xl font-medium text-gray-700">
                Total : {paymentData?.payable_amount} BDT
              </h2>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icons.Info className="text-2xl text-[#0BA859]" />
                <span className="text-blue-gray-600 font-semibold">
                  {paymentData.phone_number}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Icons.BadgeCheck className="text-2xl text-[#0BA859]" />
                <span className="text-blue-gray-600 font-semibold">
                  {paymentData?.email}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Icons.ArrowDownUp className="text-2xl text-[#0BA859]" />
                <span className="text-blue-gray-600 font-semibold">
                  {paymentData?.type}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <div>
                <h1 className="text-[19px] font-medium text-[#0BA859]">
                  Transaction ID : {paymentData?.bank_tran_id}
                </h1>

                <p className="text-blue-gray-600 mt-2 font-medium ">
                  PNR : {paymentData?.pnr_code}
                </p>
                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Ticket Issue Status :{" "}
                  <span className="font-bold text-[#0BA859]">
                    {paymentData?.status}
                  </span>
                </p>
                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Base Fare : {paymentData?.base_fare} BDT
                </p>
                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Tax : {paymentData?.total_tax} BDT
                </p>
                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Ait : {paymentData?.ait} BDT
                </p>

                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Discount : {paymentData?.discount} BDT
                </p>
                <p className="text-blue-gray-600 mt-2 font-medium ">
                  Total : {paymentData?.total_amount} BDT
                </p>
              </div>
            </div>

            <div className="relative mt-20 text-end">
              <h2 className="text-3xl font-bold text-[#0BA859] opacity-10">
                Booking Expert World
              </h2>
              <div className="absolute right-[-10px] top-[-30px]">
                <Image src={"/star.png"} alt="logo" height={100} width={100} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
