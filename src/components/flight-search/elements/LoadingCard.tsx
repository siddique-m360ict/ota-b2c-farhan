import React from "react"

type Props = {}

const LoadingCard = (props: Props) => {
  return (
    <div className="my-3 flex flex-[3]  flex-col rounded-lg border bg-white py-1.5 shadow">
      <div className="animate-pulse">
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-[3] flex-col">
            <div className="flex flex-[3] items-center p-2">
              <div className="flex flex-[1.2] items-center gap-2">
                <div className="bg-spin h-10 w-16 rounded"></div>
                <span className="bg-spin h-5 rounded md:w-24"></span>
              </div>
              <div className="flex-[2]">
                <div className="flex items-center justify-center gap-5">
                  <p className="bg-spin h-10 rounded md:w-20"></p>

                  <p className="bg-spin mt-1 h-2 w-24 rounded"></p>
                  <p className="bg-spin h-10 rounded md:w-20"></p>
                </div>
              </div>
              <div className="flex flex-[0.7] justify-end pr-5">
                <div className="bg-spin h-5 rounded md:w-16"></div>
              </div>
            </div>
          </div>

          <div className="flex-[1.2] bg-[#ebf0f4]">
            <div className="flex h-full flex-col justify-center gap-5 p-2 px-4">
              <div className="flex items-center justify-end text-right text-xl font-semibold ">
                <span className="bg-blue-gray-100 h-5 w-28 rounded"></span>
              </div>
              <div>
                <div className="bg-button group mt-2 flex cursor-not-allowed items-center justify-between rounded p-1 transition-all">
                  <div className="px-3 text-base font-semibold text-black opacity-0 group-hover:text-white">
                    SELECT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-7 w-full border-t px-4 py-2 text-end"></div>
      </div>
    </div>
  )
}

export default LoadingCard
