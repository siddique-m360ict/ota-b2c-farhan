import React, { FC } from "react"

export interface NcPlayIconProps {
  className?: string
}

const NcPlayIcon: FC<NcPlayIconProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-NcPlayIcon size-20 rounded-full bg-white bg-opacity-30 p-3 backdrop-blur lg:size-52 lg:p-12${className}`}
      data-nc-id="NcPlayIcon"
    >
      <div className="text-primary-500 relative size-full rounded-full bg-white">
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="size-8 md:size-12"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  )
}

export default NcPlayIcon
