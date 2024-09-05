import React, { useState } from "react"
import VisaSearchBox, { Passenger } from "../VisaSearchBox"
import { Card, CardContent } from "@/components/ui/card"
import VisaForm from "../elements/VisaForm"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const VisaPriceBox = () => {
  const [passengers, setPassenger] = useState<Passenger>({
    adult: 1,
    kids: 0,
    children: 0,
    infant: 0,
  })

  return (
    <div className="container mt-[-100px]">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <Card>
            <CardContent>
              <VisaForm passengers={passengers} />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <div className="price_card relative ">
            <div className="card_header absolute left-0 top-0 h-[110px] w-full overflow-hidden bg-[#7e86f1]">
              <div className="wave" />
              <div className="wave wave2" />
              <div className="header-content relative flex h-full flex-col justify-center p-[10px]">
                <div className="title flex items-center justify-center gap-[15px]">
                  <p className="text-[15px] font-[600] text-[#fff]">
                    Business Visit
                  </p>
                </div>
                <div className="mt-0 text-center text-[38px] font-[700] text-[#fff]">
                  ৳ <span> 29800</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-[20px] pt-[110px]">
              <p className="mt-6 text-[20px] font-bold">Price Summary</p>
              <div className="mt-6 rounded-lg border border-[#eaebf0]">
                <div className="flex justify-between p-[10px]">
                  <div className="flex items-center justify-center space-x-[5px]">
                    <Image
                      src={"/images/visa/point.svg"}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>Visa Fee</p>
                  </div>
                  <span className="text-[16px] font-bold">
                    ৳ <span> 12200</span>
                  </span>
                </div>

                <div className="flex justify-between p-[10px]">
                  <div className="flex items-center justify-center space-x-[5px]">
                    <Image
                      src={"/images/visa/point.svg"}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <p>Service Fee</p>
                  </div>
                  <span className="text-[16px] font-bold">
                    ৳ <span> 12200</span>
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#14152c]">
                (Includes all government related fees)
              </span>

              <div className="mt-2 flex items-center justify-between p-[10px]">
                <div className="flex gap-[7px]">
                  <Image
                    src={"/images/visa/grand.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="text-[16px] font-bold text-[#14152c]">
                    Grand Total
                  </span>
                </div>
                <span className="text-[16px] font-bold">
                  ৳ <span> 23700</span>
                </span>
              </div>
              <Separator />

              <div className="mt-[4px] flex items-center justify-between p-[10px]">
                <div className="flex gap-[7px]">
                  <Image
                    src={"/images/visa/process.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="text-[13px] font-[400] text-[#2a2e6a]">
                    Processing Time
                  </span>
                </div>
                <span className="text-[13px] font-[700] text-[#2f3268]">
                  Approx. 1 Working Days
                </span>
              </div>

              <div className="mt-5 text-center">
                <Button
                  type="button"
                  className="h-[5vh] w-full rounded-[10px] bg-[#2f3268] px-11 text-[16px]"
                  size="lg"
                >
                  <span>Apply Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaPriceBox
