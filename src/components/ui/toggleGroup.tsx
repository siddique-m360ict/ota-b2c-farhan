"use client"
import * as React from "react"
import * as ToggleGroups from "@radix-ui/react-toggle-group"

const ToggleGroup = () => {
  const [value, setValue] = React.useState("left")

  return (
    <ToggleGroups.Root
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value)
      }}
    >
      <ToggleGroups.Item value="left">hello</ToggleGroups.Item>
      <ToggleGroups.Item value="center">tomslkdvb</ToggleGroups.Item>
      <ToggleGroups.Item value="right">sfb fgn</ToggleGroups.Item>
    </ToggleGroups.Root>
  )
}

export default ToggleGroup
