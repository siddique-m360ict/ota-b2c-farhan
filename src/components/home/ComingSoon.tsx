import React from "react"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

const ComingSoon = ({ service }) => {
  return (
    <Card className={cn("shadow-xl")}>
      <CardContent className={cn("px-4 text-start md:px-6 md:pt-11")}>
        <div className="py-[2.5%] text-center">{service} Coming soon</div>
      </CardContent>
    </Card>
  )
}

export default ComingSoon
