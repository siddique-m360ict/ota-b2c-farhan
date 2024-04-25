import React from "react"

interface Props {
  message?: string
}

export default function BoxLoader(props: Props) {
  const { message = "Loading..." } = props
  return (
    <div className="m-auto flex items-center justify-center border-2 p-6">
      <div className="flex items-center gap-2">
        <div className={`loading loading-bars text-white`}></div>
        <span className={`text-xl `}>{message}</span>
      </div>
    </div>
  )
}
