import React from "react"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

const ComingSoon = ({ service }) => {
  return (
    <Card className={cn("shadow-xl")}>
      <CardContent className={cn("px-4 pt-11 text-start md:px-6")}>
        <div className="mb-3 mt-1 flex items-center gap-3 md:gap-5">
          {service} Coming soon
        </div>
      </CardContent>
    </Card>
  )
}

export default ComingSoon
